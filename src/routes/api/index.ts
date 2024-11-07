import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';

// use /users and /thoughts routes for requests
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;
