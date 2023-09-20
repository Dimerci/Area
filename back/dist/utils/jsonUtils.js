"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJsonResponse = void 0;
// src/utils/jsonUtils.ts
function createJsonResponse(data) {
    return JSON.stringify(data, null, 2);
}
exports.createJsonResponse = createJsonResponse;
