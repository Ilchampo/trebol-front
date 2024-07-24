import type { ICompanyDTO } from '$lib/interfaces/company.interface';
import type { IResponse } from '$lib/interfaces/response.interface';

import axios from 'axios';
import config from '$lib/config';
import httpCodes from '$lib/constants/httpCodes';

const BASE_API_URL = config.environment === 'development' ? config.devApiUrl : config.prodApiUrl;
const ROUTE_API_URL = `${BASE_API_URL}/companies`;

const axiosInstance = axios.create({
	baseURL: ROUTE_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

export const getCompanyById = async (id: number): Promise<IResponse<ICompanyDTO>> => {
	try {
		const response = await axiosInstance.get('/', {
			params: {
				clientId: id
			}
		});

		return response.data?.[0] as IResponse<ICompanyDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const getCompanies = async (): Promise<IResponse<ICompanyDTO[]>> => {
	try {
		const response = await axiosInstance.get('');
		return response.data as IResponse<ICompanyDTO[]>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};
