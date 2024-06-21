const mongoose = require("mongoose");
const validator = require("validator");
 
const studentSchma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenth: 3,
       
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already Present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    phone:{
        type:String,
        min:10,
        max:10,
        required:true,
        unique: [true, " Phone Number already Present"],
    },
 
    address:{
        type:String,
        required:true,
 
    }
 
})
 
const Student =new mongoose.model("Employee",studentSchma)
module.exports=Student;
 