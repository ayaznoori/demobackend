const { default: mongoose } = require("mongoose");


const userSchema=new mongoose.Schema({
    username:{type:String, required:true},
    email:{type: String, unique:true},
    password:{type:String, required:true},
    tickets:[{category:String,title:String,description:String}]
})

const userModel=mongoose.model('user',userSchema);

module.exports=userModel