import { Request, Response, NextFunction } from "express";
import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";
import { PostRequestToDiscordBot } from "./postRequestToDiscordBot";


interface PostDiscordBody {
    message: string,
}

export async function postDiscord(req: Request<void, void, PostDiscordBody, void>, res: Response, next: NextFunction) {
    try {
        const field = "message";
        if (!(field in req.body)) {
            throw(new ErrorStatus(`Missing required field: ${field}`, 400));
        }

        const { message } = req.body;
        PostRequestToDiscordBot({message});

    } catch (err) {
        next(err);
    }
}