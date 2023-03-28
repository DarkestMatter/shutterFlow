"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileType = exports.iDriveData = exports.uploadVideoFormat = exports.uploadImgFormat = exports.customerType = exports.eventName = exports.statusEnum = exports.successMsg = exports.errorMsg = void 0;
var errorMsg;
(function (errorMsg) {
    errorMsg["registrationError"] = "Error occurred while Registration";
    errorMsg["noLoginCredFound"] = "No valid login cred found";
    errorMsg["loginError"] = "Error occurred while Login";
    errorMsg["noValidUser"] = "No Valid User Found";
    errorMsg["userFoundError"] = "Error while finding user";
    errorMsg["errorAtOtp"] = "Error occurred while validating OTP";
    errorMsg["errorAtClientList"] = "Error occurred while finding client List";
    errorMsg["errorAtAddCLient"] = "Error occurred while adding client";
    errorMsg["errorAtAddEvent"] = "Error occurred while adding event";
    errorMsg["errorAtUpdateClientEvent"] = "Error occurred while updating event in client data";
    errorMsg["serverError"] = "Some Error occurred";
    errorMsg["incorrectOtp"] = "enter correct otp";
    errorMsg["incorrectUserEmail"] = "Please login again with proper Email";
    errorMsg["userExist"] = "User already exists, Please try Login";
    errorMsg["invalidToken"] = "Token is invalid, Please Login again";
    errorMsg["eventExists"] = "Event Already Exists, please create with different Name";
    errorMsg["incorrectUploadFormat"] = "Only .png, .jpg and .jpeg format allowed!";
    errorMsg["errorFileUpload"] = "Error at file uploading";
})(errorMsg = exports.errorMsg || (exports.errorMsg = {}));
var successMsg;
(function (successMsg) {
    successMsg["loginSuccess"] = "login successful";
    successMsg["clientAdded"] = "Client added successfully";
    successMsg["enterOtp"] = "Enter OTP recieved on your email ID";
})(successMsg = exports.successMsg || (exports.successMsg = {}));
var statusEnum;
(function (statusEnum) {
    statusEnum["registered"] = "Registered";
    statusEnum["verified"] = "Verified";
    statusEnum["inactive"] = "Inactive";
})(statusEnum = exports.statusEnum || (exports.statusEnum = {}));
var eventName;
(function (eventName) {
    eventName["defaultEventName"] = "HighLight";
})(eventName = exports.eventName || (exports.eventName = {}));
var customerType;
(function (customerType) {
    customerType["user"] = "user";
    customerType["client"] = "client";
})(customerType = exports.customerType || (exports.customerType = {}));
var uploadImgFormat;
(function (uploadImgFormat) {
    uploadImgFormat["jpg"] = "image/jpg";
    uploadImgFormat["jpeg"] = "image/jpeg";
    uploadImgFormat["png"] = "image/png";
    uploadImgFormat["webp"] = "image/webp";
})(uploadImgFormat = exports.uploadImgFormat || (exports.uploadImgFormat = {}));
var uploadVideoFormat;
(function (uploadVideoFormat) {
    uploadVideoFormat["mp4"] = "image/mp4";
    uploadVideoFormat["mkv"] = "image/mkv";
})(uploadVideoFormat = exports.uploadVideoFormat || (exports.uploadVideoFormat = {}));
var iDriveData;
(function (iDriveData) {
    iDriveData["bucket"] = "shutter-flow";
    iDriveData["acl"] = "public-read";
    iDriveData["baseUrl"] = "https://shutter-flow.c3l1.c10.e2-3.dev/";
})(iDriveData = exports.iDriveData || (exports.iDriveData = {}));
var fileType;
(function (fileType) {
    fileType["img"] = "image";
    fileType["video"] = "video";
})(fileType = exports.fileType || (exports.fileType = {}));
