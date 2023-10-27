import { Router } from 'express';
import { postNorris } from './postNorris'

const express = require('express');
const router = Router();

router.use(express.json());
router.get('/', postNorris)

export default router;
