"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileController = void 0;
const eventModel_1 = require("../../model/eventModel");
const enum_1 = require("../../service/enum");
const responderController_1 = require("../common/responderController");
const deleteFileController = async (req, res, next) => {
    try {
        //aggregate method used, will use for getting liked files
        // const a = await eventModel().aggregate([
        //   {
        //     $match: {
        //       eventId: req?.eventId,
        //     },
        //   },
        //   {
        //     $unwind: {
        //       path: "$eventFileList",
        //     },
        //   },
        //   {
        //     $match: {
        //       "eventFileList.fileId": {
        //         $in: [
        //           "b82ee279-9acd-4309-8bb0-6bdbde46a405",
        //           "0bfeab0a-4141-49ee-a29b-32cc34dc80eb",
        //         ],
        //       },
        //     },
        //   },
        // ]);
        // console.log(a);
        //@ts-ignore
        (0, eventModel_1.eventModel)().findOneAndUpdate({ eventId: req === null || req === void 0 ? void 0 : req.eventId, clientOwnerId: req === null || req === void 0 ? void 0 : req.userId }, {
            $pull: {
                eventFileList: {
                    fileId: { $in: req === null || req === void 0 ? void 0 : req.eventFileList },
                },
                originalFileList: {
                    fileId: { $in: req === null || req === void 0 ? void 0 : req.eventFileList },
                },
            },
        }, { new: true }, (err, result) => {
            if (!err) {
                const resultObj = {
                    eventId: result === null || result === void 0 ? void 0 : result.eventId,
                    clientId: result === null || result === void 0 ? void 0 : result.clientId,
                    clientName: result === null || result === void 0 ? void 0 : result.clientName,
                    clientOwnerId: result === null || result === void 0 ? void 0 : result.clientOwnerId,
                    eventName: result === null || result === void 0 ? void 0 : result.eventName,
                    eventFileList: result === null || result === void 0 ? void 0 : result.eventFileList,
                    createdDate: result === null || result === void 0 ? void 0 : result.createdDate,
                    updatedDate: result === null || result === void 0 ? void 0 : result.updatedDate,
                };
                (0, responderController_1.responderController)({ result: resultObj, statusCode: 200 }, res);
            }
            else {
                (0, responderController_1.responderController)({
                    result: err,
                    statusCode: 200,
                    errorMsg: enum_1.errorMsg.errorAtDeleteFile,
                }, res);
            }
        });
    }
    catch (err) {
        (0, responderController_1.responderController)({
            result: { err },
            statusCode: 500,
            errorMsg: enum_1.errorMsg.errorAtDeleteFile,
        }, res);
    }
};
exports.deleteFileController = deleteFileController;
