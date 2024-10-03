import { Schema, model } from 'mongoose';
import reactionSchema from './Reaction';
const thoughtSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    thoughtText: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
