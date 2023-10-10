"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDiscord = void 0;
const ErrorStatus_1 = require("../../../middleware/errors/ErrorStatus");
const postRequestToDiscordBot_1 = require("./postRequestToDiscordBot");
function postDiscord(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const field = "message";
            if (!(field in req.body)) {
                throw (new ErrorStatus_1.ErrorStatus(`Missing required field: ${field}`, 400));
            }
            const { message } = req.body;
            (0, postRequestToDiscordBot_1.PostRequestToDiscordBot)({ message });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.postDiscord = postDiscord;
