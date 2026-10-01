import { error } from '@sveltejs/kit';

const directusUrl = 'https://fdnd-agency.directus.app';
const cityFields = [
	'id',
	'name',
	'slug',
	'latitude',
	'longitude',
	'sampling_points.id',
	'sampling_points.code',
	'sampling_points.location',
	'sampling_points.latitude',
	'sampling_points.longitude',
	'sampling_points.city_id.id',
	'sampling_points.measurements.id',
	'sampling_points.measurements.date',
	'sampling_points.measurements.value'
].join(',');

export async function load({ fetch, params }) {
	const url = new URL('/items/apa_cities', directusUrl);
	url.searchParams.set('filter[slug][_eq]', params.city);
	url.searchParams.set('fields', cityFields);
	url.searchParams.set('limit', '1');

	const response = await fetch(url);
	if (!response.ok) {
		throw error(502, 'Could not load city sampling points');
	}

	const { data } = await response.json();
	const city = data?.[0];
	if (!city) {
		throw error(404, 'City not found');
	}

	return { city };
}