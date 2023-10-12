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
exports.PostRequestToDiscordBot = void 0;
const ErrorStatus_1 = require("../../../middleware/errors/ErrorStatus");
function PostRequestToDiscordBot({ message }) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestBody = {
            content: message
        };
        return yield fetch('https://discord.com/api/webhooks/1158339425093296209/OJ0GSO8aLOkWXPQ51YREeE6CNZeCgpJ0sNAh84jUcJrCHSS8mNvGkyIwaiR6qdRDN4bM', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        }).then((res) => {
            if (res.ok) {
                console.log('Message sent successfully to Discord webhook.');
            }
            else {
                throw new ErrorStatus_1.ErrorStatus("Error sending POST request to Discord bot", res.status);
            }
        }).catch((err) => {
            return { data: null, error: err };
        });
    });
}
exports.PostRequestToDiscordBot = PostRequestToDiscordBot;
