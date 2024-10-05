import { Schema } from 'mongoose';
import moment from 'moment';
// Reaction Schema
const reactionSchema = new Schema({
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
    toJSON: { getters: true },
});
reactionSchema.virtual('formattedCreatedAt').get(function () {
    return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a');
});
export default reactionSchema;
