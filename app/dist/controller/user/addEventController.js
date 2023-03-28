"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEventAlreadyExists = exports.addEvent = exports.addEventController = void 0;
const uuid_1 = require("uuid");
const clientModel_1 = require("../../model/clientModel");
const eventModel_1 = require("../../model/eventModel");
const enum_1 = require("../../service/enum");
const responderController_1 = require("../common/responderController");
const addEventController = async (req, res, next) => {
    var _a;
    try {
        const authData = { userId: req === null || req === void 0 ? void 0 : req.userId, customerType: req === null || req === void 0 ? void 0 : req.customerType };
        const isEventAlreadyExists = await (0, exports.checkEventAlreadyExists)(req, authData);
        const newEventObj = {
            eventId: `${(_a = req === null || req === void 0 ? void 0 : req.eventName) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, "")}-${(0, uuid_1.v4)()}`,
            eventName: req === null || req === void 0 ? void 0 : req.eventName,
            clientId: req === null || req === void 0 ? void 0 : req.clientId,
            clientName: req === null || req === void 0 ? void 0 : req.clientName,
            clientOwnerId: req === null || req === void 0 ? void 0 : req.userId,
            createdDate: new Date(),
            updatedDate: new Date(),
        };
        if (!isEventAlreadyExists) {
            try {
                await (0, exports.addEvent)(newEventObj, authData);
                const updatedResult = (await (0, clientModel_1.clientModel)().findOneAndUpdate({ clientId: req === null || req === void 0 ? void 0 : req.clientId, clientOwnerId: req === null || req === void 0 ? void 0 : req.userId }, {
                    $push: {
                        eventList: newEventObj,
                    },
                }));
                (updatedResult === null || updatedResult === void 0 ? void 0 : updatedResult.clientId)
                    ? (0, responderController_1.responderController)({ result: newEventObj, statusCode: 200 }, res)
                    : (0, responderController_1.responderController)({
                        result: {},
                        statusCode: 200,
                        errorMsg: enum_1.errorMsg.errorAtAddEvent,
                    }, res);
            }
            catch (err) {
                (0, responderController_1.responderController)({
                    result: {},
                    statusCode: 500,
                    errorMsg: enum_1.errorMsg.errorAtUpdateClientEvent,
                }, res);
            }
        }
        else {
            (0, responderController_1.responderController)({
                result: {},
                statusCode: 200,
                errorMsg: enum_1.errorMsg.eventExists,
            }, res);
        }
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: enum_1.errorMsg.serverError }, res);
    }
};
exports.addEventController = addEventController;
const addEvent = async (req, authData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (authData === null || authData === void 0 ? void 0 : authData.userId) {
                // && req?.customerType === customerType.user) {
                const newEventModel = (0, eventModel_1.eventModel)();
                let eventModelObject = {
                    eventId: req === null || req === void 0 ? void 0 : req.eventId,
                    clientId: req === null || req === void 0 ? void 0 : req.clientId,
                    clientOwnerId: authData === null || authData === void 0 ? void 0 : authData.userId,
                    clientName: req === null || req === void 0 ? void 0 : req.clientName,
                    eventName: req === null || req === void 0 ? void 0 : req.eventName,
                    eventType: req === null || req === void 0 ? void 0 : req.eventType,
                    eventDate: req === null || req === void 0 ? void 0 : req.eventDate,
                    updatedDate: new Date(),
                    createdDate: new Date(),
                };
                new newEventModel(eventModelObject).save((err, result) => {
                    try {
                        if (!err) {
                            const resultObj = {
                                eventId: result === null || result === void 0 ? void 0 : result.eventId,
                                eventName: result === null || result === void 0 ? void 0 : result.eventName,
                                eventType: result === null || result === void 0 ? void 0 : result.eventType,
                                eventDate: result === null || result === void 0 ? void 0 : result.eventDate,
                            };
                            resolve({ result: resultObj, statusCode: 200 });
                        }
                        else {
                            reject({
                                result: {},
                                statusCode: 500,
                                errorMsg: enum_1.errorMsg.errorAtAddEvent,
                            });
                        }
                    }
                    catch (err) {
                        reject({
                            result: {},
                            statusCode: 500,
                            errorMsg: enum_1.errorMsg.errorAtAddEvent,
                        });
                    }
                });
            }
        }
        catch (err) {
            reject({
                result: {},
                statusCode: 500,
                errorMsg: enum_1.errorMsg.incorrectUserEmail,
            });
        }
    });
};
exports.addEvent = addEvent;
const checkEventAlreadyExists = async (req, authData) => {
    return new Promise((resolve, reject) => {
        try {
            (0, clientModel_1.clientModel)().findOne({
                clientOwnerId: authData === null || authData === void 0 ? void 0 : authData.userId,
                clientId: req === null || req === void 0 ? void 0 : req.clientId,
            }, { _id: 0 }, (err, result) => {
                if (!err) {
                    resolve(result === null || result === void 0 ? void 0 : result.eventList.some((event) => (event === null || event === void 0 ? void 0 : event.eventName) === (req === null || req === void 0 ? void 0 : req.eventName)));
                }
                else {
                    reject(false);
                }
            });
        }
        catch (err) {
            reject(true);
        }
    });
};
exports.checkEventAlreadyExists = checkEventAlreadyExists;
