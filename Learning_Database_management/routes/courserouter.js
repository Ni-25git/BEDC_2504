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

course.get('/:instructor',async(req,res)=>{
    try {
        const {instructor} = req.params
        const course = await CourseModel.find({instructor:{$regex: new RegExp(`^${instructor}$` , 'i')}});
        res.status(201).json({message :'All course of this instructor',course})
    } catch (error) {
        res.status(500).json({ message: 'Error in fetching  course details', error: error.message });
    }
});

course.get("/filter", async (req, res) => {
    try {
      const { instructor, duration, maximumCapacity } = req.query;
  
      const filter = {};
  
      if (instructor) {
        filter.instructor = { $regex: new RegExp(`^${instructor}$`, 'i') }; // case-insensitive match
      }
  
      if (duration) {
        filter.duration = duration;
      }
  
      if (maximumCapacity) {
        const capacity = Number(maximumCapacity);
        if (!isNaN(capacity)) {
          filter.maximumCapacity = capacity;
        }
      }
  
      const courses = await CourseModel.find(filter).sort({ createdAt: -1 });
      console.log(filter)
  
      res.status(200).json({ message: 'Filtered course list', courses });
  
    } catch (error) {
      res.status(500).json({ message: 'Error in filtering courses', error: error.message });
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

  course.put('/modify/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const {title , instructor , duration} = req.body
        const updatedCourse = await CourseModel.findByIdAndUpdate(id,{title , instructor , duration},{new:true});
        

        if (!title || !instructor || !duration) {
            return res.status(400).json({ message: 'Please provide all course details' });
          }

        res.status(201).json({message:'Course have been updated'})

    } catch (error) {
        res.status(500).json({ message: 'Error in adding course', error: error.message });
    }
  })

  course.delete('/delete/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const deletedCourse = await CourseModel.findByIdAndDelete(id);

        

        res.status(201).json({message:'Course have been deleted'})

    } catch (error) {
        res.status(500).json({ message: 'Error in adding course', error: error.message });
    }
  })


  


module.exports = course