import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  updateThought,

} from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/students/:thoughtId
router.route('/:thoughtId').get(getThoughtById)
                           .delete(deleteThought)
                           .put(updateThought);
                           
export { router as thoughtRouter} ;
