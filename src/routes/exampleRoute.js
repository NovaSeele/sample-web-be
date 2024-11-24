import express from 'express';
import { exampleGet, examplePost } from '../controllers/exampleController.js';

const route = express.Router();

route.get('/example-get', exampleGet);
route.post('/example-post', examplePost);

export default route;
