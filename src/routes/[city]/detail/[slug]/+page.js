import { error } from '@sveltejs/kit';
import {
	cityDetailFields,
	cityPointLookupFields,
	fetchCity,
	belongsToCity
} from '$lib/directus.js';
import { slugify } from '$lib/slugify.js';

export async function load({ fetch, params }) {
	const city = await fetchCity(fetch, params.city, cityPointLookupFields);

	const pointSummary = (city.sampling_points || []).find((samplingPoint) => {
		const location = samplingPoint.location || samplingPoint.code || 'Sampling point';
		return belongsToCity(samplingPoint, city) && slugify(location) === params.slug;
	});

	if (!pointSummary) {
		throw error(404, 'Sampling point not found');
	}

	const cityWithMeasurements = await fetchCity(fetch, params.city, cityDetailFields, {
		samplingPointId: pointSummary.id
	});
	const point = (cityWithMeasurements.sampling_points || []).find(
		(samplingPoint) => samplingPoint.id === pointSummary.id
	);

	if (!point) throw error(404, 'Sampling point not found');

	return { city: { name: city.name, slug: city.slug }, point };
}