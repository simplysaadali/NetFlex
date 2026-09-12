import dotenv from "dotenv";

import mongoose from "mongoose";
dotenv.config();

async function connectDB (){
    const url = process.env.DB_URL;
    try {
        await mongoose.connect(url);
        console.log("Connected to the DB successfully");
    } catch (error) {
        console.error("Error connecting to the Data Base: ", error);
    }
}

export default connectDB;
