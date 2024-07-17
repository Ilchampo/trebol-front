import type { InvestorType } from "$lib/types/investorType";

export interface IInvestorDTO {
    id: number;
    companyId: number;
    sharePercentage: number;
    name: string;
    code: string;
    type: InvestorType;
    parentInvestorId?: number | null;
}

export interface ICreateInvestorArgsDTO {
    companyId: number;
    sharePercentage: number;
    name: string;
    code: string;
    type: InvestorType;
    parentInvestorId?: number | null;
}

export interface IUpdateInvestorArgsDTO {
    id: number;
    companyId?: number;
    sharePercentage?: number;
    name?: string;
    code?: string;
    type?: InvestorType;
    parentInvestorId?: number | null;
}
