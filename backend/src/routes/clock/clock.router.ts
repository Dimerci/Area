import { Router } from 'express';
import { postClock } from './postClock';

const express = require('express');
const router = Router();


router.use(express.json());
router.post('/', postClock);

export default router;