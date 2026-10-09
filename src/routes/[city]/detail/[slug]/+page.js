import { fetchSamplingPointDetail, fetchAvailableDates } from '$lib/directus.js';

export async function load({ fetch, params }) {
  const citySlug = params.city;
  const pointSlug = params.slug;

  const { years, monthsByYear } = await fetchAvailableDates(fetch, citySlug);

  // Load all measurements for this specific sampling point
  const { city, sampling_point, measurements } = await fetchSamplingPointDetail(
    fetch,
    citySlug,
    pointSlug
  );

  return {
    city,
    sampling_point,
    measurements,
    availableYears: years,
    availableMonthsByYear: monthsByYear
  };
}