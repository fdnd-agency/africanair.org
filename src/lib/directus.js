import { error } from '@sveltejs/kit';

const API_URL = 'https://fdnd-agency.directus.app';

const slugify = (str) =>
  str ? str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';

async function request(fetch, endpoint, params = {}) {
  const url = new URL(endpoint, API_URL);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const res = await fetch(url);
  if (!res.ok) throw error(502, 'Could not load data from Directus');
  return (await res.json()).data;
}

export async function fetchAvailableDates(fetch, citySlug) {
  const data = await request(fetch, '/items/apa_measurements', {
    'filter[sampling_point][city][slug][_eq]': citySlug,
    fields: 'date',
    limit: '-1',
    sort: '-date'
  });

  if (!Array.isArray(data)) return { years: [], monthsByYear: {} };

  const periodMap = new Map();
  for (const { date } of data) {
    if (!date) continue;
    const [year, month] = [date.substring(0, 4), date.substring(5, 7)];
    if (!periodMap.has(year)) periodMap.set(year, new Set());
    periodMap.get(year).add(month);
  }

  const years = Array.from(periodMap.keys()).sort((a, b) => Number(b) - Number(a));
  const monthsByYear = Object.fromEntries(
    years.map((y) => [y, Array.from(periodMap.get(y)).sort((a, b) => Number(a) - Number(b))])
  );

  return { years, monthsByYear };
}

export async function fetchCityMeasurements(fetch, citySlug, year, month) {
  const filter = { 'filter[sampling_point][city][slug][_eq]': citySlug };

  if (year && month) {
    const start = new Date(Date.UTC(Number(year), Number(month) - 1, 1)).toISOString();
    const end = new Date(Date.UTC(Number(year), Number(month), 0, 23, 59, 59, 999)).toISOString();
    filter['filter[date][_between]'] = `${start},${end}`;
  }

  const data = await request(fetch, '/items/apa_measurements', {
    ...filter,
    fields: 'id,date,value,sampling_point.id,sampling_point.code,sampling_point.location,sampling_point.latitude,sampling_point.longitude,sampling_point.city.id,sampling_point.city.name,sampling_point.city.slug,sampling_point.city.latitude,sampling_point.city.longitude',
    limit: '10000'
  });

  if (!data?.length) {
    return { city: { name: citySlug, slug: citySlug, latitude: null, longitude: null }, sampling_points: [] };
  }

  const firstCity = data.find((d) => d?.sampling_point?.city)?.sampling_point?.city;
  const city = {
    id: firstCity?.id,
    name: firstCity?.name || citySlug,
    slug: firstCity?.slug || citySlug,
    latitude: firstCity?.latitude,
    longitude: firstCity?.longitude
  };

  const pointMap = new Map();
  for (const { id, date, value, sampling_point: sp } of data) {
    if (!sp) continue;

    if (!pointMap.has(sp.id)) {
      pointMap.set(sp.id, {
        id: sp.id,
        code: sp.code,
        location: sp.location || sp.code,
        latitude: sp.latitude,
        longitude: sp.longitude,
        measurements: []
      });
    }

    pointMap.get(sp.id).measurements.push({ id, date, value });
  }

  return { city, sampling_points: Array.from(pointMap.values()) };
}

export async function fetchSamplingPointDetail(fetch, citySlug, pointSlug) {
  const data = await request(fetch, '/items/apa_measurements', {
    'filter[sampling_point][city][slug][_eq]': citySlug,
    fields: 'id,date,value,sampling_point.id,sampling_point.code,sampling_point.location,sampling_point.latitude,sampling_point.longitude,sampling_point.city.id,sampling_point.city.name,sampling_point.city.slug',
    limit: '10000',
    sort: '-date'
  });

  if (!data?.length) {
    return { city: { name: citySlug, slug: citySlug }, sampling_point: null, measurements: [] };
  }

  const pointItems = data.filter(({ sampling_point: sp }) => {
    return sp && (slugify(sp.code) === pointSlug || slugify(sp.location) === pointSlug || sp.code === pointSlug);
  });

  if (!pointItems.length) {
    return { city: { name: citySlug, slug: citySlug }, sampling_point: null, measurements: [] };
  }

  const firstCity = pointItems.find((d) => d?.sampling_point?.city)?.sampling_point?.city;
  const city = {
    id: firstCity?.id,
    name: firstCity?.name || citySlug,
    slug: firstCity?.slug || citySlug
  };

  const sp = pointItems[0].sampling_point;
  const sampling_point = {
    id: sp.id,
    code: sp.code,
    location: sp.location || sp.code,
    latitude: sp.latitude,
    longitude: sp.longitude
  };

  const measurements = pointItems.map(({ id, date, value }) => ({ id, date, value }));

  return { city, sampling_point, measurements };
}