export async function load({ params }) {
  const baseURL = "https://fdnd-agency.directus.app/items/apa_sampling_points";

  // console.log(params.city);

  const URLParams = new URLSearchParams();

  URLParams.append(
    "fields",
    "location,city_id.name,measurements.value,measurements.date",
  );
  URLParams.append("filter[city_id][name][_icontains]", params.city);
  URLParams.append("deep[measurements][_sort]", "-date");
  URLParams.append("deep[measurements][_limit]", "1");
  // Doens't work yet because values are a string.
  // URLParams.append("sort", "-measurements.value")

  const pointsResponse = await fetch(`${baseURL}?${URLParams}`);
  const pointsData = await pointsResponse.json();

  // console.log(pointsResponse)

  return {
    points: pointsData.data,
  };
}
