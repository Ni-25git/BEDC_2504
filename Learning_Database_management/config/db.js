const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/LMS_DB'

const connectDB= async()=>{
    try {
        await mongoose.connect(URI)
        console.log(`db is connected`)
    } catch (error) {
        console.log(`db is not connected`)
    }
}


module.exports = connectDB