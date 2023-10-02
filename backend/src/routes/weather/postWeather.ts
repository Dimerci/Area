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

export async function postWeather(req: Request<void, void, PostWeatherBody, void>, res: Response) {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + req.body.city + "&appid=3344b25c81b169bdfe06f4a1888e8f4b&units=metric&lang=fr", {
            method: "GET",
        });
        if (!response.ok) {
            res.status(response.status).send("Error fetching data");
            return;
        }
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}