import express from 'express'

import { signupHandler, loginUser } from '../controllers/userController.js';

const route = express.Router();

route.post('/signup',signupHandler)
route.post('/login',loginUser);

export default route;