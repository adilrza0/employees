const { default: mongoose } = require("mongoose");

const employeeschema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    department:String,
    Salary:Number
})

const Employee = mongoose.model("employee",employeeschema);

module.exports={
    Employee
}