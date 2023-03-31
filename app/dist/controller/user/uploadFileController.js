"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUploadFileData = exports.uploadFileController = void 0;
const uuid_1 = require("uuid");
const eventModel_1 = require("../../model/eventModel");
const enum_1 = require("../../service/enum");
const uploadFile_1 = require("../../service/uploadFile");
const responderController_1 = require("../common/responderController");
const uploadFileController = async (req, res, next, auth) => {
    var _a;
    try {
        const fileId = (0, uuid_1.v4)();
        const fileData = {
            fileId: fileId,
            clientOwnerId: auth === null || auth === void 0 ? void 0 : auth.userId,
            clientId: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.clientId,
            originalFilePath: `${auth === null || auth === void 0 ? void 0 : auth.userId}/${fileId}`,
            minFilePath: `${auth === null || auth === void 0 ? void 0 : auth.userId}/min/${fileId}`,
            microFilePath: ``,
        };
        //original file upload
        const fileUploadResponse = (await (0, uploadFile_1.uploadFile)(req, res, next, fileData));
        if (fileUploadResponse === null || fileUploadResponse === void 0 ? void 0 : fileUploadResponse.errorMsg) {
            (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: fileUploadResponse === null || fileUploadResponse === void 0 ? void 0 : fileUploadResponse.errorMsg }, res);
            return;
        }
        const eventFileDataObj = {
            fileId: fileData === null || fileData === void 0 ? void 0 : fileData.fileId,
            clientOwnerId: fileData === null || fileData === void 0 ? void 0 : fileData.clientOwnerId,
            clientId: fileData === null || fileData === void 0 ? void 0 : fileData.clientId,
            name: fileUploadResponse === null || fileUploadResponse === void 0 ? void 0 : fileUploadResponse.name,
            originalFilePath: `${enum_1.iDriveData.baseUrl}${fileData === null || fileData === void 0 ? void 0 : fileData.clientOwnerId}/${fileData === null || fileData === void 0 ? void 0 : fileData.fileId}.${fileUploadResponse === null || fileUploadResponse === void 0 ? void 0 : fileUploadResponse.fileType}`,
            minFilePath: `${enum_1.iDriveData.baseUrl}${fileData === null || fileData === void 0 ? void 0 : fileData.clientOwnerId}/min/${fileData === null || fileData === void 0 ? void 0 : fileData.fileId}.${fileUploadResponse === null || fileUploadResponse === void 0 ? void 0 : fileUploadResponse.fileType}`,
            originalFileSize: fileUploadResponse === null || fileUploadResponse === void 0 ? void 0 : fileUploadResponse.originalFileSize,
            minFileSize: fileUploadResponse === null || fileUploadResponse === void 0 ? void 0 : fileUploadResponse.minFileSize,
            format: fileUploadResponse === null || fileUploadResponse === void 0 ? void 0 : fileUploadResponse.mimetype,
            eventId: fileUploadResponse === null || fileUploadResponse === void 0 ? void 0 : fileUploadResponse.eventId,
        };
        const fileDataSaved = (await (0, exports.saveUploadFileData)(eventFileDataObj));
        (fileDataSaved === null || fileDataSaved === void 0 ? void 0 : fileDataSaved.clientId)
            ? (0, responderController_1.responderController)({ result: {}, statusCode: 200 }, res)
            : (0, responderController_1.responderController)({
                result: {},
                statusCode: 200,
                errorMsg: enum_1.errorMsg.errorFileUpload,
            }, res);
    }
    catch (err) {
        console.log(err);
        (0, responderController_1.responderController)({ result: {}, statusCode: 200, errorMsg: enum_1.errorMsg.errorFileUpload }, res);
    }
};
exports.uploadFileController = uploadFileController;
const saveUploadFileData = (fileData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const originalFileData = {
                clientId: fileData === null || fileData === void 0 ? void 0 : fileData.clientId,
                clientOwnerId: fileData === null || fileData === void 0 ? void 0 : fileData.clientOwnerId,
                name: fileData === null || fileData === void 0 ? void 0 : fileData.name,
                originalFilePath: fileData === null || fileData === void 0 ? void 0 : fileData.originalFilePath,
            };
            const minFileData = {
                fileId: fileData === null || fileData === void 0 ? void 0 : fileData.fileId,
                clientOwnerId: fileData === null || fileData === void 0 ? void 0 : fileData.clientOwnerId,
                clientId: fileData === null || fileData === void 0 ? void 0 : fileData.clientId,
                name: fileData === null || fileData === void 0 ? void 0 : fileData.name,
                minFilePath: fileData === null || fileData === void 0 ? void 0 : fileData.minFilePath,
                originalFileSize: fileData === null || fileData === void 0 ? void 0 : fileData.originalFileSize,
                minFileSize: fileData === null || fileData === void 0 ? void 0 : fileData.minFileSize,
                format: fileData === null || fileData === void 0 ? void 0 : fileData.format,
                eventId: fileData === null || fileData === void 0 ? void 0 : fileData.eventId,
            };
            const updatedResult = (await (0, eventModel_1.eventModel)().findOneAndUpdate({
                clientOwnerId: fileData === null || fileData === void 0 ? void 0 : fileData.clientOwnerId,
                eventId: fileData === null || fileData === void 0 ? void 0 : fileData.eventId,
            }, {
                $push: {
                    originalFileList: originalFileData,
                    eventFileList: minFileData,
                },
            }));
            (updatedResult === null || updatedResult === void 0 ? void 0 : updatedResult.clientId) ? resolve(updatedResult) : resolve(false);
        }
        catch (err) {
            console.log(err);
            resolve(false);
        }
    });
};
exports.saveUploadFileData = saveUploadFileData;
