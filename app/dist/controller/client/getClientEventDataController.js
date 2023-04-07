"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientEventDataController = void 0;
const eventModel_1 = require("../../model/eventModel");
const enum_1 = require("../../service/enum");
const responderController_1 = require("../common/responderController");
const getClientEventDataController = async (req, res, next) => {
    try {
        if (req === null || req === void 0 ? void 0 : req.clientId) {
            (0, eventModel_1.eventModel)().findOne({
                clientId: req === null || req === void 0 ? void 0 : req.clientId,
                eventId: req === null || req === void 0 ? void 0 : req.eventId,
            }, { _id: 0 }, async (err, result) => {
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
exports.getClientEventDataController = getClientEventDataController;
