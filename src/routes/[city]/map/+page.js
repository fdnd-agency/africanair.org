import { fetchCityMeasurements, fetchAvailableDates } from '$lib/directus.js';

export async function load({ fetch, params, url }) {
  const citySlug = params.city;

  const requestedYear = url.searchParams.get('year');
  const requestedMonth = url.searchParams.get('month');

  const { years, monthsByYear } = await fetchAvailableDates(fetch, citySlug);

  const latestYear = years[0] || '2026';
  const latestMonth = monthsByYear[latestYear]?.[0] || '08';

  const year = requestedYear || latestYear;
  const month = requestedMonth || monthsByYear[year]?.[0] || latestMonth;
  
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  let prevYear = yearNum;
  let prevMonthNum = monthNum - 1;
  if (prevMonthNum < 1) {
    prevMonthNum = 12;
    prevYear -= 1;
  }
  const prevYearStr = String(prevYear);
  const prevMonthStr = String(prevMonthNum).padStart(2, '0');

  const [currentData, previousData] = await Promise.all([
    fetchCityMeasurements(fetch, citySlug, year, month),
    fetchCityMeasurements(fetch, citySlug, prevYearStr, prevMonthStr)
  ]);

  return {
    city: currentData.city,
    sampling_points: currentData.sampling_points,
    previous_sampling_points: previousData.sampling_points,
    selectedYear: year,
    selectedMonth: month,
    availableYears: years,
    availableMonthsByYear: monthsByYear
  };
}