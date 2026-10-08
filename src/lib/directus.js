import { error } from '@sveltejs/kit';

const directusUrl = 'https://fdnd-agency.directus.app';

export async function fetchAvailableDates(fetch, citySlug) {
  const url = new URL('/items/apa_measurements', directusUrl);
  url.searchParams.set('filter[sampling_point][city][slug][_eq]', citySlug);
  url.searchParams.set('fields', 'date');
  url.searchParams.set('limit', '-1');
  url.searchParams.set('sort', '-date');

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Directus date fetch error:', res.status);
      return { years: [], monthsByYear: {} };
    }

    const { data } = await res.json();
    if (!Array.isArray(data)) return { years: [], monthsByYear: {} };

    const periodMap = new Map();

    for (const item of data) {
      if (!item?.date) continue;
      // Fast ISO string parsing ("2026-08-01..." -> "2026", "08")
      const y = item.date.substring(0, 4);
      const mo = item.date.substring(5, 7);

      if (!periodMap.has(y)) {
        periodMap.set(y, new Set());
      }
      periodMap.get(y).add(mo);
    }

    // Sort years descending ("2026", "2025", ...)
    const years = Array.from(periodMap.keys()).sort((a, b) => Number(b) - Number(a));
    const monthsByYear = {};

    for (const y of years) {
      // Sort months ascending ("01", "02", ... "08")
      monthsByYear[y] = Array.from(periodMap.get(y)).sort((a, b) => Number(a) - Number(b));
    }

    return { years, monthsByYear };
  } catch (err) {
    console.error('Failed to parse dates:', err);
    return { years: [], monthsByYear: {} };
  }
}

/**
 * Fetches city details and measurements for a specific year and month.
 */
export async function fetchCityMeasurements(fetch, citySlug, year, month) {
  const url = new URL('/items/apa_measurements', directusUrl);
  url.searchParams.set('filter[sampling_point][city][slug][_eq]', citySlug);
  url.searchParams.set(
    'fields',
    'id,date,value,sampling_point.id,sampling_point.code,sampling_point.location,sampling_point.latitude,sampling_point.longitude,sampling_point.city.id,sampling_point.city.name,sampling_point.city.slug,sampling_point.city.latitude,sampling_point.city.longitude'
  );
  url.searchParams.set('limit', '10000');

  if (year && month) {
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const startDate = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0)).toISOString();
    const endDate = new Date(Date.UTC(y, m, 0, 23, 59, 59, 999)).toISOString();
    url.searchParams.set('filter[date][_between]', `${startDate},${endDate}`);
  }

  const response = await fetch(url);
  if (!response.ok) throw error(502, 'Could not load measurement data');

  const { data } = await response.json();
  if (!data || data.length === 0) {
    return {
      city: { name: citySlug, slug: citySlug, latitude: null, longitude: null },
      sampling_points: []
    };
  }

  const firstValidCity = data.find((d) => d?.sampling_point?.city)?.sampling_point?.city;
  const city = {
    id: firstValidCity?.id,
    name: firstValidCity?.name || citySlug,
    slug: firstValidCity?.slug || citySlug,
    latitude: firstValidCity?.latitude,
    longitude: firstValidCity?.longitude
  };

  const pointMap = new Map();

  for (const item of data) {
    const sp = item.sampling_point;
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

    pointMap.get(sp.id).measurements.push({
      id: item.id,
      date: item.date,
      value: item.value
    });
  }

  return {
    city,
    sampling_points: Array.from(pointMap.values())
  };
}

/**
 * Fetches all historical measurements for a single specific sampling point inside a city.
 */
export async function fetchSamplingPointDetail(fetch, citySlug, pointSlug) {
  const url = new URL('/items/apa_measurements', directusUrl);
  // Only filter by city slug, which we know works reliably
  url.searchParams.set('filter[sampling_point][city][slug][_eq]', citySlug);
  url.searchParams.set(
    'fields',
    'id,date,value,sampling_point.id,sampling_point.code,sampling_point.location,sampling_point.latitude,sampling_point.longitude,sampling_point.city.id,sampling_point.city.name,sampling_point.city.slug'
  );
  url.searchParams.set('limit', '10000');
  url.searchParams.set('sort', '-date');

  const response = await fetch(url);
  if (!response.ok) throw error(502, 'Could not load sampling point data');

  const { data } = await response.json();
  if (!data || data.length === 0) {
    return {
      city: { name: citySlug, slug: citySlug },
      sampling_point: null,
      measurements: []
    };
  }

  // Helper to convert strings like "Hospital KATH" into "hospital-kath"
  const slugify = (str) =>
    str ? str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';

  // Filter measurements for this specific sampling point in JavaScript
  const pointItems = data.filter((item) => {
    const sp = item?.sampling_point;
    if (!sp) return false;
    return (
      slugify(sp.code) === pointSlug ||
      slugify(sp.location) === pointSlug ||
      sp.code === pointSlug
    );
  });

  if (pointItems.length === 0) {
    return {
      city: { name: citySlug, slug: citySlug },
      sampling_point: null,
      measurements: []
    };
  }

  const firstValidCity = pointItems.find((d) => d?.sampling_point?.city)?.sampling_point?.city;
  const city = {
    id: firstValidCity?.id,
    name: firstValidCity?.name || citySlug,
    slug: firstValidCity?.slug || citySlug
  };

  const sp = pointItems[0].sampling_point;
  const sampling_point = sp
    ? {
        id: sp.id,
        code: sp.code,
        location: sp.location || sp.code,
        latitude: sp.latitude,
        longitude: sp.longitude
      }
    : null;

  const measurements = pointItems.map((item) => ({
    id: item.id,
    date: item.date,
    value: item.value
  }));

  return {
    city,
    sampling_point,
    measurements
  };
}