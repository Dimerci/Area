"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ErrorStatus_1 = require("./ErrorStatus");
function errorHandler(err, req, res, _) {
    console.error(err);
    if (err instanceof ErrorStatus_1.ErrorStatus) {
        res.status(err.statusCode).send(err.message);
    }
    else if (err instanceof Error) {
        res.status(500).send(err.message);
    }
    else {
        res.status(500).send("Internal server error");
    }
}
exports.errorHandler = errorHandler;
