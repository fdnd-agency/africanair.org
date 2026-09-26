export async function load() {
  const res = await fetch("https://fdnd-agency.directus.app/items/apa_measurements?fields=*.*.*");
  const data = await res.json();

  console.log(data);

  return { data: data.data };
}
