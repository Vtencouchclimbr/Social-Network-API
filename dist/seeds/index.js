import db from '../config/connection.js';
import { User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { users } from './data.js';
try {
    await db();
    await cleanDB();
    // Add users to the collection and await the results
    const userData = await User.create(users);
    //   // Add courses to the collection and await the results
    //   await Thought.create({
    //     name: 'UCLA',
    //     inPerson: false,
    //     students: [...userData.map(({ _id }: { [key: string]: any }) => _id)],
    //   });
    // Log out the seed data to indicate what should appear in the database
    console.table(userData);
    console.info('Seeding complete! 🌱');
    process.exit(0);
}
catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
}
