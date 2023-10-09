"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorStatus = void 0;
class ErrorStatus extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
}
exports.ErrorStatus = ErrorStatus;
