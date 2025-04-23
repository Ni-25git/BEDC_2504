const express = require('express');
const UserModel = require('../models/UserModel');
const User = express.Router();

User.get('/',async (req,res)=>{
    try {
        const user = await UserModel.find()
        res.status(200).json({messsage:'All users',user})
    } catch (error) {
        res.status(500).json({message:'error in adding user',error})
    }
    
})

User.post('/add' , async (req,res)=>{
    try {
        const{username,email , number} = req.body
        const newUser = new UserModel({username , email , number})
        await newUser.save()
        res.status(200).json({messsage:'User has been added',newUser})
    } catch (error) {
        res.status(500).json({message:'error in adding user',error})
    }
})

User.put('/update/:id' , async (req,res)=>{
    try {
        const{username,email , number} = req.body
        const {id} = req.params
        const updatedUser = await UserModel.findByIdAndUpdate(id,{username , email , number})
        updatedUser.save()
        res.status(200).json({messsage:'User has been updated',updatedUser})
    } catch (error) {
        res.status(500).json({message:'error in updating user',error})
    }
})

User.delete('/delete/:id' , async (req,res)=>{
    try {
        const {id} = req.params
        const deletedUser = await UserModel.findByIdAndDelete(id)
        res.status(200).json({messsage:'User has been deleted',deletedUser})
    } catch (error) {
        res.status(500).json({message:'error in deleting user',error})
    }
})






module.exports = User