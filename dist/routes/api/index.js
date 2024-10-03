import { Router } from 'express';
import { userRouter } from './userRoutes.js';
import { thoughtRouter } from './thoughtRoutes.js';
import { reactionRouter } from './reactionRoutes.js';
const router = Router();
router.use('/users', userRouter);
router.use('/students', thoughtRouter);
router.use('/reaction', reactionRouter);
export default router;
