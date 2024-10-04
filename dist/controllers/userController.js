import { User } from '../models/index.js';
import { Thought } from '../models/index.js';
/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET Users based on id /users/:id
 * @param string id
 * @returns a single Users object
*/
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error) {
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
export const createUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const newUser = await User.create({
            username, email
        });
        res.status(201).json(newUser);
    }
    catch (error) {
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
export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
    }
    catch (error) {
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
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({
                message: 'No user with that ID'
            });
        }
        else {
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and thoughts deleted!' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Function to add a friend
export const addFriend = async (req, res) => {
    const { userId, friendId } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $addToSet: { friends: friendId } }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const deleteFriend = async (req, res) => {
    const { userId, friendId } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $pull: { friends: friendId } }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
