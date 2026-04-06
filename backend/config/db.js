import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // This log helps you verify which host you are connected to (e.g., cluster0.mongodb.net)
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        // Exit the process with failure (1) if the connection fails
        process.exit(1);
    }
};

export default connectDB;