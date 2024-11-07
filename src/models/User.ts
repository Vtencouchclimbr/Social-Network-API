import { Schema, model, type Document } from 'mongoose';

// Define the IUser interface to describe the structure of a User document
export interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[]
 
}
// Define the schema for the User model
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,   // Enforce unique usernames
            required: true, // Make it a required field
            trim: true,     // Remove whitespace around the username
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought', // Reference to Thought documents
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User', // Reference to User documents
            },
        ],
        email: {
            type: String,
            required: true, // Make it a required field
            unique: true,   // Ensure the email is unique
            validate: {
                validator: function(v: string) {
                    // Validating email format
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`, // Error message if validation fails
            },
        },
    },
    {
        toJSON: {
            virtuals: true, // Include virtual properties when converting to JSON
        },
        timestamps: true // Automatically add createdAt and updatedAt fields
    },
);

// Create and export the User model based on the schema
const User = model<IUser>('User', userSchema);

export default User;
