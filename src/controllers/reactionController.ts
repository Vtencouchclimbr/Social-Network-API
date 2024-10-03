// import { Request, Response } from 'express';
// import { Reaction } from '../models/index.js';

//   /**
//  * POST reaction /reactions
//  * @param object username
//  * @returns a single reaction object
// */
// export const createReaction = async (req: Request, res: Response) => {
//     const { reaction } = req.body;
//     try {
//       const newReaction = await Reaction.create({
//         reaction
//       });
//       res.status(201).json(newReaction);
//     } catch (error: any) {
//       res.status(400).json({
//         message: error.message
//       });
//     }
//   };

//   /**
//  * DELETE reaction based on id /reactions/:id
//  * @param string id
//  * @returns string 
// */
// export const deleteReaction = async (req: Request, res: Response) => {
//     try {
//       const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId});
      
//       if(!reaction) {
//         res.status(404).json({
//           message: 'No reaction with that ID'
//         });
//       }
      
//     } catch (error: any) {
//       res.status(500).json({
//         message: error.message
//       });
//     }
//   };
