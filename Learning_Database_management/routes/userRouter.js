const express = require('express');
const UserModel = require('../models/UserModel');
const user = express.Router();

user.get('/' ,async (req,res)=>{
    try {
        const user = await UserModel.find()
        res.status(201).json({message:'All users details' , user})
    } catch (error) {
        res.status(404).json({message:'error for fetching details',error:error.message})
    }
});

user.get('/:role' ,async (req,res)=>{
    try {
        const {role} = req.params
        const user = await UserModel.find({role})
        res.status(201).json({message:'All users with that role' , user})
    } catch (error) {
        res.status(404).json({message:'error for fetching details',error:error.message})
    }
});

user.post('/add' , async(req,res)=>{
    try {
        const {username ,email, role } = req.body;
        if(!username || !role || !email){
            res.status(401).json({message:'Please provide username and role firstly'})
        }
        const newUser = new UserModel({username , role , email})
        await newUser.save();
        res.status(201).json({message:'User has been saved',newUser})
    } catch (error) {
        res.status(404).json({message:'error in registering the user',error:error.message})
    }
});

user.put("/modify/:id" , async (req,res)=>{
    try {
        const {id} = req.params;
        const {email} = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(id,{email});
        updatedUser.save()
        res.status(201).json({message:'User email have been updated'});
    } catch (error) {
        res.status(404).json({message:'error in updating' , error:error.message})
    }
})

user.delete("/delete/:id" , async (req,res)=>{
    try {
        const {id} = req.params;

        const deletedUser = await UserModel.findByIdAndDelete(id);
        res.status(201).json({message:'User email have been deleted'});
    } catch (error) {
        res.status(404).json({message:'error in updating' , error:error.message})
    }
});







module.exports = user