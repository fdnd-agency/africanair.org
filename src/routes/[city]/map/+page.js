import { fetchCityMeasurements, fetchAvailableDates } from '$lib/directus.js';

export async function load({ fetch, params, url }) {
  const citySlug = params.city;

  // 1. Get list of available years and months from actual measurements
  const { years, monthsByYear } = await fetchAvailableDates(fetch, citySlug);

  // 2. Pick latest recorded date as default
  const latestYear = years[0] || '2026';
  const latestMonth = monthsByYear[latestYear]?.[0] || '08';

  const selectedYear = url.searchParams.get('year') || latestYear;
  const selectedMonth = url.searchParams.get('month') || latestMonth;

  // 3. Load sampling points with measurements for the selected period
  const { city, sampling_points } = await fetchCityMeasurements(
    fetch,
    citySlug,
    selectedYear,
    selectedMonth
  );

  return {
    city,
    sampling_points,
    selectedYear,
    selectedMonth,
    availableYears: years,
    availableMonthsByYear: monthsByYear
  };
}