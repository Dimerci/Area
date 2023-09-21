"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const aboutJson_1 = require("./listRoutes/aboutJson");
const router = (0, express_1.Router)();
router.get('/about.json', aboutJson_1.handleAboutRoute);
exports.default = router;
