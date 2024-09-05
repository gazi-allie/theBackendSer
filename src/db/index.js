import mongoose from "mongoose";
import { DB_NAME } from "../costants.js";

const connectDB = async()=>{
    try{
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,{
          
        });
        console.log(`"MongoDB connected successfully" !! DB HOST : 
            ${connectionInstance.connection.host}`);


    }
    catch(error){
        console.log("Error mongodb connecting",error);
        // process is the current refrence running 
        process.exit(1);
        
    }
}

export default connectDB;