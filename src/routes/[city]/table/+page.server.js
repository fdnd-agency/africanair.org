export const csr = false; // makes sure the component works only based on server side rendering

export async function load() {
  const measurementsResponse = await fetch(
    "https://fdnd-agency.directus.app/items/apa_measurements?fields=*",
  );
  const measurementsData = await measurementsResponse.json();

  const citiesResponse = await fetch(
    "https://fdnd-agency.directus.app/items/apa_cities?fields=*",
  );
  const citiesData = await citiesResponse.json();

  const samplingPointsResponse = await fetch(
    "https://fdnd-agency.directus.app/items/apa_sampling_points?fields=*.*",
  );
  const samplingPointsData = await samplingPointsResponse.json();

  return {
    cities: citiesData.data,
    samplingPoints: samplingPointsData.data,
    measurements: measurementsData.data,
  };
}
