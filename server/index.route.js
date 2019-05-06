import express from 'express';
import user from './api/user/route';

const router = express.Router();

router.get('/', (req, res) => res.send("internal routing working"));
router.use('/user', user);

export default router;