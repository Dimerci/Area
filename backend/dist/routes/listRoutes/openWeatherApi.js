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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOpenWeatherApiRoute = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonUtils_1 = require("../../utils/jsonUtils");
function handleOpenWeatherApiRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { city } = req.params;
        const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY; // Use your API key from environment variables
        try {
            const { data } = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/forecast?q=Marseille&appid=3344b25c81b169bdfe06f4a1888e8f4b&lang=fr`);
            console.log(data);
            // Extract the temperature or any other desired data from 'data' and assign it to 'temperature'
            const temperature = data.main.temp;
            // You can also extract other relevant data from the 'data' object
            // ...
            // Create a response object with the fetched data
            console.log(data.temp);
            const openWeatherApiData = {
                city,
                temperature,
            };
            // Create a JSON response and send it to the client
            const jsonResponse = (0, jsonUtils_1.createJsonResponse)(openWeatherApiData);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(jsonResponse);
        }
        catch (error) {
            // Handle API request errors here
            console.log(error);
            res.status(500).json({ error: 'An error occurred while fetching weather data.' });
        }
    });
}
exports.handleOpenWeatherApiRoute = handleOpenWeatherApiRoute;
