export interface IClientDTO {
    id: number;
    name: string;
    logoUrl?: string | null;
    maxInvestorLevels: number;
    minSearchPercentage: number;
}

export interface ICreateClientArgsDTO {
    name: string;
    logoUrl?: string;
    maxInvestorLevels: number;
    minSearchPercentage: number;
}

export interface IUpdateClientArgsDTO {
    id: number;
    name?: string;
    logoUrl?: string;
    maxInvestorLevels?: number;
    minSearchPercentage?: number;
}
