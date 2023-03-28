"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dbConnection_1 = require("./dbConnection");
const router_1 = require("./routes/router");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express_1.default.json()); // Used to parse JSON bodies
app.use(express_1.default.urlencoded());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../web/dist")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../web/dist", "index.html"));
});
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../../web/dist", "index.html"));
});
(0, dbConnection_1.connect_db)();
const port = process.env.PORT || 4000;
console.log("connected to DB", port);
app.set("port", port);
app.listen(port);
app.use("/api", router_1.router);
