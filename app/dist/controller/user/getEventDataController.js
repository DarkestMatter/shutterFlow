"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventDataController = void 0;
const eventModel_1 = require("../../model/eventModel");
const enum_1 = require("../../service/enum");
const responderController_1 = require("../common/responderController");
const getEventDataController = async (req, res, next) => {
    try {
        if (req === null || req === void 0 ? void 0 : req.userId) {
            // && req?.customerType === customerType.user) {
            (0, eventModel_1.eventModel)().find({
                clientOwnerId: req === null || req === void 0 ? void 0 : req.userId,
                clientId: req === null || req === void 0 ? void 0 : req.clientId,
                eventId: req === null || req === void 0 ? void 0 : req.eventId,
            }, { _id: 0 }, { sort: { updatedDate: 1 } }, (err, result) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                if (!err) {
                    const resultObj = {
                        eventId: (_a = result[0]) === null || _a === void 0 ? void 0 : _a.eventId,
                        clientId: (_b = result[0]) === null || _b === void 0 ? void 0 : _b.clientId,
                        clientName: (_c = result[0]) === null || _c === void 0 ? void 0 : _c.clientName,
                        clientOwnerId: (_d = result[0]) === null || _d === void 0 ? void 0 : _d.clientOwnerId,
                        eventName: (_e = result[0]) === null || _e === void 0 ? void 0 : _e.eventName,
                        eventFileList: (_f = result[0]) === null || _f === void 0 ? void 0 : _f.eventFileList,
                        createdDate: (_g = result[0]) === null || _g === void 0 ? void 0 : _g.createdDate,
                        updatedDate: (_h = result[0]) === null || _h === void 0 ? void 0 : _h.updatedDate,
                    };
                    (0, responderController_1.responderController)({ result: resultObj, statusCode: 200 }, res);
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
