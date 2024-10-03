import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,

} from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/students/:thoughtId
router.route('/:thoughtId').get(getThoughtById)
                           .put(updateThought)
                           .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/api/thoughts/:thoughtId/reactions').post(createReaction).delete(deleteReaction);


                           
export default router;