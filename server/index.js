const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;
const DATA_FILE = "users.json"; // File to store user data

app.use(cors());
app.use(bodyParser.json());

// Function to read existing data from the file
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Function to write data to the file
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// API to handle registration
app.post("/api/register", (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Read existing users and add new user
  const users = readData();
  const newUser = { name, email, phone, password };
  users.push(newUser);
  writeData(users);

  console.log("User Registered:", newUser);
  res.json({ message: "User registered successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
