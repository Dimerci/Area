"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalForecast = void 0;
function evalForecast(openWeatherMetrics, interaval, forecast) {
    switch (forecast.type) {
        case "humidity":
            return (eval(`${openWeatherMetrics.main.humidity} ${interaval} ${forecast.value}`));
        case "wind":
            return (eval(`${openWeatherMetrics.wind.speed} ${interaval} ${forecast.value}`));
        case "temperature":
            return (eval(`${openWeatherMetrics.main.temp} ${interaval} ${forecast.value}`));
        default:
            return false;
    }
}
exports.evalForecast = evalForecast;
