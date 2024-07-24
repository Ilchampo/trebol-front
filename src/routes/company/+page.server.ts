import type { ICompanyDTO } from '$lib/interfaces/company.interface';
import type { Load } from '@sveltejs/kit';

import httpCodes from '$lib/constants/httpCodes';
import { getCompaniesByClientId } from '$lib/api/company.api';

export interface IPageResponse {
	loading: boolean;
	companies: ICompanyDTO[];
	code: number;
	error: unknown;
}

export const load: Load = async ({ params }) => {
	const { id } = params;

	if (!id) {
		return {
			loading: false,
			code: httpCodes.BAD_REQUEST,
			companies: [],
			error: new Error('No hay companias')
		};
	}

	try {
		const companies = await getCompaniesByClientId(Number(id));

        console.log(companies);

		return {
			loading: false,
			code: companies.code,
			client: companies.data,
			error: undefined
		};
	} catch (error) {
		return {
			loading: false,
			code: httpCodes.INTERNAL_SERVER_ERROR,
			client: [],
			error: error as string
		};
	}
};
