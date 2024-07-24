import type { FileType } from '$lib/types/fileType';

interface IFileData {
	type: string;
	data: Buffer;
}

export interface IFileDTO {
	id: number;
	investorId: number;
	fileType: FileType;
	fileData: IFileData;
}

export interface ICreateFileArgsDTO {
	investorId: number;
	fileType: FileType;
	fileData: IFileData;
}

export interface IUpdateFileArgsDTO {
	id: number;
	investorId?: number;
	fileType?: FileType;
	fileData?: IFileData;
}
