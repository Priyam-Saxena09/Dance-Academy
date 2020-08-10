const mongoose = require("mongoose")


const schema2 = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
});

const form = mongoose.model("regis",schema2);
module.exports = form;