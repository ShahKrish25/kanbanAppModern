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
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.get("/", (req, res) => {
  res.send("Kanban Todo Backend is running 🚀");
});
// if no route found
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});