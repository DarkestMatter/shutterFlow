"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientListController = void 0;
const clientModel_1 = require("../../model/clientModel");
const responderController_1 = require("../common/responderController");
const getClientListController = async (req, res, next) => {
    var _a;
    try {
        (0, clientModel_1.clientModel)().find({
            email: (_a = req.body) === null || _a === void 0 ? void 0 : _a.email,
        }, null, { sort: { updatedDate: 1 } }, (err, result) => {
            if (!err) {
                console.log(result);
            }
            else {
                (0, responderController_1.responderController)({ result: {}, statusCode: 200 }, res);
            }
        });
    }
    catch (err) { }
    (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: "Some Error occurred" /* errorMsg.serverError */ }, res);
};
exports.getClientListController = getClientListController;
