import express from 'express';
import { exampleGet, examplePost } from '../controllers/exampleController.js';

const router = express.Router();

router.get('/example-get', exampleGet);
router.post('/example-post', examplePost);

export default router;
