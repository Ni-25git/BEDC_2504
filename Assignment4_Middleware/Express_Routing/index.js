const express = require('express');
const app = express();
const User = require('./Routes/UserRoutes');
const Todo = require('./Routes/TodoRoute');
const connectDB = require('./db');
const PORT = 3000;

app.use(express.json())


app.use('/users',User)
app.use('/todos' , Todo)








app.listen(PORT ,async (req,res)=>{
    try {
        await connectDB()
        console.log(`Sever is running on http://localhost:${PORT}`)
    } catch (error) {
        console.log('error in connecting db with server')
    }
})