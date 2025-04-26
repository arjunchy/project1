import express from 'express'

import { signupHandler } from '../controllers/userController.js';

const route = express.Router();

route.post('/signup',signupHandler)

export default route;