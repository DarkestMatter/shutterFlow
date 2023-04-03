import { uploadImgFormat } from "../service/enum";

export interface IFileMeta {
  errorMsg?: String;
  fieldname: String;
  originalname: String;
  encoding: String;
  mimetype: uploadImgFormat;
  size: Number;
  bucket: String;
  key: String;
  serverSideEncryption?: String;
  metadata: String;
  location: String;
  etag: String;
  versionId: String;
}

export interface IFileRespnseObj {
  eventId?: String;
  name?: String;
  originalFileSize?: 0;
  minFileSize?: 0;
  mimetype?: String;
  errorMsg?: String;
  fileType?: String;
  imgDimensionType?: String;
}
