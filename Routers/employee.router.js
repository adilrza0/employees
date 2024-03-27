const express =require("express");
const { Employee } = require("../Models/employee.model");

const employeeRouter=express.Router();


employeeRouter.get("/", async (req, res) => {
  try {
      // Pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skipIndex = (page - 1) * limit;

      // Filtering
      const filters = {};
      if (req.query.department) {
          filters.department = req.query.department;
      }
      // Add more filters if needed...

      // Sorting
      const sort = {};
      if (req.query.sortBy) {
          const parts = req.query.sortBy.split(':');
          sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
      }

      // Searching
      const searchQuery = {};
      if (req.query.search) {
          searchQuery.$or = [
              { firstName: { $regex: req.query.search, $options: 'i' } },
              { lastName: { $regex: req.query.search, $options: 'i' } },
              { email: { $regex: req.query.search, $options: 'i' } },
              { department: { $regex: req.query.search, $options: 'i' } },
          ];
      }

      const employees = await Employee.find(filters)
          .sort(sort)
          .skip(skipIndex)
          .limit(limit)
          .exec();

      res.status(200).send(employees);
  } catch (error) {
      res.status(400).send({ error: error });
  }
});

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