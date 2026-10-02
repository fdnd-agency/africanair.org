import { cityMapFields, fetchCity } from '$lib/directus.js';

export async function load({ fetch, params }) {
	return {
		city: await fetchCity(fetch, params.city, cityMapFields, { latestMeasurements: true })
	};
}