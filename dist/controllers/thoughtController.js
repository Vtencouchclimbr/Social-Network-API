import { Thought } from '../models/index.js';
/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET Thoughts based on id /thoughts/:id
 * @param string id
 * @returns a single thoughts object
*/
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
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
export const createThought = async (req, res) => {
    const { thoughtText } = req.body;
    try {
        const newThought = await Thought.create({
            thoughtText
        });
        res.status(201).json(newThought);
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
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
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
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.userId });
        if (!thought) {
            res.status(404).json({
                message: 'No user with that ID'
            });
        }
        else {
            await Thought.deleteMany({ _id: { $in: thought.reactions } });
            res.json({ message: 'User and thoughts deleted!' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
* POST reaction /reactions
* @param object username
* @returns a single reaction object
*/
export const createReaction = async (req, res) => {
    const { reaction } = req.body;
    try {
        const newReaction = await Thought.create({
            reaction
        });
        res.status(201).json(newReaction);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
* DELETE reaction based on id /reactions/:id
* @param string id
* @returns string
*/
export const deleteReaction = async (req, res) => {
    try {
        const reaction = await Thought.findOneAndDelete({ _id: req.params.reactionId });
        if (!reaction) {
            res.status(404).json({
                message: 'No reaction with that ID'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
