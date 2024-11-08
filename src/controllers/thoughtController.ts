import { Request, Response } from 'express';
import { Thought } from '../models/index.js';

/**
 * GET All Thoughts /thoughts
 * @returns an array of thoughts
*/
export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET Thoughts based on id /thoughts/:id
 * @param string id
 * @returns a single thoughts object
*/
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId);
      if(thought) {
        res.json(thought);
      } else {
        res.status(404).json({
          message: 'Thought not found'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  /**
 * POST thoughts /thoughts
 * @param object thought
 * @returns a single thoughts object
*/
export const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username } = req.body;
    try {
      const newThought = await Thought.create({
        thoughtText, username
      });
      res.status(201).json(newThought);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT thoughts based on id /thoughts/:id
 * @param object id, username
 * @returns a single thoughts object
*/
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * DELETE thoughts based on id /thoughts/:id
 * @param string id
 * @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
      if(!thought) {
        res.status(404).json({
          message: 'No user with that ID'
        });
      } else {
        await Thought.deleteMany({ _id: { $in: thought.reactions } });
        res.json({ message: 'User and thoughts deleted!' });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

/**
 * POST reaction based on id /thoughts/:id
 * @param object Thought
 * @returns a single thought object
*/
export const createReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

/**
* DELETE reaction based on id /reactions/:id
* @param string id
* @returns a single thought object 
*/
export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId, reactionId } = req.params;
    const thought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { _id: reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

/**
* GET all reactions based on id /thoughts/:thoughtId/reactions/
* @param string id
* @returns an array of reactions 
*/
export const getReactions = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought.reactions);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}