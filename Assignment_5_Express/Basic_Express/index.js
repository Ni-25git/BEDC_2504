const express = require('express');
const app = express();
const PORT = 3000;

app.get('/' , (req,res)=>{
    res.send('Welcome to the Express.js Server!')
})

app.get('/about' , (req,res)=>{
    res.send('This is a simple web server built using Express.js.')
})

app.get('/contact' , (req,res)=>{
    res.status(200).json({ "email": "student@example.com",
        "phone": "123-456-7890"})
})

app.get('/random' , (req,res)=>{
    const randomNumber = Math.floor(Math.random()*100)+1
    res.status(200).json({number:randomNumber})
})


app.listen(PORT , (req,res)=>{
    console.log(`server is running on http://localhost:${PORT}`)
})