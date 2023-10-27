import { Request, Response, NextFunction } from "express";
import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";
import { getChuckNorrisJoke } from "./getChuckNorrisJoke";

interface postNorris {
    message: string,
}

export async function postNorris(req: Request<void, void, postNorris, void>, res: Response, next: NextFunction) {
    try {
        const field = "message";
        if (!(field in req.body)) {
            throw(new ErrorStatus(`Missing required field: ${field}`, 400));
        }

        const { message } = req.body;
        const joke = await getChuckNorrisJoke({ message });

        res.json({ joke });
    } catch (err) {
        next(err);
    }
}
