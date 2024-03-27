const express =require("express");
const { Employee } = require("../Models/employee.model");

const employeeRouter=express.Router();


employeeRouter.get("/",async(req,res)=>{

    try {
        const employees= await Employee.find();
        res.status(200).send(employees)
    } catch (error) {
        res.status(400).send({error:error})
    }

})

employeeRouter.post("/",async(req,res)=>{
    try {
        const newEmp= new Employee(req.body);
        await newEmp.save();
        res.status(200).send({msg:"employee added"})
    } catch (error) {
        res.status(400).send({error:error})
    }
})


employeeRouter.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Employee.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: 'Item not found' });
    }
  });

  employeeRouter.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedItem = await Employee.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedItem);
    } catch (error) {
        console.log(error)
      res.status(404).json({ error: 'Item not found' });
    }
  });

module.exports={
    employeeRouter
}