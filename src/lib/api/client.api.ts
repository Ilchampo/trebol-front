import type {
	IClientDTO,
	ICreateClientArgsDTO,
	IUpdateClientArgsDTO
} from '$lib/interfaces/client.interface';
import type { IResponse } from '$lib/interfaces/response.interface';

import axios from 'axios';
import config from '$lib/config';
import httpCodes from '$lib/constants/httpCodes';

const BASE_API_URL = config.environment === 'development' ? config.devApiUrl : config.prodApiUrl;
const ROUTE_API_URL = `${BASE_API_URL}/clients`;

const axiosInstance = axios.create({
	baseURL: ROUTE_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

export const createClient = async (args: ICreateClientArgsDTO): Promise<IResponse<IClientDTO>> => {
	try {
		const response = await axiosInstance.post('/', args);

		return response.data as IResponse<IClientDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const updateClient = async (
	id: number,
	args: IUpdateClientArgsDTO
): Promise<IResponse<IClientDTO>> => {
	try {
		const response = await axiosInstance.put(`/${id}`, args);
		return response.data as IResponse<IClientDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const getClientById = async (id: number): Promise<IResponse<IClientDTO>> => {
	try {
		const response = await axiosInstance.get(`/${id}`);
		return response.data as IResponse<IClientDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const getClients = async (): Promise<IResponse<IClientDTO[]>> => {
	try {
		const response = await axiosInstance.get('/');
		return response.data as IResponse<IClientDTO[]>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const deleteClient = async (id: number): Promise<IResponse<void>> => {
	try {
		const response = await axiosInstance.delete(`/${id}`);
		return response.data as IResponse<void>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};
