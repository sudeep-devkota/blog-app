const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected to ${process.env.MONGO_URI}`);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
//Z74dwRXY6tzZonKm