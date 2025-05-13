const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type:String , required:true , unique:true},
    email:{type:String , required:true},
    role:{type:String , required:true , enum:["admin" , "instructor" , "student"]},
    enrolledCourses:[{type:mongoose.Schema.Types.ObjectId , ref:'Course'}]
    
},
{
    versionKey:false,
    timestamps:true
});

const UserModel = mongoose.model('User' , userSchema);


module.exports = UserModel