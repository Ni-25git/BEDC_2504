const express = require('express');
const CourseModel = require('../models/CourseModel');
const course = express.Router();

course.get('/',async(req,res)=>{
    try {
        const course = await CourseModel.find();
        res.status(201).json({message :'All course details here',course})
    } catch (error) {
        res.status(500).json({ message: 'Error in fetching  course details', error: error.message });
    }
});



course.post('/add', async (req, res) => {
    try {
      const { title, instructor, duration, maximumCapacity } = req.body;
  
      if (!title || !instructor || !duration || !maximumCapacity) {
        return res.status(400).json({ message: 'Please provide all course details' });
      }
  
      const newCourse = new CourseModel({ title, instructor, duration, maximumCapacity });
      await newCourse.save();
  
      res.status(201).json({ message: 'Course has been added', course: newCourse });
  
    } catch (error) {
      res.status(500).json({ message: 'Error in adding course', error: error.message });
    }
  });


  


module.exports = course