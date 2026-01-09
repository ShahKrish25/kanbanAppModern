const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let isConnecting = false;

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("the connection is already established");
            return;
        }
        if (isConnecting) {
            console.log("connection attempt already in progress");
            return;
        }
        isConnecting = true;
        await mongoose.connect(process.env.MONGO_URI);
        console.log("the connection is successfull 🚀");
    } catch (error) {
        console.log("the connection is failed ❌");
        process.exit(1);
    } finally {
        isConnecting = false;
    }
};

module.exports = connectDB;