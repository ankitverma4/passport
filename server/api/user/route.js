import express from 'express';
import controller from './controller';

const router = express.Router();

router.get('/', (req, res) => res.send("user is working"));

router.post('/', controller.saveUser);
router.post('/login', controller.login);

export default router;