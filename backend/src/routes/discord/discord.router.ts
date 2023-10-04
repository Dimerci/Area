import { Router } from 'express';
import { postDiscord } from './postDiscord'

const express = require('express');
const router = Router();

router.use(express.json());
router.post('/', postDiscord)

export default router;