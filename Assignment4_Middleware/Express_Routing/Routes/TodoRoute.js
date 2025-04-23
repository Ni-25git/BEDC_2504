const express = require('express');
const TodoModel = require('../models/TodoModel');
const Todo = express.Router();

Todo.get('/',async (req,res)=>{
    try {
        const todos = await TodoModel.find()
        res.status(200).json({messsage:'All users',todos})
    } catch (error) {
        res.status(500).json({message:'error in getting todos',error})
    }
    
})

Todo.post('/add' , async (req,res)=>{
    try {
        const{course,field , duration} = req.body
        const newTodo = new TodoModel({course,field , duration})
        await newTodo.save()
        res.status(200).json({messsage:'Todo has been added',newTodo})
    } catch (error) {
        res.status(500).json({message:'error in adding Todo',error})
    }
})

Todo.put('/update/:id' , async (req,res)=>{
    try {
        const{course,field,duration} = req.body
        const {id} = req.params
        const updatedTodo = await TodoModel.findByIdAndUpdate(id,{course,field,duration})
        updatedTodo.save()
        res.status(200).json({messsage:'Todo has been updated',updatedTodo})
    } catch (error) {
        res.status(500).json({message:'error in updating todo',error})
    }
})

Todo.delete('/delete/:id' , async (req,res)=>{
    try {
        const {id} = req.params
        const deletedTodo = await TodoModel.findByIdAndDelete(id)
        res.status(200).json({messsage:'Todo has been deleted',deletedTodo})
    } catch (error) {
        res.status(500).json({message:'error in deleting todo',error})
    }
})






module.exports = Todo