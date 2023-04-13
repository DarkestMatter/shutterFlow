"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikedFileForUserController = void 0;
const eventModel_1 = require("../../model/eventModel");
const enum_1 = require("../../service/enum");
const responderController_1 = require("../common/responderController");
const getLikedFileForUserController = async (req, res, next) => {
    try {
        if (req === null || req === void 0 ? void 0 : req.clientId) {
            (0, eventModel_1.eventModel)().find({
                clientId: req === null || req === void 0 ? void 0 : req.clientId,
                clientOwnerId: req === null || req === void 0 ? void 0 : req.userId,
            }, { _id: 0 }, async (err, result) => {
                if (!err) {
                    const resultArr = [];
                    result === null || result === void 0 ? void 0 : result.map((event) => {
                        if (event === null || event === void 0 ? void 0 : event.eventFileList) {
                            event === null || event === void 0 ? void 0 : event.eventFileList.map((file) => {
                                if (file === null || file === void 0 ? void 0 : file.liked) {
                                    resultArr.push(file);
                                }
                            });
                        }
                    });
                    (0, responderController_1.responderController)({ result: resultArr, statusCode: 200 }, res);
                }
                else {
                    console.log(err);
                    (0, responderController_1.responderController)({ result: {}, statusCode: 200 }, res);
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: enum_1.errorMsg.serverError }, res);
    }
};
exports.getLikedFileForUserController = getLikedFileForUserController;
