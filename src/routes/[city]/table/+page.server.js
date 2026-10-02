export const csr = false; // makes sure the component works only based on server side rendering

export async function load() {
  const res = await fetch(
    "https://fdnd-agency.directus.app/items/apa_measurements?fields=*",
  );
  const data = await res.json();

  return { measurements: data.data };
}
