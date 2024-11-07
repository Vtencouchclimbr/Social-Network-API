import { Schema, model, Types,  type Document } from 'mongoose';
import moment from 'moment';
import reactionSchema from './Reaction.js';

// Define the IThoguht interface to describe the structure of a Thought document
interface IThought extends Document {
    username: string,
    thoughtId: Schema.Types.ObjectId,
    thoughtText: string,
    createdAt: Date,
    reactions: Schema.Types.ObjectId[],
}
// Define the schema for the Thought model
const thoughtSchema = new Schema<IThought>(
    {
        username: {
            type: String,
            required: true, // Make it a required field
        },
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(), // Generate a new ObjectId as the default
        },
        thoughtText: {
            type: String,
            required: true, // Make it a required field
        },
        createdAt: {
            type: Date,
            default: Date.now, // Default to the current date and time
        },
        reactions: [reactionSchema], // Embed reactions based on reactionSchema
    },
    {
        toJSON: {
            virtuals: true, // Include virtual properties when converting to JSON
        },
        timestamps: true // Automatically add createdAt and updatedAt fields
    },
);

thoughtSchema.virtual('formattedCreatedAt').get(function() {
    return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a');
});

// Create and export the Thought model based on the schema
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
