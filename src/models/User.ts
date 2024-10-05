import { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[]
 
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,   
            required: true, 
            trim: true, 
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        email: {
            type: String,
            required: true, // Make it a required field
            unique: true,   // Ensure the email is unique
            validate: {
                validator: function(v: string) {
                    // Regular expression for validating email format
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`, // Error message if validation fails
            },
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const User = model<IUser>('User', userSchema);

export default User;
