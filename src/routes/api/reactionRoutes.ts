import { Router } from 'express';
const router = Router();
import {
  getAllReactions,
  getReactionById,
  createReaction,
  deleteReaction,
  updateReaction,

} from '../../controllers/reactionController.js';

// /api/reactions
router.route('/').get(getAllReactions).post(createReaction);

// /api/reactions/:reactionId
router.route('/:reactionId').get(getReactionById)
                           .put(updateReaction)
                           .delete(deleteReaction);

export { router as reactionRouter} ;
