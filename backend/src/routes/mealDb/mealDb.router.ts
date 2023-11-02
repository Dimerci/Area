import { Router } from 'express';
import { getMeal } from './getMealDb'

const express = require('express');
const router = Router();

router.use(express.json());
router.get('/', getMeal)

export default router;
