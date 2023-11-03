// src/routes/aboutRoute.ts
import { Request, Response } from 'express';
import { createJsonResponse } from '../../utils/jsonUtils';

const ABOUT_JSON = {
  client: {
    host: "http://localhost:8080",
  },
  server: {
    service: [{
      action: {
        name: "Weather",
        description: "Get the possibility to trigger an reaction depending of meterologic data"
      }
    }],
    reaction: [{
        name: "Discord",
        description: "Send message to specific tchat"
    }, {
        name: "Chuck Norris",
        description: "Send a Chuck Norris joke on a specific category"
    }, {
        name: "Meal",
        description: "Send a meal recipe, with ingredients and instructions\nSend meals related to a specific ingredient\nSend random meal"
    }, {
        name: "Clock",
        description: "Send the time at a specific location"
    }
  ],
    database: [{
        name: "MongoDB",
        description: "Database to store data"
    }],
  }
};

export function getAboutJson(_: Request, res: Response<string>): void {
    const jsonResponse = createJsonResponse(ABOUT_JSON);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(jsonResponse);
}
