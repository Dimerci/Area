// src/routes/index.ts
import { Router } from 'express';
import { handleAboutRoute } from './listRoutes/aboutJson';

const router = Router();

router.get('/about.json', handleAboutRoute);

export default router;
