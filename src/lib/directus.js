import { error } from '@sveltejs/kit';

const directusUrl = 'https://fdnd-agency.directus.app';
const cityFields = ['id', 'name', 'slug'];
const samplingPointFields = [
	'sampling_points.id',
	'sampling_points.code',
	'sampling_points.location',
	'sampling_points.city_id.id'
];

const measurementFields = [
	'sampling_points.measurements.id',
	'sampling_points.measurements.date',
	'sampling_points.measurements.value'
];

export const cityPointLookupFields = [...cityFields, ...samplingPointFields].join(',');
export const cityDetailFields = [
	...cityFields,
	...samplingPointFields,
	...measurementFields
].join(',');
export const cityMapFields = [
	...cityFields,
	'latitude',
	'longitude',
	...samplingPointFields,
	'sampling_points.latitude',
	'sampling_points.longitude',
	...measurementFields
].join(',');

export async function fetchCity(
	fetch,
	citySlug,
	fields,
	{ samplingPointId, latestMeasurements = false } = {}
) {
	const url = new URL('/items/apa_cities', directusUrl);
	url.searchParams.set('filter[slug][_eq]', citySlug);
	url.searchParams.set('fields', fields);
	url.searchParams.set('limit', '1');

	if (samplingPointId) {
		url.searchParams.set('deep[sampling_points][_filter][id][_eq]', samplingPointId);
	}
	if (latestMeasurements) {
		url.searchParams.set('deep[sampling_points][measurements][_sort]', '-date');
		url.searchParams.set('deep[sampling_points][measurements][_limit]', '1');
	}

	const response = await fetch(url);
	if (!response.ok) throw error(502, 'Could not load city data');

	const { data } = await response.json();
	const city = data?.[0];
	if (!city) throw error(404, 'City not found');

	return city;
}

export function belongsToCity(point, city) {
	const pointCityId = typeof point.city_id === 'object' ? point.city_id?.id : point.city_id;
	return pointCityId === city.id;
}