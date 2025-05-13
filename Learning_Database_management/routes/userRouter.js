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
        const {username ,email, role ,enrolledCourses} = req.body;
        if(!username || !role || !email || !enrolledCourses){
            res.status(401).json({message:'Please provide username and role firstly'})
        }
        const newUser = new UserModel({username , role , email , enrolledCourses})
        await newUser.save();
        res.status(201).json({message:'User has been saved',newUser})
    } catch (error) {
        res.status(404).json({message:'error in registering the user',error:error.message})
    }
});

user.post("/enroll" , async(req,res)=>{
    try {
        const {userId , courseId} = req.body;
        
        if(!userId || !courseId){
            return res.status(400).json({message:'User Id and Course Id are required'})
        }
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(404).json({message :'User not found'})
        }
        if(user.enrolledCourses.includes(courseId)){
            return res.status(409).json({message:'user have already enrolled with this course'})
        }
        user.enrolledCourses.push(courseId)
        await user.save();
        res.status(200).json({ message: 'User successfully enrolled in the course', user });
    } catch (error) {
        res.status(500).json({ message: 'Enrollment failed', error: error.message });
    }
})

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