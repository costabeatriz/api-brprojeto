import mongoose from "mongoose";

const connectDb = async () => {
    try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongo! Database: ', mongoose.connections[0].name)
    } catch (error){
        console.error(error);
    }

    
}

export default connectDb