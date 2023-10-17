// src/routes/aboutRoute.ts
import { Request, Response } from 'express';
import { createJsonResponse } from '../../utils/jsonUtils';

const ABOUT_JSON = {
  server: {
    service: [{
        name: "Weather",
        description: "Get the possibility to trigger an reaction depending of meterologic data"
    }],
    reaction: [{
        name: "Discord",
        description: "Send message to specific tchat"
    }]
  }
};

export function getAboutJson(_: Request, res: Response<string>): void {
    const jsonResponse = createJsonResponse(ABOUT_JSON);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(jsonResponse);
}
