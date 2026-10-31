import { request } from '$lib/directus.js';

export async function load({ fetch }) {
  const cities = await request(fetch, '/items/apa_cities', {
    fields: 'id,name,slug,latitude,longitude,date_created'
  });

  return {
    cities: cities || []
  };
}