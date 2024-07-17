import type { FileType } from "$lib/types/fileType";

export interface IFileDTO {
    id: number;
    investorId: number;
    fileType: FileType;
    fileData: Buffer;
}

export interface ICreateFileArgsDTO {
    investorId: number;
    fileType: FileType;
    fileData: Buffer;
}

export interface IUpdateFileArgsDTO {
    id: number;
    investorId?: number;
    fileType?: FileType;
    fileData?: Buffer;
}
