import { Request, response, Response } from 'express';

type Forecast = {
    type: "wind";
    value: number;
} | {
    type: "temperature"
    value: number
} | {
    type: "humudity"
    value: number
}

type Interval = ">" | "<" | "=" | ">=" | "<="

interface PostWeatherBody {
    city: string;
    forecast: Forecast;
    interval: Interval;
    message: string;
};

export function postWeather(req: Request <void, string, PostWeatherBody, void>, res: Response) {
    // req.body.city = "Londres";
    try {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + req.body.city + "&appid=3344b25c81b169bdfe06f4a1888e8f4b&units=metric&lang=fr",
        {
            "method": "GET",
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    } catch(err) {
        console.log(err);
    }
}