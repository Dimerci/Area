"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const aboutJson_1 = __importDefault(require("./routes/aboutJson/"));
const app = (0, express_1.default)();
const port = 8080;
app.use('/about.json', aboutJson_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
