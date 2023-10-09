"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAboutJson = void 0;
const jsonUtils_1 = require("../../utils/jsonUtils");
const ABOUT_JSON = {
    name: 'Me',
    version: '1.0.0',
    description: 'A simple NodeTS server with an about endpoint.',
};
function getAboutJson(_, res) {
    console.log("about Json");
    const jsonResponse = (0, jsonUtils_1.createJsonResponse)(ABOUT_JSON);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(jsonResponse);
}
exports.getAboutJson = getAboutJson;
