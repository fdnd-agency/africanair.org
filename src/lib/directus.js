import { error } from '@sveltejs/kit';

const API_URL = 'https://fdnd-agency.directus.app';

const slugify = (str) =>
  str ? str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';

async function request(fetch, endpoint, params = {}) {
  const url = new URL(endpoint, API_URL);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const res = await fetch(url);
  
  if (!res.ok) {
    let detailedMessage = res.statusText;
    try {
      const errorJson = await res.json();
      if (errorJson?.errors?.[0]?.message) {
        detailedMessage = errorJson.errors[0].message;
      }
    } catch {
      try {
        detailedMessage = await res.text() || res.statusText;
      } catch {}
    }

    console.error(`❌ Directus Error [${res.status}] at ${url.pathname}:`, detailedMessage);
    throw error(502, `Could not load data from Directus: ${detailedMessage}`);
  }

  const json = await res.json();
  return json.data;
}

// 1. Fetch available dates directly for the city using the new relation path
export async function fetchAvailableDates(fetch, citySlug) {
  // Query cities -> sampling_points -> measurements
  const data = await request(fetch, '/items/apa_cities', {
    'filter[slug][_eq]': citySlug,
    fields: 'sampling_points.measurements.date'
  });

  if (!data || data.length === 0) return { years: [], monthsByYear: {} };

  const city = data[0];
  const periodMap = new Map();

  // Loop through sampling points and their measurements
  if (Array.isArray(city.sampling_points)) {
    for (const point of city.sampling_points) {
      if (!Array.isArray(point.measurements)) continue;
      for (const m of point.measurements) {
        if (!m.date) continue;
        const [year, month] = [m.date.substring(0, 4), m.date.substring(5, 7)];
        if (!periodMap.has(year)) periodMap.set(year, new Set());
        periodMap.get(year).add(month);
      }
    }
  }

  const years = Array.from(periodMap.keys()).sort((a, b) => Number(b) - Number(a));
  const monthsByYear = Object.fromEntries(
    years.map((y) => [y, Array.from(periodMap.get(y)).sort((a, b) => Number(a) - Number(b))])
  );

  return { years, monthsByYear };
}

// 2. Fetch city measurements cleanly starting from cities
export async function fetchCityMeasurements(fetch, citySlug, year, month) {
  const data = await request(fetch, '/items/apa_cities', {
    'filter[slug][_eq]': citySlug,
    fields: '*.*.*'
  });

  if (!data || data.length === 0) {
    return { city: { name: citySlug, slug: citySlug, latitude: null, longitude: null }, sampling_points: [] };
  }

  const cityRecord = data[0];
  const city = {
    id: cityRecord.id,
    name: cityRecord.name,
    slug: cityRecord.slug,
    latitude: cityRecord.latitude,
    longitude: cityRecord.longitude
  };

  const sampling_points = [];

  if (Array.isArray(cityRecord.sampling_points)) {
    for (const sp of cityRecord.sampling_points) {
      // Filter measurements by year and month if provided
      const filteredMeasurements = (sp.measurements || []).filter((m) => {
        if (!m.date) return false;
        if (year && month) {
          const mYear = m.date.substring(0, 4);
          const mMonth = m.date.substring(5, 7);
          return mYear === year && mMonth === month;
        }
        return true;
      });

      sampling_points.push({
        id: sp.id,
        code: sp.code,
        location: sp.location || sp.code,
        latitude: sp.latitude,
        longitude: sp.longitude,
        measurements: filteredMeasurements.map((m) => ({
          id: m.id,
          date: m.date,
          value: m.value !== null ? Number(m.value) : null
        }))
      });
    }
  }

  return { city, sampling_points };
}

// 3. Fetch specific sampling point details
export async function fetchSamplingPointDetail(fetch, citySlug, pointSlug) {
  const { city, sampling_points } = await fetchCityMeasurements(fetch, citySlug);

  const foundPoint = sampling_points.find((sp) => {
    return slugify(sp.code) === pointSlug || slugify(sp.location) === pointSlug || sp.code === pointSlug;
  });

  return {
    city,
    sampling_point: foundPoint || null,
    measurements: foundPoint ? foundPoint.measurements : []
  };
}