import type {
	IFileDTO,
	ICreateFileArgsDTO,
	IUpdateFileArgsDTO
} from '$lib/interfaces/file.interface';
import type { IResponse } from '$lib/interfaces/response.interface';

import axios from 'axios';
import config from '$lib/config';
import httpCodes from '$lib/constants/httpCodes';

const BASE_API_URL = config.environment === 'development' ? config.devApiUrl : config.prodApiUrl;
const ROUTE_API_URL = `${BASE_API_URL}/files`;

const axiosInstance = axios.create({
	baseURL: ROUTE_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

export const createFile = async (args: ICreateFileArgsDTO): Promise<IResponse<IFileDTO>> => {
	try {
		const response = await axiosInstance.post('/', args);
		return response.data as IResponse<IFileDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const updateFile = async (
	id: number,
	args: IUpdateFileArgsDTO
): Promise<IResponse<IFileDTO>> => {
	try {
		const response = await axiosInstance.put(`/${id}`, args);
		return response.data as IResponse<IFileDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const getFileById = async (id: number): Promise<IResponse<IFileDTO>> => {
	try {
		const response = await axiosInstance.get(`/${id}`);
		return response.data as IResponse<IFileDTO>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const getFiles = async (): Promise<IResponse<IFileDTO[]>> => {
	try {
		const response = await axiosInstance.get('/');
		return response.data as IResponse<IFileDTO[]>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const deleteFile = async (id: number): Promise<IResponse<void>> => {
	try {
		const response = await axiosInstance.delete(`/${id}`);
		return response.data as IResponse<void>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};
