import { Request, Response, NextFunction } from "express";

export function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const clientId = req.query.clientId as string;

    if (!clientId) {
      return res.status(400).json({ error: "clientId is missing" });
    }
    res.json({ clientId });
  } catch (error) {
    next(error);
  }
}
