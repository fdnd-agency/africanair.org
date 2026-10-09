export const csr = false; // makes sure the component works only based on server side rendering

export async function load() {

  const measurementsResponse = await fetch(
    "https://fdnd-agency.directus.app/items/apa_measurements?fields=*.*.*",
  );
  const measurementsData = await measurementsResponse.json();

  return {
    measurements: measurementsData.data,
  };
}
