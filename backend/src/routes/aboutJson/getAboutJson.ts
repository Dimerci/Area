// src/routes/aboutRoute.ts
import { Request, Response } from 'express';
import { createJsonResponse } from '../../utils/jsonUtils';

const ABOUT_JSON = {
  name: 'Me',
  version: '1.0.0',
  description: 'A simple NodeTS server with an about endpoint.',
};

export function getAboutJson(_: Request, res: Response<string>): void {
  const jsonResponse = createJsonResponse(ABOUT_JSON);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(jsonResponse);
}
