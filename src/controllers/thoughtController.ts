import { Request, Response } from 'express';
import { Thought } from '../models/index.js';

/**
 * GET All Users /users
 * @returns an array of Users
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
 * GET Users based on id /users/:id
 * @param string id
 * @returns a single Users object
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
 * POST Users /users
 * @param object username
 * @returns a single Users object
*/
export const createThought = async (req: Request, res: Response) => {
    const { thought } = req.body;
    try {
      const newThought = await Thought.create({
        thought
      });
      res.status(201).json(newThought);
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
 * DELETE Users based on id /users/:id
 * @param string id
 * @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.userId});
      
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
 * POST reaction /reactions
 * @param object username
 * @returns a single reaction object
*/
export const createReaction = async (req: Request, res: Response) => {
  const { reaction } = req.body;
  try {
    const newReaction = await Thought.create({
      reaction
    });
    res.status(201).json(newReaction);
  } catch (error: any) {
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
export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const reaction = await Thought.findOneAndDelete({ _id: req.params.reactionId});
    
    if(!reaction) {
      res.status(404).json({
        message: 'No reaction with that ID'
      });
    }
    
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};