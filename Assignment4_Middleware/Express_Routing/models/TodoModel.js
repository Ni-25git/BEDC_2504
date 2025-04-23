const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    course:{type:String,required:true},
    field:{type:String , required:true},
    duration:{type:String , required:true}
},{
    versionKey:false
});


const TodoModel = mongoose.model('Todo' , TodoSchema);

module.exports = TodoModel