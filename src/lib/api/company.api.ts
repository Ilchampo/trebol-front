import type {
	ICompanyDTO,
	ICreateCompanyArgsDTO,
	IUpdateCompanyArgsDTO
} from '$lib/interfaces/company.interface';
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

export const createCompany = async (
	args: ICreateCompanyArgsDTO
): Promise<IResponse<ICompanyDTO>> => {
	try {
		const response = await axiosInstance.post('/', args);
		return response.data as IResponse<ICompanyDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const updateCompany = async (
	id: number,
	args: IUpdateCompanyArgsDTO
): Promise<IResponse<ICompanyDTO>> => {
	try {
		const response = await axiosInstance.put(`/${id}`, args);
		return response.data as IResponse<ICompanyDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const getCompanyById = async (id: number): Promise<IResponse<ICompanyDTO>> => {
	try {
		const response = await axiosInstance.get(`/${id}`);
		return response.data as IResponse<ICompanyDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const getCompanies = async (): Promise<IResponse<ICompanyDTO[]>> => {
	try {
		const response = await axiosInstance.get('/');
		return response.data as IResponse<ICompanyDTO[]>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const deleteCompany = async (id: number): Promise<IResponse<void>> => {
	try {
		const response = await axiosInstance.delete(`/${id}`);
		return response.data as IResponse<void>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};
