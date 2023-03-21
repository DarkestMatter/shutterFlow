"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClientController = void 0;
const clientModel_1 = require("../../model/clientModel");
const uuid_1 = require("uuid");
const findUserDataController_1 = require("../common/findUserDataController");
const responderController_1 = require("../common/responderController");
const addClientController = async (req, res, next) => {
    var _a, _b, _c, _d;
    try {
        const userData = (await (0, findUserDataController_1.findUserDataController)((_a = req.body) === null || _a === void 0 ? void 0 : _a.clientOwnerEmail));
        const eventList = [
            {
                eventName: "HighLight" /* eventName.defaultEventName */,
            },
        ];
        const newClientModel = (0, clientModel_1.clientModel)();
        let clientObjectModel = {
            clientName: (_b = req.body) === null || _b === void 0 ? void 0 : _b.clientName,
            clientId: (0, uuid_1.v4)(),
            mobile: (_c = req.body) === null || _c === void 0 ? void 0 : _c.clientMobileNo,
            eventType: (_d = req.body) === null || _d === void 0 ? void 0 : _d.eventType,
            eventList: eventList,
            clientOwnerName: userData === null || userData === void 0 ? void 0 : userData.studioName,
            clientOwnerId: userData === null || userData === void 0 ? void 0 : userData.userId,
            clientOwnerEmail: userData === null || userData === void 0 ? void 0 : userData.email,
            updatedDate: new Date(),
            createdDate: new Date(),
        };
        new newClientModel(clientObjectModel).save((err, result) => {
            try {
                if (!err) {
                    const resultObj = {
                        clientName: result === null || result === void 0 ? void 0 : result.clientName,
                        clientId: result === null || result === void 0 ? void 0 : result.clientId,
                        mobile: result === null || result === void 0 ? void 0 : result.mobile,
                        eventType: result === null || result === void 0 ? void 0 : result.eventType,
                        eventList: result === null || result === void 0 ? void 0 : result.eventList,
                        clientOwnerName: result === null || result === void 0 ? void 0 : result.clientOwnerName,
                        clientOwnerId: result === null || result === void 0 ? void 0 : result.clientOwnerId,
                        clientOwnerEmail: result === null || result === void 0 ? void 0 : result.clientOwnerEmail,
                        updatedDate: result === null || result === void 0 ? void 0 : result.updatedDate,
                    };
                    (0, responderController_1.responderController)({ result: resultObj, statusCode: 200 }, res);
                }
                else {
                    (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
                }
            }
            catch (err) {
                (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
            }
        });
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
    }
};
exports.addClientController = addClientController;
