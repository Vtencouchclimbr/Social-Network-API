import { Request, Response } from 'express';
import { User } from '../models/index.js';
import { Thought } from '../models/index.js';

/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUsers = async(_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET Users based on id /users/:id
 * @param string id
 * @returns a single Users object
*/
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if(user) {
        res.json(user);
      } else {
        res.status(404).json({
          message: 'User not found'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  /**
 * POST Users /users
 * @param object username
 * @returns a single Users object
*/
export const createUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;
    try {
      const newUser = await User.create({
        username, email
      });
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT Users based on id /users/:id
 * @param object id, username
 * @returns a single Users object
*/
export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(user)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * DELETE Users based on id /users/:id
 * @param string id
 * @returns string 
*/
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId});
      if(!user) {
        res.status(404).json({
          message: 'No user with that ID'
        });
      } else {
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and thoughts deleted!' });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

/**
 * ADD Friend based on id /users/:id
 * @param string id
 * @returns a single Users object 
*/
export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { friends: friendId } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(`Friend with ID ${friendId} added to user ${userId}`);
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error('Error adding friend:', error);
    return res.status(500).json({ message: 'Error adding friend', error: error.message });
  }
};

/**
 * DELETE Friend based on id /friends/:id
 * @param string id
 * @returns a single Users object 
*/
export const deleteFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: 'No user with this id!' });
    } 
    res.json(updatedUser);
  }
  catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * GET Friends based on id /users/:id
 * @param string id
 * @returns an array of friends 
*/
export const getAllFriends = async(req: Request, res: Response) => {
  try {
      const friends = await User.findOne({ id: req.params.id }, 'friends');
      res.json(friends);
      if (!friends) {
          res.status(404).json({ message: 'No friends found!' });
      }
  } catch(error: any){
      res.status(500).json({
          message: error.message
      });
  }
}