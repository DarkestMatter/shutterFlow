"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressImage = void 0;
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
const compressImage = async (req, res, next) => {
    try {
        const url = "https://shutter-flow.c3l1.c10.e2-3.dev/asd-6982abac-1b98-4810-bb07-9424667dce5a/b9fbd24f-4737-4aec-9236-d6a7c856f9e3.jpg";
        const response = await axios_1.default.get(url, { responseType: "arraybuffer" });
        const buffer = Buffer.from(response.data, "utf-8");
        (0, sharp_1.default)(buffer).webp({ quality: 25 }).toFile("E:/shutterFlow/img/out.jpg");
    }
    catch (err) {
        console.log(err);
    }
};
exports.compressImage = compressImage;
