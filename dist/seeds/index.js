import db from '../config/connection.js';
import cleanDB from './cleanDB.js';
import { users, thoughts } from './data.js';
import User from '../models/User.js';
import Thought from '../models/Thought.js';
const seedDatabase = async () => {
    try {
        await db();
        await cleanDB();
        // Add users to the collection and await the results
        const userData = await User.create(users);
        // Add thoughts to the collection and await the results
        const thoughtData = await Thought.create(thoughts);
        // Step 4: Assign friends after generating users
        const allUsers = await User.find({});
        const userIds = allUsers.map(user => user._id);
        for (let i = 0; i < allUsers.length; i++) {
            const user = allUsers[i];
            // Create a list of potential friend ids by excluding the current user's id
            const friendIds = userIds.filter(id => id.toString() !== user._id.toString());
            // Add a random selection of friends (you can modify this logic for specific cases)
            const randomFriendId = friendIds[Math.floor(Math.random() * friendIds.length)];
            // Add the friend to the user's friend array
            user.friends.push(randomFriendId);
            // Save the user with updated friends
            await user.save();
        }
        // Log out the seed data to indicate what should appear in the database
        console.table(userData);
        console.table(thoughtData);
        console.info('Seeding complete! 🌱');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
// Execute the seed function
seedDatabase();
