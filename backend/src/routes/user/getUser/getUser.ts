import { Request, Response, NextFunction } from "express";
import { Client } from "../../../database/connectToDb";
import { createListing, listDb, readListingByName } from "../../../database/dbInteraction";

export function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const clientId = req.query.clientId as string;

    if (!clientId) {
      return res.status(400).json({ error: "clientId is missing" });
    }
    readListingByName(Client, clientId)
    .then(result => {
      if (result != null) {
        const { _id, ...clientJson } = result;
        res.json(clientJson)
      } else {
        const clientJson = {
            clientId: clientId
        }
        createListing(Client, clientJson)
        res.json(clientJson)
      }
    })
    .catch(_ => {
        throw new Error("Invalid Database");
    });
  } catch (error) {
    next(error);
  }
}
