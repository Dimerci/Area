"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidInterval = exports.isValidForecast = void 0;
function isValidForecast(forecast) {
    return ((forecast.type === "wind" || forecast.type === "temperature" || forecast.type === "humidity") &&
        typeof forecast.value === 'number');
}
exports.isValidForecast = isValidForecast;
function isValidInterval(interval) {
    return ["<", ">", "=", "<=", ">="].includes(interval);
}
exports.isValidInterval = isValidInterval;
