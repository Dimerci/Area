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

