import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";
import { OpenWeatherMetrics } from "./postWeather.interfaces";

const OPEN_WEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast";
const OPEN_WEATHER_API_KEY = "3344b25c81b169bdfe06f4a1888e8f4b";

interface FetchForecastFailure {
    error: Error;
    data: null;
}

interface FetchForecastSuccess {
    error: null;
    data: OpenWeatherResponse;
}

type FetchForecastResponse = FetchForecastSuccess | FetchForecastFailure;

interface OpenWeatherQuery {
    city: string,
}

interface OpenWeatherResponse {
    list: OpenWeatherMetrics[];
}

export function fetchOpenWeatherForecast({city}: OpenWeatherQuery): Promise<FetchForecastResponse> {
    const params = new URLSearchParams({q:city, appid:OPEN_WEATHER_API_KEY, units:"metric", lang:"fr"})

    return fetch(OPEN_WEATHER_URL + "?" + params.toString(), {
        method: "GET",
    }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new ErrorStatus("Error fetching openWeather map data", res.status)
            }
        }
    ).then((res: OpenWeatherResponse): FetchForecastSuccess => {
        return {data: res, error: null}
    }).catch((err) => {
        return {data: null, error:err};
    });
}
