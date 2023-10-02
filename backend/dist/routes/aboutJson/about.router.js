"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAboutJson_1 = require("./getAboutJson");
const router = (0, express_1.Router)();
router.get('/about.json', getAboutJson_1.getAboutJson);
exports.default = router;
