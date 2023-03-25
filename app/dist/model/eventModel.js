"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    eventId: String,
    clientId: String,
    clientName: String,
    clientOwnerId: String,
    eventName: String,
    eventType: String,
    eventDate: String,
    photoCount: String,
    videoCount: String,
    eventItemlist: [],
    createdDate: String,
    updatedDate: String,
});
const eventModel = () => mongoose_1.default.model("t_event", eventSchema);
exports.eventModel = eventModel;
