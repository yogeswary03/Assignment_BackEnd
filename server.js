const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory array (acts as our “database”)
let employees = [
  { id: 1, name: "John Doe", department: "HR", designation: "Manager", salary: 50000 },
  { id: 2, name: "Jane Smith", department: "IT", designation: "Developer", salary: 65000 },
];

// ✅ Home route
app.get("/", (req, res) => {
  res.send("Employee Management System API (In-Memory Version)");
});

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
