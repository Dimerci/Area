import { NextFunction, Request, response, Response } from 'express';
import { ErrorStatus } from '../../../middleware/errors/ErrorStatus'
import { fetchClock } from './fetchClockTime';
import { postRequestToDiscord } from '../../../utils/reaction/postRequestToDiscord';

interface PostClockBody {
    city: string;
};

export async function postClockFromAPI(city: string) {
    try {
        const response = await fetchClock({ city });

        if (response.data) {
            const { datetime, timezone } = response.data;

            // Strip seconds off the datetime
            const strippedDatetime = datetime.slice(0, 16);  // yyyy:mm:dd hh:mm format

            const formattedMessage = `The date in ${city} is ${strippedDatetime} and their timezone is ${timezone}`;
            return(formattedMessage);
        } else {
            const { error } = response;
            throw(error);
        }
    } catch (err) {
        throw(err);
    }
}

export async function postClock(req: Request<void, void, PostClockBody, void>, res: Response, next: NextFunction) {
    try {
        const requiredFields = ['city'];
        for (const field of requiredFields) {
            if (!(field in req.body)) {
                throw(new ErrorStatus(`Missing required field: ${field}`, 400));
            }
        }
        const { city } = req.body;
        const response = await postClockFromAPI(city);

        if (response) {
            postRequestToDiscord(response);
        } else {
            const error = response;
            throw(error);
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}