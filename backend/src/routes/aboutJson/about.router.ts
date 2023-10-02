import { Router } from 'express';
import { getAboutJson } from './getAboutJson';

const router = Router();

router.get('/about.json', getAboutJson);

export default router;