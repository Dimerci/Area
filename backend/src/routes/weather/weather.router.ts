import { Router } from 'express';
import { postWeather } from './postWeather';

const router = Router();

router.post('/', postWeather);

export default router;