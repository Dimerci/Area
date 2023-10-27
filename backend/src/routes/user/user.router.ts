import { Router } from 'express';
import { getUser } from './getUser';

const express = require('express');
const router = Router();


router.use(express.json());
router.get('/', getUser);

export default router;