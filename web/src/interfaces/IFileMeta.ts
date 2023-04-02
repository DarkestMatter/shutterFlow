export interface IFileMeta {
  clientId?: string;
  eventId?: string;
  file?: Blob;
  name?: string;
  size?: number;
  path?: string;
}

export interface IFileMetaList {
  uploadedFileList: IFileMeta[];
  addedFileList: IFileMeta[];
}

export const defaultIFileMetaList: IFileMetaList = {
  uploadedFileList: [],
  addedFileList: [],
};
