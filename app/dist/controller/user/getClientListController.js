"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientListController = void 0;
const clientModel_1 = require("../../model/clientModel");
const enum_1 = require("../../service/enum");
const responderController_1 = require("../common/responderController");
const getClientListController = async (req, res, next) => {
    try {
        (0, clientModel_1.clientModel)().find({
            clientOwnerId: req === null || req === void 0 ? void 0 : req.userId,
        }, { _id: 0 }, { sort: { updatedDate: 1 } }, (err, result) => {
            if (!err) {
                (0, responderController_1.responderController)({ result: result, statusCode: 200 }, res);
            }
            else {
                (0, responderController_1.responderController)({ result: {}, statusCode: 200 }, res);
            }
        });
    }
    catch (err) {
        (0, responderController_1.responderController)({ result: {}, statusCode: 500, errorMsg: enum_1.errorMsg.errorAtClientList }, res);
    }
};
exports.getClientListController = getClientListController;
