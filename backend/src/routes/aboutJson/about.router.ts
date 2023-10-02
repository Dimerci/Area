import { Router } from 'express';
import { getAboutJson } from './getAboutJson';

const router = Router();

router.get('/', getAboutJson);

export default router;