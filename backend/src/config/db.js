const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("the connection is successfull 🚀");    
    } catch (error) {
        console.log("the connection is failed ❌");     
        process.exit(1);
    }
}
module.exports = connectDB;