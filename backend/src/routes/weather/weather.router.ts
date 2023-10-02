import { Router } from 'express';
import { postWeather } from './postWeather';

const router = Router();

router.post('/weather', postWeather);

export default router;