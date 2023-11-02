import { Request, Response, NextFunction } from "express";
import { getChuckNorrisJoke } from "./getChuckNorrisJoke";
import { postRequestToDiscord } from "../../../utils/reaction/postRequestToDiscord";

export async function getNorris(req: Request, res: Response, next: NextFunction) {
    try {
        const field = req.query.category as string
        const { message } = req.body;
        const joke = await getChuckNorrisJoke({ message });
        postRequestToDiscord(joke);
        res.json({ joke });
    } catch (err) {
        next(err);
    }
}
