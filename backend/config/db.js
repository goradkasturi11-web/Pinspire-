const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("URI exists in db.js:", !!process.env.MONGODB_URI);
await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully!");

    } catch (error) {

        console.log("MongoDB Connection Failed:", error.message);

        process.exit(1);
    }
};

module.exports = connectDB;