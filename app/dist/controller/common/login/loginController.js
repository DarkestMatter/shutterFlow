"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const findValidLogin_1 = require("../../../service/findValidLogin");
const tokenGenerator_1 = require("../../../service/tokenGenerator");
const responderController_1 = require("../responderController");
const enum_1 = require("../../../service/enum");
const loginController = async (req, res, next) => {
    var _a, _b, _c;
    try {
        const userData = (await (0, findValidLogin_1.findValidLogin)((_a = req.body) === null || _a === void 0 ? void 0 : _a.loginId));
        if ((userData === null || userData === void 0 ? void 0 : userData.pwd) === ((_b = req.body) === null || _b === void 0 ? void 0 : _b.pwd) &&
            (userData === null || userData === void 0 ? void 0 : userData.status) === enum_1.registrationStatus.registered) {
            const resultObj = {
                email: userData === null || userData === void 0 ? void 0 : userData.email,
                mobile: userData === null || userData === void 0 ? void 0 : userData.mobile,
                studioName: userData === null || userData === void 0 ? void 0 : userData.studioName,
                status: userData === null || userData === void 0 ? void 0 : userData.status,
            };
            (0, responderController_1.responderController)({ result: resultObj, statusCode: 200 }, res);
        }
        else if ((userData === null || userData === void 0 ? void 0 : userData.pwd) === ((_c = req.body) === null || _c === void 0 ? void 0 : _c.pwd)) {
            const tokenObj = {
                userId: userData === null || userData === void 0 ? void 0 : userData.userId,
                clientId: userData === null || userData === void 0 ? void 0 : userData.clientId,
                customerType: userData === null || userData === void 0 ? void 0 : userData.customerType,
                status: userData === null || userData === void 0 ? void 0 : userData.status,
            };
            const token = await (0, tokenGenerator_1.tokenGenerator)(tokenObj);
            const resultObj = {
                email: userData === null || userData === void 0 ? void 0 : userData.email,
                studioName: userData === null || userData === void 0 ? void 0 : userData.studioName,
                mobile: userData === null || userData === void 0 ? void 0 : userData.mobile,
                status: userData === null || userData === void 0 ? void 0 : userData.status,
                customerType: userData === null || userData === void 0 ? void 0 : userData.customerType,
                token: token,
            };
            (0, responderController_1.responderController)({ result: resultObj, statusCode: 200 }, res);
        }
        else {
            (0, responderController_1.responderController)({ result: {}, statusCode: 401, errorMsg: enum_1.errorMsg.incorrectUserEmail }, res);
        }
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: enum_1.errorMsg.loginError }, res);
    }
};
exports.loginController = loginController;
