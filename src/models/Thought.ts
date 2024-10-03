import { Schema, model, type Document } from 'mongoose';

interface IThought extends Document {
    username: string,
    thoughtText: string,
    createdAt: Date,
    reactions: Schema.Types.ObjectId[],
}

const thoughtSchema = new Schema<IThought>(
    {
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
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
