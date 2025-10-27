const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- MongoDB Connection ----------------
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/ems");
    console.log("✅ Connected to MongoDB:", conn.connection.name);
  } catch (err) {
    console.log("❌ MongoDB Connection Error:", err.message);
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

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Employee Management System API is running...");
});

// ✅ Get all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find({}, { _v: 0, _id: 0 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Get single employee by ID
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

// ✅ Add a new employee
app.post("/employees", async (req, res) => {
  const { id, name, department, designation, salary } = req.body;
  try {
    const newEmployee = new Employee({ id, name, department, designation, salary });
    await newEmployee.save();
    res.json({ msg: "Employee added successfully", employee: newEmployee });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// ✅ Update employee by ID
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

// ✅ Delete employee by ID
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
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
