import { fetchCityMeasurements, fetchAvailableDates } from '$lib/directus.js';

export async function load({ fetch, params, url }) {
  const citySlug = params.city;

  const _searchQuery = url.search; 

  const requestedYear = url.searchParams.get('year');
  const requestedMonth = url.searchParams.get('month');

  const { years, monthsByYear } = await fetchAvailableDates(fetch, citySlug);

  const latestYear = years[0] || '2026';
  const latestMonth = monthsByYear[latestYear]?.[0] || '08';

  const year = requestedYear || latestYear;
  const month = requestedMonth || monthsByYear[year]?.[0] || latestMonth;
  
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