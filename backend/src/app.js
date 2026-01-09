const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.get("/", (req, res) => {
  res.send("Kanban Todo Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});