import type { Load } from '@sveltejs/kit';
import { getCompanyRealOwners } from '$lib/api/investor.api';
import { getCompanyById } from '$lib/api/company.api';

export const load: Load = async ({ params }) => {
	const { id } = params;

	if (!id) {
		return {
			status: 404,
			error: new Error('Id de compania incorrecto')
		};
	}
	const company = await getCompanyById(parseInt(id));

	const realOwners = await getCompanyRealOwners(parseInt(id));

	return {
		company: company.data,
		realOwners
	};
};
