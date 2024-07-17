import type {
	IInvestorDTO,
	ICreateInvestorArgsDTO,
	IUpdateInvestorArgsDTO
} from '$lib/interfaces/investor.interface';
import type { IResponse } from '$lib/interfaces/response.interface';

import axios from 'axios';
import config from '$lib/config';
import httpCodes from '$lib/constants/httpCodes';

const BASE_API_URL = config.environment === 'development' ? config.devApiUrl : config.prodApiUrl;
const ROUTE_API_URL = `${BASE_API_URL}/investors`;

const axiosInstance = axios.create({
	baseURL: ROUTE_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

export const createInvestor = async (
	args: ICreateInvestorArgsDTO
): Promise<IResponse<IInvestorDTO>> => {
	try {
		const response = await axiosInstance.post('/', args);
		return response.data as IResponse<IInvestorDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const updateInvestor = async (
	id: number,
	args: IUpdateInvestorArgsDTO
): Promise<IResponse<IInvestorDTO>> => {
	try {
		const response = await axiosInstance.put(`/${id}`, args);
		return response.data as IResponse<IInvestorDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const getInvestorById = async (id: number): Promise<IResponse<IInvestorDTO>> => {
	try {
		const response = await axiosInstance.get(`/${id}`);
		return response.data as IResponse<IInvestorDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const getInvestors = async (): Promise<IResponse<IInvestorDTO[]>> => {
	try {
		const response = await axiosInstance.get('/');
		return response.data as IResponse<IInvestorDTO[]>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const deleteInvestor = async (id: number): Promise<IResponse<void>> => {
	try {
		const response = await axiosInstance.delete(`/${id}`);
		return response.data as IResponse<void>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const saveCompanyInvestors = async (
	companyId: number,
	args: ICreateInvestorArgsDTO[]
): Promise<IResponse<IInvestorDTO[]>> => {
	try {
		const response = await axiosInstance.post(`/company/${companyId}`, args);
		return response.data as IResponse<IInvestorDTO[]>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const getCompanyRealOwners = async (
	companyId: number
): Promise<IResponse<Record<string, number>>> => {
	try {
		const response = await axiosInstance.get(`/company/${companyId}/real-owners`);
		return response.data as IResponse<Record<string, number>>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};
