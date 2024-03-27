const express =require("express");
const connection = require("./db");
const cors=require("cors");
const { userRouter } = require("./Routers/user.router");
const { employeeRouter } = require("./Routers/employee.router");
require("dotenv").config()
const app=express();
app.use(cors())
app.use(express.json())

app.use("/",userRouter)

app.use("/employees",employeeRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB")
        console.log(`server running at port ${process.env.port}`)
    } catch (error) {
        console.log(error)
        
    }
   
})