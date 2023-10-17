"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOpenWeatherForecast = void 0;
const ErrorStatus_1 = require("../../../middleware/errors/ErrorStatus");
const OPEN_WEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast";
const OPEN_WEATHER_API_KEY = "3344b25c81b169bdfe06f4a1888e8f4b";
function fetchOpenWeatherForecast({ city }) {
    const params = new URLSearchParams({ q: city, appid: OPEN_WEATHER_API_KEY, units: "metric", lang: "fr" });
    return fetch(OPEN_WEATHER_URL + "?" + params.toString(), {
        method: "GET",
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new ErrorStatus_1.ErrorStatus("Error fetching openWeather map data", res.status);
        }
    }).then((res) => {
        return { data: res, error: null };
    }).catch((err) => {
        return { data: null, error: err };
    });
}
exports.fetchOpenWeatherForecast = fetchOpenWeatherForecast;
