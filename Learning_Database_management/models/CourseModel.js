const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  maximumCapacity: { type: Number, required: true }
}, {
  versionKey: false
});

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
