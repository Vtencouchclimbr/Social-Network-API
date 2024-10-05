import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
  getAllFriends,
} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

// /api/users/:userId/friends
router.route('/:userId/friends').get(getAllFriends)

export default router;
