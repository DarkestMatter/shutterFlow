"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClientController = void 0;
const uuid_1 = require("uuid");
const findValidUser_1 = require("../../common/findValidUser");
const clientModel_1 = require("../../model/clientModel");
const responderController_1 = require("../common/responderController");
const addClientController = async (req, res, next) => {
    try {
        const userData = (await (0, findValidUser_1.findValidUser)(req === null || req === void 0 ? void 0 : req.userId));
        if (userData === null || userData === void 0 ? void 0 : userData.email) {
            // && userData?.customerType === customerType.user) {
            const eventList = [
                {
                    eventName: "HighLight" /* eventName.defaultEventName */,
                    createdDate: new Date(),
                    updatedDate: new Date(),
                },
            ];
            const newClientModel = (0, clientModel_1.clientModel)();
            let clientObjectModel = {
                clientName: req === null || req === void 0 ? void 0 : req.clientName,
                clientId: (0, uuid_1.v4)(),
                clientMobileNo: req === null || req === void 0 ? void 0 : req.clientMobileNo,
                eventType: req === null || req === void 0 ? void 0 : req.eventType,
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
                            clientMobileNo: result === null || result === void 0 ? void 0 : result.clientMobileNo,
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
        else {
            (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
        }
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
    }
};
exports.addClientController = addClientController;
