"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responderController = void 0;
const responderController = (result, res) => {
    try {
        res.status(result.statusCode);
        res.json(result);
    }
    catch (err) {
        console.log(err);
    }
};
exports.responderController = responderController;
