import type {
	IInvestorDTO,
	ICompanyRealOwnersDTO
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

export const saveCompanyInvestors = async (
	clientId: number,
	company: Record<string, string>,
	investors: IInvestorDTO[]
): Promise<IResponse<IInvestorDTO[]>> => {
	try {
		const response = await axiosInstance.post(`/company/${clientId}`, { company, investors });
		return response.data as IResponse<IInvestorDTO[]>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};

export const getCompanyRealOwners = async (
	companyId: number
): Promise<IResponse<ICompanyRealOwnersDTO[]>> => {
	try {
		const response = await axiosInstance.get(`/company/${companyId}/real-owners`);
		return response.data as IResponse<ICompanyRealOwnersDTO[]>;
	} catch (error) {
		return { code: httpCodes.INTERNAL_SERVER_ERROR, data: null, error: error as string };
	}
};
