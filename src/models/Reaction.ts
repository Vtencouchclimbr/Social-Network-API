import { Schema, Types, Document } from 'mongoose';
import moment from 'moment';

// Define the Reaction interface
interface IReaction extends Document {
    reactionId: Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,
}

// Reaction Schema
const reactionSchema = new Schema<IReaction>({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
    toJSON: { getters: true},
});

reactionSchema.virtual('formattedCreatedAt').get(function() {
    return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a');
});

export default reactionSchema;