require ('dotenv').config()

const mongoose = require('mongoose')

exports.connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connection established');
    } catch(error) {
        console.error( error);
    }
}