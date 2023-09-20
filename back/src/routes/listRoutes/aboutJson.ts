// src/routes/aboutRoute.ts
import { Request, Response } from 'express';
import { createJsonResponse } from '../../utils/jsonUtils';

export function handleAboutRoute(req: Request, res: Response) {
  const aboutData = {
    name: 'Me',
    version: '1.0.0',
    description: 'A simple NodeTS server with an about endpoint.',
  };

  const jsonResponse = createJsonResponse(aboutData);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(jsonResponse);
}
