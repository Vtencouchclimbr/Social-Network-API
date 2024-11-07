import { Schema, Document } from 'mongoose';
import moment from 'moment';

// Define the Reaction interface to describe the structure of a Reaction document
interface IReaction extends Document {
    reactionBody: string,
    username: string,
    createdAt: Date,
}

// Define the schema for the Reaction model
const reactionSchema = new Schema<IReaction>({
    reactionBody: {
        type: String,
        required: true, // Make it a required field
        maxlength: 280, // Maximum number of characters
    },
    username: {
        type: String,
        required: true, // Make it a required field
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default to the current date and time
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    toJSON: { getters: true},
});

// Virtual property to format the createdAt date using moment.js
reactionSchema.virtual('formattedCreatedAt').get(function() {
    return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a');
});
// Export the reaction schema for use in other modules
export default reactionSchema;