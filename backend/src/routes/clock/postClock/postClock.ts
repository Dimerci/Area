import { NextFunction, Request, response, Response } from 'express';
import { ErrorStatus } from '../../../middleware/errors/ErrorStatus'
import { fetchClock } from './fetchClockTime';

interface PostClockBody {
    city: string;
};

export async function postClock(req: Request<void, void, PostClockBody, void>, res: Response, next: NextFunction) {
    try {
        const requiredFields = ['city'];
        for (const field of requiredFields) {
            if (!(field in req.body)) {
                throw(new ErrorStatus(`Missing required field: ${field}`, 400));
            }
        }
        const { city } = req.body;
        const response = await fetchClock({city});
        if (response.data) {
            const { data } = response;

            res.json(data);
        } else {
            const { error } = response;
            throw(error);
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}