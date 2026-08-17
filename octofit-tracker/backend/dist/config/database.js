import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
export async function connectDatabase() {
    const connection = await mongoose.connect(connectionString);
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    console.log('Connected to octofit_db');
    return connection;
}
export default connectDatabase;
