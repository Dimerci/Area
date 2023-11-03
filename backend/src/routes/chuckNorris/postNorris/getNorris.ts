import { Request, Response, NextFunction } from "express";
import { getChuckNorrisJoke } from "./getChuckNorrisJoke";
import { postRequestToDiscord } from "../../../utils/reaction/postRequestToDiscord";

export async function getNorrisJoke(message: string) {
    try {
        const joke = await getChuckNorrisJoke({ message });
        const finaljoke = "Chuck Norris jokes on " + message + ":\n" + joke;
        return finaljoke;
    } catch (err) {
        throw(err);
    }
}

export async function getNorris(req: Request, res: Response, next: NextFunction) {
    try {
        const { message } = req.body as { message: string };
        const joke = await getNorrisJoke(message);
        postRequestToDiscord(joke);
    } catch (err) {
        next(err);
    }
}