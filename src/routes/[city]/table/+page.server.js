export async function load({ params, url }) {
  const baseURL = "https://fdnd-agency.directus.app/items/apa_sampling_points";

  const URLParams = new URLSearchParams();

  URLParams.append(
    "fields",
    "location,city_id.name,measurements.value,measurements.date",
  );

  let searchInput = url.searchParams.get("search");

  if (searchInput) {
    URLParams.append("filter[location][_icontains]", searchInput);
  }

  URLParams.append("filter[city_id][name][_icontains]", params.city);
  URLParams.append("deep[measurements][_sort]", "-date");
  URLParams.append("deep[measurements][_limit]", "1");

  // Doens't work yet because values are a string.
  // URLParams.append("sort", "-measurements.value")

  const pointsResponse = await fetch(`${baseURL}?${URLParams}`);
  const pointsData = await pointsResponse.json();
  // console.log(pointsData.data[1].measurements[0].value);
  // console.log(pointsData.data)

  pointsData.data.sort((a, b) => {
    const valueA = parseFloat(a.measurements[0]?.value || 0);
    const valueB = parseFloat(b.measurements[0]?.value || 0);

    return valueB - valueA;
  });

  return {
    points: pointsData.data,
    searchInput: searchInput,
  };
}
