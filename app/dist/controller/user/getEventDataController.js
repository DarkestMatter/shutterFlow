"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventDataController = void 0;
const eventModel_1 = require("../../model/eventModel");
const responderController_1 = require("../common/responderController");
const enum_1 = require("../../service/enum");
const getEventDataController = async (req, res, next) => {
    try {
        if (req === null || req === void 0 ? void 0 : req.userId) {
            // && req?.customerType === customerType.user) {
            (0, eventModel_1.eventModel)().find({
                clientOwnerId: req === null || req === void 0 ? void 0 : req.userId,
                clientId: req === null || req === void 0 ? void 0 : req.clientId,
            }, { _id: 0 }, { sort: { updatedDate: 1 } }, (err, result) => {
                if (!err) {
                    (0, responderController_1.responderController)({ result: result, statusCode: 200 }, res);
                }
                else {
                    (0, responderController_1.responderController)({ result: {}, statusCode: 200 }, res);
                }
            });
        }
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: enum_1.errorMsg.serverError }, res);
    }
};
exports.getEventDataController = getEventDataController;
