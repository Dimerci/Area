"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postWeather_1 = require("./postWeather");
const router = (0, express_1.Router)();
router.post('/weather', postWeather_1.postWeather);
exports.default = router;
