const { default: mongoose } = require("mongoose");

const userScheme=mongoose.Schema({
    email:String,
    password:String
})

const User=mongoose.model("user",userScheme);

module.exports={
    User
}