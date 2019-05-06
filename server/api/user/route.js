import express from 'express';
import controller from './controller';
import { authenticate } from '../../config/passport';
const router = express.Router();

router.get('/', (req, res) => res.send("user is working"));
router.get('/:userName', authenticate, controller.getUser);

router.post('/', controller.saveUser);
router.post('/login', controller.login);

export default router;