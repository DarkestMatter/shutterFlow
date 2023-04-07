"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrimaryEventController = void 0;
const clientModel_1 = require("../../model/clientModel");
const eventModel_1 = require("../../model/eventModel");
const enum_1 = require("../../service/enum");
const responderController_1 = require("../common/responderController");
const getPrimaryEventController = async (req, res, next) => {
    try {
        if (req === null || req === void 0 ? void 0 : req.clientId) {
            (0, eventModel_1.eventModel)().findOne({
                clientId: req === null || req === void 0 ? void 0 : req.clientId,
                "eventFileList.0": { $exists: true },
            }, { _id: 0 }, async (err, result) => {
                if (!err) {
                    const eventNameList = await (0, clientModel_1.clientModel)().findOne({
                        clientId: req === null || req === void 0 ? void 0 : req.clientId,
                    });
                    const resultObj = {
                        priamryEvent: {
                            eventId: result === null || result === void 0 ? void 0 : result.eventId,
                            clientId: result === null || result === void 0 ? void 0 : result.clientId,
                            clientName: result === null || result === void 0 ? void 0 : result.clientName,
                            clientOwnerId: result === null || result === void 0 ? void 0 : result.clientOwnerId,
                            eventName: result === null || result === void 0 ? void 0 : result.eventName,
                            eventFileList: result === null || result === void 0 ? void 0 : result.eventFileList,
                            createdDate: result === null || result === void 0 ? void 0 : result.createdDate,
                            updatedDate: result === null || result === void 0 ? void 0 : result.updatedDate,
                        },
                        eventNameList: eventNameList === null || eventNameList === void 0 ? void 0 : eventNameList.eventList,
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
exports.getPrimaryEventController = getPrimaryEventController;
