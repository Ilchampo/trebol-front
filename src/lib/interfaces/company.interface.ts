export interface ICompanyDTO {
	id: number;
	name: string;
	code: string;
	clientId: number;
}

export interface ICreateCompanyArgsDTO {
	name: string;
	code: string;
	clientId: number;
}

export interface IUpdateCompanyArgsDTO {
	id: number;
	name?: string;
	code?: string;
	clientId?: number;
}
