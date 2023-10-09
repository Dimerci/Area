import { Forecast, Interval } from "./postWeather.interfaces";



export function isValidForecast(forecast: Forecast): boolean {
    return (
        (forecast.type === "wind" || forecast.type === "temperature" || forecast.type === "humidity") &&
        typeof forecast.value === 'number'
    );
}

export function isValidInterval(interval: Interval): boolean {
    return ["<", ">", "=", "<=", ">="].includes(interval);
}
