import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error("Error: MONGODB_URI is not defined!");
    process.exit(1);
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ Mongoose Connection Error:", err));

export default mongoose;