import { Schema, model } from 'mongoose';
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
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
