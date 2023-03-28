"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClientController = void 0;
const uuid_1 = require("uuid");
const findValidUser_1 = require("../../service/findValidUser");
const clientModel_1 = require("../../model/clientModel");
const responderController_1 = require("../common/responderController");
const addEventController_1 = require("./addEventController");
const enum_1 = require("../../service/enum");
const addClientController = async (req, res, next) => {
    var _a, _b;
    try {
        const userData = (await (0, findValidUser_1.findValidUser)(req === null || req === void 0 ? void 0 : req.userId));
        if (userData && (userData === null || userData === void 0 ? void 0 : userData.email) && (userData === null || userData === void 0 ? void 0 : userData.userId)) {
            // && userData?.customerType === customerType.user) {
            const clientId = `${(_a = req === null || req === void 0 ? void 0 : req.clientName) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "")}-${(0, uuid_1.v4)()}`;
            const eventId = `${(_b = enum_1.eventName.defaultEventName) === null || _b === void 0 ? void 0 : _b.replace(/\s/g, "")}-${(0, uuid_1.v4)()}`;
            const eventList = [
                {
                    eventId: eventId,
                    eventName: enum_1.eventName.defaultEventName,
                    clientId: clientId,
                    clientName: req === null || req === void 0 ? void 0 : req.clientName,
                    clientOwnerId: userData.userId,
                    createdDate: new Date(),
                    updatedDate: new Date(),
                },
            ];
            await (0, addEventController_1.addEvent)({
                eventId: eventId,
                eventName: enum_1.eventName.defaultEventName,
                clientId: clientId,
                clientName: req === null || req === void 0 ? void 0 : req.clientName,
                clientOwnerId: userData.userId,
            }, { userId: req === null || req === void 0 ? void 0 : req.userId, customerType: req === null || req === void 0 ? void 0 : req.customerType });
            const newClientModel = (0, clientModel_1.clientModel)();
            let clientObjectModel = {
                clientName: req === null || req === void 0 ? void 0 : req.clientName,
                clientId: clientId,
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
                        (0, responderController_1.responderController)({
                            result: {},
                            statusCode: 500,
                            errorMsg: enum_1.errorMsg.errorAtAddCLient,
                        }, res);
                    }
                }
                catch (err) {
                    (0, responderController_1.responderController)({
                        result: {},
                        statusCode: 500,
                        errorMsg: enum_1.errorMsg.errorAtAddCLient,
                    }, res);
                }
            });
        }
        else {
            (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: enum_1.errorMsg.incorrectUserEmail }, res);
        }
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: enum_1.errorMsg.serverError }, res);
    }
};
exports.addClientController = addClientController;
