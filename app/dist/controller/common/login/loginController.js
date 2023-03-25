"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const findValidLogin_1 = require("../../../common/findValidLogin");
const tokenGenerator_1 = require("../../../common/tokenGenerator");
const responderController_1 = require("../responderController");
const loginController = async (req, res, next) => {
    var _a, _b, _c;
    try {
        const userData = (await (0, findValidLogin_1.findValidLogin)((_a = req.body) === null || _a === void 0 ? void 0 : _a.email));
        if ((userData === null || userData === void 0 ? void 0 : userData.pwd) === ((_b = req.body) === null || _b === void 0 ? void 0 : _b.pwd) &&
            (userData === null || userData === void 0 ? void 0 : userData.status) === "Registered" /* statusEnum.registered */) {
            const resultObj = {
                email: userData === null || userData === void 0 ? void 0 : userData.email,
                mobile: userData === null || userData === void 0 ? void 0 : userData.mobile,
                studioName: userData === null || userData === void 0 ? void 0 : userData.studioName,
                status: userData === null || userData === void 0 ? void 0 : userData.status,
            };
            (0, responderController_1.responderController)({ result: resultObj, statusCode: 200 }, res);
        }
        else if ((userData === null || userData === void 0 ? void 0 : userData.pwd) === ((_c = req.body) === null || _c === void 0 ? void 0 : _c.pwd)) {
            //console.log(userData);
            const token = await (0, tokenGenerator_1.tokenGenerator)(userData === null || userData === void 0 ? void 0 : userData.userId, userData === null || userData === void 0 ? void 0 : userData.customerType, userData === null || userData === void 0 ? void 0 : userData.status);
            const resultObj = {
                email: userData === null || userData === void 0 ? void 0 : userData.email,
                studioName: userData === null || userData === void 0 ? void 0 : userData.studioName,
                mobile: userData === null || userData === void 0 ? void 0 : userData.mobile,
                status: userData === null || userData === void 0 ? void 0 : userData.status,
                token: token,
            };
            (0, responderController_1.responderController)({ result: resultObj, statusCode: 200 }, res);
        }
        else {
            (0, responderController_1.responderController)({ result: {}, statusCode: 401, errorMsg: "Please login again with proper Email" /* errorMsg.incorrectUserEmail */ }, res);
        }
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: "Error occurred while Login" /* errorMsg.loginError */ }, res);
    }
};
exports.loginController = loginController;
