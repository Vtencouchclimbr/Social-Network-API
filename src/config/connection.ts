import mongoose from 'mongoose';

// Function to connect to the MongoDB database
const db = async (): Promise<typeof mongoose.connection> =>{
    try {
        // Attempt to connect using environment variable or local URI
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB');
        console.log('Database connected.');
        return mongoose.connection;
    } catch(error) {
        // Log error and throw exception if connection fails
        console.error('Database connection error:', error);
        throw new Error('Database connection failed.');
    }
}

export default db;
