"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const clientSchema = new mongoose_1.default.Schema({
    clientName: String,
    clientId: String,
    mobile: String,
    eventType: String,
    eventList: [],
    clientOwnerName: String,
    clientOwnerId: String,
    clientOwnerEmail: String,
});
const clientModel = () => mongoose_1.default.model("t_client", clientSchema);
exports.clientModel = clientModel;
