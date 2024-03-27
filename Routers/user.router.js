const express= require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const { User } = require("../Models/user.mode");
const userRouter=express.Router();

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email})
        bcrypt.compare(password,user.password,async(err,result)=>{
            if(result){
                const token = jwt.sign({email:email},"masai");
                res.status(200).send({msg:"successfulyy loggin",token:token});
            }
            else{
                res.status(400).send({msg:"invalid credential"});
            }
        })
       
    } catch (error) {

        res.status(400).send({error:error})
        
    }
})

userRouter.post("/signup",async(req,res)=>{
    try {
        const {email,password}=req.body

        bcrypt.hash(password,5,async(err,hashed)=>{
            if(!err){
                const newUser= new User({email,password:hashed});
                await newUser.save()
            }
        })
        res.status(200).send({msg:"user signed up succefully"})
    } catch (error) {
        res.status(400).send({error:error})
    }

})

module.exports={
    userRouter
}