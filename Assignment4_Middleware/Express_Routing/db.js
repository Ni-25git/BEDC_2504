const mongoose = require('mongoose')
const URI = 'mongodb://127.0.0.1:27017/express_routing'

const connectDB= async ()=>{
try {
    await mongoose.connect(URI)
    console.log('db is connected')
} catch (error) {
    console.log('error in connecting db')
}
}

module.exports=connectDB