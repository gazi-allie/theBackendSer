// require('dotenv').config({path:'/.env'})
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({ 
    path: './env'
});

connectDB()














// import express from "express";


// (async ()=>{
//     try {
//         await mongoose.connect(
//             `${process.env.MONGODB_URI}/${DB_NAME}`
//           );
//         console.log("Connected to MongoDB successfully!");
//         app.on("error",()=>{
//             console.log("could not connect to MongoDB",error);
//             throw error;
//         })
//         app.liste(process.env.PORT,()=>{
//             console.log(`app is listing on ${process.env.PORT}`);
//         })
// }
//     catch (err) {
//         console.error("Failed to connect to MongoDB:", err);
//         throw err;
//     }

// })()
