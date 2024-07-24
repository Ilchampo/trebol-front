import type { IClientDTO } from '$lib/interfaces/client.interface';
import type { Load } from '@sveltejs/kit';

import { getClients } from '$lib/api/client.api';
import httpCodes from '$lib/constants/httpCodes';

export interface IPageResponse {
	loading: boolean;
	clients: IClientDTO[];
	code: number;
	error: unknown;
}

export const load: Load = async (): Promise<IPageResponse> => {
	try {
		const response = await getClients();

		return {
			loading: false,
			clients: response.data ?? [],
			code: response.code,
			error: undefined
		};
	} catch (error) {
		return {
			loading: false,
			clients: [],
			code: httpCodes.INTERNAL_SERVER_ERROR,
			error: error
		};
	}
};
