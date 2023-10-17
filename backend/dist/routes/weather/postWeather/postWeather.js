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
exports.postWeather = void 0;
const ErrorStatus_1 = require("../../../middleware/errors/ErrorStatus");
const evalForecast_1 = require("./evalForecast");
const postWeather_utils_1 = require("./postWeather.utils");
const fetchOpenWeatherForecast_1 = require("./fetchOpenWeatherForecast");
const postRequestToDiscord_1 = require("./postRequestToDiscord");
;
function postWeather(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requiredFields = ['city', 'forecast', 'interval', 'message'];
            for (const field of requiredFields) {
                if (!(field in req.body)) {
                    throw (new ErrorStatus_1.ErrorStatus(`Missing required field: ${field}`, 400));
                }
            }
            const { interval, forecast, city, message } = req.body;
            if (!(0, postWeather_utils_1.isValidForecast)(forecast) || !(0, postWeather_utils_1.isValidInterval)(interval)) {
                throw (new ErrorStatus_1.ErrorStatus(`Invalid forecast type or value or invalid interval`, 400));
            }
            const response = yield (0, fetchOpenWeatherForecast_1.fetchOpenWeatherForecast)({ city });
            if (response.data) {
                const { data } = response;
                const [firstForecast] = data.list;
                if ((0, evalForecast_1.evalForecast)(firstForecast, interval, forecast) === true) {
                    (0, postRequestToDiscord_1.postRequestToDiscord)(message);
                    console.log("SUCESS");
                }
                res.json(data);
            }
            else {
                const { error } = response;
                throw (error);
            }
        }
        catch (err) {
            next(err);
        }
    });
}
exports.postWeather = postWeather;
