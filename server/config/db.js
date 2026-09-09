import dotenv from "dotenv";
// dotenv.config();

import mongoose from "mongoose";
dotenv.config();

// const url = process.env.DB_URL; 
    // writing this here gives error, so we've to use direclty, not by variable, but if we write inside, tj varibale cn be used


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

/*if using 
    export default connectDB => import connectDb from "/config/db.js"

but if we use
    module.exports = {
        connectDB,
    }
 => const {connectDb} = require("/config/db") */