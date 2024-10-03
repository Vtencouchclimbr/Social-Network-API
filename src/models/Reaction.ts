import { Schema, model, type Document } from 'mongoose';

// Define the Reaction interface
interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,
}

// Reaction Schema
const reactionSchema = new Schema<IReaction>({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Schema.Types.ObjectId(),
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
});

// Create the Reaction model
const Reaction = model<IReaction>('Reaction', reactionSchema);

export default Reaction;