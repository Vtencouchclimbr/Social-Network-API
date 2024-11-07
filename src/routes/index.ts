import { Router } from 'express';
const router = Router();
import apiRoutes from './api/index.js';

// use /api route for requests
router.use('/api', apiRoutes);
// return error if not found
router.use((_req, res) => {
  return res.send('Wrong route!');
});

export default router;
