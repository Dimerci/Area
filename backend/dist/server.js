"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const aboutJson_1 = __importDefault(require("./routes/aboutJson/"));
const weather_1 = __importDefault(require("./routes/weather"));
const discord_1 = __importDefault(require("./routes/discord"));
const ErrorHandler_1 = require("./middleware/errors/ErrorHandler");
const app = (0, express_1.default)();
const port = 8080;
app.use('/about.json', aboutJson_1.default);
app.use('/discord', discord_1.default);
app.use('/weather', weather_1.default);
app.get("/", (req, res) => { console.log("Here"); res.send("Hello world"); });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.on('error', (err) => {
    console.error('Server error:', err);
});
app.use(ErrorHandler_1.errorHandler);
