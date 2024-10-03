import { Schema, model, type Document } from 'mongoose';
import moment from 'moment';
import reactionSchema from './Reaction.js';

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
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

thoughtSchema.virtual('formattedCreatedAt').get(function() {
    return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a');
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
