import { User, Thought } from '../models/index.js';

// Function to clean the database
const cleanDB = async (): Promise<void> => {
  try {
    // Delete all documents from the User collection
    await User.deleteMany({});
    console.log('Course collection cleaned.');
    // Delete all documents from the Thought collection
    await Thought.deleteMany({});
    console.log('Student collection cleaned.');

  } catch (err) {
    // Log any error encountered and exit the process with a failure code
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
