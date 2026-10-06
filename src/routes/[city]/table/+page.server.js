export const csr = false; // makes sure the component works only based on server side rendering

export async function load() {

  const samplingPointsResponse = await fetch(
    "https://fdnd-agency.directus.app/items/apa_sampling_points?fields=*.*",
  );
  const samplingPointsData = await samplingPointsResponse.json();

  return {
    samplingPoints: samplingPointsData.data,
  };
}
