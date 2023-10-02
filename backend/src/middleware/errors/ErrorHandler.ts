import { Response } from 'express';
import { ErrorStatus } from './ErrorStatus';

export function errorHandler(err: unknown, req: unknown, res: Response<string>, _: unknown) {
    console.error(err);
    if (err instanceof ErrorStatus) {
        res.status(err.statusCode).send(err.message)
    } else if (err instanceof Error) {
        res.status(500).send(err.message);
    } else {
        res.status(500).send("Internal server error");
    }
}