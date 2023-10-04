import { NextFunction, Request, response, Response } from 'express';
import { ErrorStatus } from '../../../middleware/errors/ErrorStatus'
import { evalForecast } from './evalForecast';
import { Forecast, Interval, OpenWeatherMetrics } from './postWeather.interfaces';
import { isValidForecast, isValidInterval } from './postWeather.utils';
import { fetchOpenWeatherForecast } from './fetchOpenWeatherForecast';
import { postRequestToDiscord } from './postRequestToDiscord';

interface PostWeatherBody {
    city: string;
    forecast: Forecast;
    interval: Interval;
    message: string;
};

export async function postWeather(req: Request<void, void, PostWeatherBody, void>, res: Response, next: NextFunction) {
    try {
        const requiredFields = ['city', 'forecast', 'interval', 'message'];
        for (const field of requiredFields) {
            if (!(field in req.body)) {
                throw(new ErrorStatus(`Missing required field: ${field}`, 400));
            }
        }

        const { interval, forecast, city, message} = req.body;
        if (!isValidForecast(forecast) || !isValidInterval(interval)) {
            throw(new ErrorStatus(`Invalid forecast type or value or invalid interval`, 400));
        }

        const response = await fetchOpenWeatherForecast({city});
        if (response.data) {
            const { data } = response;
            const [firstForecast] = data.list;
            if (evalForecast(firstForecast, interval, forecast) === true) {
                postRequestToDiscord(message);
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

