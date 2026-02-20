import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n mongodb connection successful !! DB HOST : ${connectionInstance.connection.host}`);
    }
    
    catch(error){
        console.error("mongoDB error connection: ", error);
        process.exit(1);//here the process is the reference of the current process/place where our code in running
    }
};

export default connectDB;