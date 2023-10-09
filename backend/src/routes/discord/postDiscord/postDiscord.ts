import { Request, Response, NextFunction } from "express";
import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";
import { PostRequestToDiscordBot } from "./postRequestToDiscordBot";


interface PostDiscordBody {
    message: string,
}

export async function postDiscord(req: Request<void, void, PostDiscordBody, void>, res: Response, next: NextFunction) {
    console.log("Here");
    try {
        const field = "message";
        if (!(field in req.body)) {
            console.log("Error");
            throw(new ErrorStatus(`Missing required field: ${field}`, 400));
        }

        const { message } = req.body;
        console.log("Message here = " + message);
        PostRequestToDiscordBot({message});

    } catch (err) {
        next(err);
    }
}