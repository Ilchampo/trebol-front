import type { Load } from '@sveltejs/kit';
import type { IClientDTO } from '$lib/interfaces/client.interface';

import { getClientById } from '$lib/api/client.api';
import httpCodes from '$lib/constants/httpCodes';

export interface IPageResponse {
	loading: boolean;
	client: IClientDTO | null;
	code: number;
	error: unknown;
}

export const load: Load = async ({ params }): Promise<IPageResponse> => {
	try {
		const { id } = params;

		if (!id) {
			return {
				loading: false,
				client: null,
				code: httpCodes.BAD_REQUEST,
				error: new Error('Id del cliente incorrecto')
			};
		}

		const response = await getClientById(parseInt(id));

		return {
			loading: false,
			client: response.data,
			code: response.code,
			error: undefined
		};
	} catch (error) {
		return {
			loading: false,
			client: null,
			code: httpCodes.INTERNAL_SERVER_ERROR,
			error: error
		};
	}
};
