const Task = require("../model/task");
const getAllTasks = async (req, res) => {
  try {
    const data = await Task.find().exec();
    if (data.length == 0) {
      res.status(204).json(data);
    } else {
      res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ message: "Title and description are required" });
  try {
    const result = await Task.create({ title: title, description: description, status: false });
    res.status(201).json({ message: `The task ${title} was created successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTask = async (req, res) => {
  const id = req.params.id;
  try {
    const foundTask = await Task.findOne({ _id: id }).exec();
    if (!foundTask) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(201).json(foundTask);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateTask = async (req, res) => {
  const id = req.params.id;
  const { title, description, status } = req.body;
  try {
    const foundTask = await Task.findOne({ _id: id }).exec();
    if (!foundTask) {
      res.status(204).json(foundTask);
    } else {
      const result = await Task.updateOne({ title: title, description: description, status: status });
      res.status(201).json({ message: `The task with id ${id} was updated successfully` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const foundTask = await Task.findOne({ _id: id }).exec();
    if (!foundTask) {
      res.status(404).json({ message: "Task not found" });
    } else {
      const result = await Task.deleteOne({ _id: id });
      res.status(201).json({ message: `The task with id ${id} was deleted` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
