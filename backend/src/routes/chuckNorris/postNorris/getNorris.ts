import { Request, Response, NextFunction } from "express";
import { getChuckNorrisJoke } from "./getChuckNorrisJoke";

export async function getNorris(req: Request, res: Response, next: NextFunction) {
    try {
        const field = req.query.category as string
        const { message } = req.body;
        const joke = await getChuckNorrisJoke({ message });

        res.json({ joke });
    } catch (err) {
        next(err);
    }
}
