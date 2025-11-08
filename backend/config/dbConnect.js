import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGO DB Connected")
    } catch (error) {
        console.log("Error While connecting Database", error)
    }
}

export default connectDB;