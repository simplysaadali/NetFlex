import dotenv from "dotenv";

import mongoose from "mongoose";
dotenv.config();

async function connectDB (){
    const url = process.env.DB_URL;
    await mongoose.connect(url, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to the DB successfully");
}

export default connectDB;
