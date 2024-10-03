import { Schema, model } from 'mongoose';
// Reaction Schema
const ReactionSchema = new Schema({
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
const Reaction = model('Reaction', ReactionSchema);
export default Reaction;
