import type { IClientDTO } from '$lib/interfaces/client.interface';
import type { Load } from '@sveltejs/kit';

import { getClientById } from '$lib/api/client.api';
import httpCodes from '$lib/constants/httpCodes';

export interface IPageResponse {
	loading: boolean;
	client: IClientDTO | null;
	code: number;
	error: unknown;
}

export const load: Load = async ({ params }) => {
	const { id } = params;

	if (!id) {
		return {
			loading: false,
			code: httpCodes.BAD_REQUEST,
			client: null,
			error: new Error('Id de client incorrecto')
		};
	}

	try {
		const client = await getClientById(parseInt(id));

		return {
			loading: false,
			code: client.code,
			client: client.data,
			error: undefined
		};
	} catch (error) {
		return {
			loading: false,
			code: httpCodes.INTERNAL_SERVER_ERROR,
			client: null,
			error: error as string
		};
	}
};
