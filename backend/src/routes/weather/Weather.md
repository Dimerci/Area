## Code Documentation

### 1. evalForecast Function

Evaluates the provided forecast based on OpenWeatherMetrics and interval.
 * @param openWeatherMetrics - The metrics data from OpenWeather
 * @param interval - The interval for evaluation
 * @param forecast - The forecast to be evaluated
 * @returns Boolean value based on the evaluation

```typescript
import { Forecast, Interval, OpenWeatherMetrics } from "./postWeather.interfaces";

export function evalForecast(openWeatherMetrics: OpenWeatherMetrics, interval: Interval, forecast: Forecast): boolean {
    switch (forecast.type) {
        case "humidity":
            return (eval(`${openWeatherMetrics.main.humidity} ${interval} ${forecast.value}`));
        case "wind":
            return (eval(`${openWeatherMetrics.wind.speed} ${interval} ${forecast.value}`))
        case "temperature":
            return (eval(`${openWeatherMetrics.main.temp} ${interval} ${forecast.value}`))
        default:
            return false;
    }
}
```

### 2. fetchOpenWeatherForecast Function

Fetches the OpenWeather forecast data for the specified city.
 * @param city - The name of the city for which to fetch the forecast
 * @returns Promise containing the fetched data or an error response

```typescript
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
```

### 3. postRequestToDiscord Function

Sends a POST request to the Discord endpoint with the provided message.
 * @param message - The message to be sent to the Discord endpoint

```typescript
import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";

export async function postRequestToDiscord(message: string) {
    const requestBody = {
        message: message
    };

    return fetch("http://localhost:8080/discord", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requestBody),
    }).then((res) => {
        if (res.ok) {
            return;
        } else {
            throw new ErrorStatus("Error sending POST request to Discord", res.status);
        }
    }).catch((err) => {
        return {data: null, error:err};
    });
}
```

### 4. Forecast Type and Interfaces

Defines the types and interfaces related to weather forecasts and metrics.
```typescript
export type Forecast = {
    type: "wind";
    value: number;
} | {
    type: "temperature"
    value: number
} | {
    type: "humidity"
    value: number
}

export type Interval = ">" | "<" | "=" | ">=" | "<="

export interface OpenWeatherMetrics {
    main: {
        temp: number;
        humidity: number;
    },
    wind: {
        speed: number;
    }
}
```

### 5. postWeather Function and Utilities

```typescript
import { NextFunction, Request, response, Response } from 'express';
import { ErrorStatus } from '../../../middleware/errors/ErrorStatus'
import { evalForecast } from './evalForecast';
import { Forecast, Interval, OpenWeatherMetrics } from './postWeather.interfaces';
import { isValidForecast, isValidInterval } from './postWeather.utils';
import { fetchOpenWeatherForecast } from './fetchOpenWeatherForecast';
import { Reaction } from '../../../utils/reaction/reactionInterface';
import { getCorrectReaction } from '../../../utils/reaction/getCorrectReaction';

interface PostWeatherBody {
    city: string;
    forecast: Forecast;
    interval: Interval;
    reaction: Reaction;
};

export async function postWeather(req: Request<void, void, PostWeatherBody, void>, res: Response, next: NextFunction) {
    try {
        const requiredFields = ['city', 'forecast', 'interval', 'reaction'];
        for (const field of requiredFields) {
            if (!(field in req.body)) {
                throw(new ErrorStatus(`Missing required field: ${field}`, 400));
            }
        }

        const { interval, forecast, city, reaction} = req.body;
        if (!isValidForecast(forecast) || !isValidInterval(interval)) {
            throw(new ErrorStatus(`Invalid forecast type or value or invalid interval`, 400));
        }

        const response = await fetchOpenWeatherForecast({city});
        if (response.data) {
            const { data } = response;
            const [firstForecast] = data.list;
            if (evalForecast(firstForecast, interval, forecast) === true) {
                getCorrectReaction(reaction);
                console.log("SUCESS");
            }
            res.json(data);
        } else {
            const { error } = response;
            throw(error);
        }
    } catch (err) {
        next(err);
    }
}
```

### 6. Utility functions

Validates the provided forecast object for the weather conditions.
 * @param forecast - The forecast object to be validated
 * @returns Boolean value indicating the validation result

```typescript
import { Forecast, Interval } from "./postWeather.interfaces";

export function isValidForecast(forecast: Forecast): boolean {
    return (
        (forecast.type === "wind" || forecast.type === "temperature" || forecast.type === "humidity") &&
        typeof forecast.value === 'number'
    );
}
```
Validates the provided interval for the weather forecast.
 * @param interval - The interval to be validated
 * @returns Boolean value indicating the validation result

```typescript
export function isValidInterval(interval: Interval): boolean {
    return ["<", ">", "=", "<=", ">="].includes(interval);
}
```