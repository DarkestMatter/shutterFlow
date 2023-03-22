"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responderController = void 0;
const responderController = (result, res) => {
    try {
        if (result === null || result === void 0 ? void 0 : result.inValidToken) {
            const resultObj = { ...result, validToken: false };
            res.status(resultObj.statusCode);
            res.json(resultObj);
        }
        else {
            const resultObj = { ...result, validToken: true };
            res.status(resultObj.statusCode);
            res.json(resultObj);
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.responderController = responderController;
