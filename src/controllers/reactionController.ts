import { Request, Response } from 'express';
import { Reaction } from '../models/index.js';

/**
 * GET All reactions /reactions
 * @returns an array of reactions
*/
export const getAllReactions = async(_req: Request, res: Response) => {
    try {
        const reactions = await Reaction.find();
        res.json(reactions);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET reaction based on id /reaction/:id
 * @param string id
 * @returns a single reaction object
*/
export const getReactionById = async (req: Request, res: Response) => {
    const { reactionId } = req.params;
    try {
      const reaction = await Reaction.findById(reactionId);
      if(reaction) {
        res.json(reaction);
      } else {
        res.status(404).json({
          message: 'Reaction not found'
        });
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
      const newReaction = await Reaction.create({
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
 * PUT reaction based on id /reactions/:id
 * @param object id, username
 * @returns a single reaction object
*/
export const updateReaction = async (req: Request, res: Response) => {
    try {
      const reaction = await Reaction.findOneAndUpdate(
        { _id: req.params.reactionId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        res.status(404).json({ message: 'No reaction with this id!' });
      }

      res.json(reaction)
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
      const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId});
      
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
