import { Forecast, Interval, OpenWeatherMetrics } from "./postWeather.interfaces";

export function evalForecast(openWeatherMetrics: OpenWeatherMetrics, interaval: Interval, forecast: Forecast): boolean {
    switch (forecast.type) {
        case "humidity":
            return (eval(`${openWeatherMetrics.main.humidity} ${interaval} ${forecast.value}`));
        case "wind":
            return (eval(`${openWeatherMetrics.wind.speed} ${interaval} ${forecast.value}`))
        case "temperature":
            return (eval(`${openWeatherMetrics.main.temp} ${interaval} ${forecast.value}`))
        default:
            return false;
    }
}