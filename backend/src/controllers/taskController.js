const Task = require('../models/Task');

// GET all the tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user}).sort({createdAt: -1});

        setTimeout(()=>{
            res.json(tasks);
        },200)
    } catch (error) {
        console.error("Fetch tasks error:", error);
        res.status(500).json({message: "failed to fetch the tasks.."})
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = await Task.create({ title, description, user: req.user });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Create task error:", error);
        res.status(500).json({ message: "failed to create the task.." });
    }
};

const updateTask = async (req, res) =>{
    try {
        const { id } = req.params;
        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user },
            req.body,
            { new: true }
        );
        if(!task){
            return res.status(404).json({message : "no related task found"});
        }
        res.json(task);
    } catch (error) {
        console.error("Update task error:", error);
        res.status(500).json({message : "task update failed"});
    }
}

const deleteTask = async (req, res) =>{
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id, user: req.user });
        if(!task){
            return res.status(404).json({message : "no related task found"});
        }
        res.status(200).json({ message: "task deleted successfully" });
    } catch (error) {
        console.error("Delete task error:", error);
        res.status(500).json({message : "task deletion failed"});
    }
}



module.exports = {getAllTasks, createTask, updateTask, deleteTask};