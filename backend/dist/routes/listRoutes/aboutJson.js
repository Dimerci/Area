"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAboutRoute = void 0;
const jsonUtils_1 = require("../../utils/jsonUtils");
function handleAboutRoute(req, res) {
    const aboutData = {
        name: 'Me',
        version: '1.0.0',
        description: 'A simple NodeTS server with an about endpoint.',
    };
    const jsonResponse = (0, jsonUtils_1.createJsonResponse)(aboutData);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(jsonResponse);
}
exports.handleAboutRoute = handleAboutRoute;
