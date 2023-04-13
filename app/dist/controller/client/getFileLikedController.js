"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileLikedController = void 0;
const eventModel_1 = require("../../model/eventModel");
const enum_1 = require("../../service/enum");
const responderController_1 = require("../common/responderController");
const fileLikedController = async (req, res, next) => {
    try {
        console.log("hi");
        if (req === null || req === void 0 ? void 0 : req.clientId) {
            const filterObj = {
                clientId: req === null || req === void 0 ? void 0 : req.clientId,
                clientOwnerId: req === null || req === void 0 ? void 0 : req.clientOwnerId,
                "eventFileList.fileId": req === null || req === void 0 ? void 0 : req.fileId,
            };
            console.log(filterObj);
            (0, eventModel_1.eventModel)().updateOne(filterObj, {
                $set: {
                    "eventFileList.$.liked": req === null || req === void 0 ? void 0 : req.liked,
                },
            }, (err, result) => {
                if (!err && (result === null || result === void 0 ? void 0 : result.modifiedCount) === 1) {
                    (0, responderController_1.responderController)({ result: {}, statusCode: 200 }, res);
                }
                else {
                    (0, responderController_1.responderController)({
                        result: {},
                        statusCode: 200,
                        errorMsg: enum_1.errorMsg.errorAtFileLiked,
                    }, res);
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: enum_1.errorMsg.serverError }, res);
    }
};
exports.fileLikedController = fileLikedController;
