import express from 'express'

import { signupHandler, loginUser } from '../controllers/userController.js';
import { createCollection, getCollection } from '../controllers/collectionController.js';
import upload from '../utils/upload.js';

const route = express.Router();

route.post('/signup',signupHandler)
route.post('/login',loginUser);

route.post('/createCollection',upload.single("image"),createCollection);
route.get('/getCollection', getCollection )

export default route;