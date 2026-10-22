import { fetchCityMeasurements, fetchAvailableDates } from '$lib/directus.js';

export async function load({ fetch, params, url }) {
  const citySlug = params.city;

  // 1. Read url.search so SvelteKit tracks query parameter updates
  const _searchQuery = url.search; 

  const requestedYear = url.searchParams.get('year');
  const requestedMonth = url.searchParams.get('month');

  // 2. Fetch available dates from Directus
  const { years, monthsByYear } = await fetchAvailableDates(fetch, citySlug);

  // 3. Determine the latest available year and month as default
  const latestYear = years[0] || '2026';
  const latestMonth = monthsByYear[latestYear]?.[0] || '08';

  // 4. Use requested parameters or fall back to the latest available dates
  const year = requestedYear || latestYear;
  const month = requestedMonth || monthsByYear[year]?.[0] || latestMonth;

  // 5. Load sampling points with measurements for the selected period
  const { city, sampling_points } = await fetchCityMeasurements(
    fetch,
    citySlug,
    year,
    month
  );

  return {
    city,
    sampling_points,
    selectedYear: year,
    selectedMonth: month,
    availableYears: years,
    availableMonthsByYear: monthsByYear
  };
}