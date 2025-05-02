const express = require('express');
const connectDB = require('./config/db');
const user = require('./routes/userRouter');
const course = require('./routes/courserouter');
const app = express();
const PORT = 5000;

app.use(express.json())
app.use('/user' , user)
app.use('/course' , course)



app.listen(PORT,async(req,res)=>{
    try {
        await connectDB()
        console.log(`server is listening on Port ${PORT}`)
    } catch (error) {
        console.log(`error in connecting db with server`)
    }
});