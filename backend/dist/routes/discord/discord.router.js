"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postDiscord_1 = require("./postDiscord");
const express = require('express');
const router = (0, express_1.Router)();
router.use(express.json());
router.post('/', postDiscord_1.postDiscord);
exports.default = router;
