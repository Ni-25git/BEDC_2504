const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type:String , required:true , unique:true},
    email:{type:String , required:true},
    role:{type:String , required:true , enum:["admin" , "instructor" , "student"]},
    
},
{
    versionKey:false
});

const UserModel = mongoose.model('User' , userSchema);


module.exports = UserModel