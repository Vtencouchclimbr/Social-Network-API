import { Schema, model, Types } from 'mongoose';
import moment from 'moment';
import reactionSchema from './Reaction.js';
const thoughtSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    thoughtId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
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
thoughtSchema.virtual('formattedCreatedAt').get(function () {
    return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a');
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
