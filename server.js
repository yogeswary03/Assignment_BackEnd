const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// In-memory array (acts as our “database”)
let employees = [
  { id: 1, name: "John Doe", department: "HR", designation: "Manager", salary: 50000 },
  { id: 2, name: "Jane Smith", department: "IT", designation: "Developer", salary: 65000 },
];

// ✅ Home route
=======
// ---------------- MongoDB Connection ----------------
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/ems");
    console.log("Connected to MongoDB:", conn.connection.name);
  } catch (err) {
    console.log("MongoDB Connection Error:", err.message);
  }
};
connectDB();

// ---------------- Schema & Model ----------------
const employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  department: String,
  designation: String,
  salary: Number,
});

const Employee = mongoose.model("Employees", employeeSchema);

// ------------------- Routes -------------------

//  Default route
>>>>>>> 10e1c0da48db6cc8d622290d2399efae3f8a06d9
app.get("/", (req, res) => {
  res.send("Employee Management System API (In-Memory Version)");
});

<<<<<<< HEAD
// ✅ Get all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// ✅ Get one employee by ID
app.get("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === id);
  if (!employee) return res.status(404).json({ msg: "Employee not found" });
  res.json(employee);
});

// ✅ Add new employee
app.post("/employees", (req, res) => {
=======
//  Get all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find({}, { _v: 0, _id: 0 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//  Get single employee by ID
app.get("/employees/:eid", async (req, res) => {
  const id = parseInt(req.params.eid);
  try {
    const employee = await Employee.findOne({ id: id }, { _v: 0, _id: 0 });
    if (!employee) return res.status(404).json({ msg: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//  Add a new employee
app.post("/employees", async (req, res) => {
>>>>>>> 10e1c0da48db6cc8d622290d2399efae3f8a06d9
  const { id, name, department, designation, salary } = req.body;
  if (!id || !name || !department || !designation || !salary)
    return res.status(400).json({ msg: "All fields are required" });

  // Check for duplicate ID
  if (employees.find((emp) => emp.id === parseInt(id)))
    return res.status(400).json({ msg: "Employee ID already exists" });

  const newEmployee = { id: parseInt(id), name, department, designation, salary: Number(salary) };
  employees.push(newEmployee);
  res.json({ msg: "Employee added successfully", employee: newEmployee });
});

<<<<<<< HEAD
// ✅ Update an employee
app.put("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return res.status(404).json({ msg: "Employee not found" });

  employees[index] = { ...employees[index], ...req.body };
  res.json({ msg: "Employee updated successfully", employee: employees[index] });
});

// ✅ Delete an employee
app.delete("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return res.status(404).json({ msg: "Employee not found" });

  employees.splice(index, 1);
  res.json({ msg: "Employee deleted successfully" });
});

// ✅ Start server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
=======
// Update employee by ID
app.put("/employees/:eid", async (req, res) => {
  const id = parseInt(req.params.eid);
  try {
    const result = await Employee.updateOne(
      { id: id },
      { $set: req.body }
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ msg: "Employee not found" });
    res.json({ msg: "Employee updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//  Delete employee by ID
app.delete("/employees/:eid", async (req, res) => {
  const id = parseInt(req.params.eid);
  try {
    const result = await Employee.deleteOne({ id: id });
    if (result.deletedCount === 0)
      return res.status(404).json({ msg: "Employee not found" });
    res.json({ msg: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ---------------- Start Server ----------------
app.listen(3000, () => console.log(" Server running on http://localhost:3000"));
>>>>>>> 10e1c0da48db6cc8d622290d2399efae3f8a06d9
