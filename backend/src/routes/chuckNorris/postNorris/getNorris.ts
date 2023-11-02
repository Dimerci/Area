import { Request, Response, NextFunction } from "express";
import { getChuckNorrisJoke } from "./getChuckNorrisJoke";
import { postRequestToDiscord } from "../../../utils/reaction/postRequestToDiscord";

export async function getNorris(req: Request, res: Response, next: NextFunction) {
    try {
        const { message } = req.body as { message: string };
        const joke = await getChuckNorrisJoke({ message });
        const finaljoke = "Chuck Norris jokes on " + message + ":\n" + joke;
        postRequestToDiscord(finaljoke);
        res.json({ joke });
    } catch (err) {
        next(err);
    }
}
