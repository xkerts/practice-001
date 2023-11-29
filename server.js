const express = require("express");
require("dotenv").config();
const app = express();
const tasks = require("./router/app.router");
const mongoose = require("mongoose");
const connectDB = require("./config/dbconn");
//ENV VARIABLES
const port = process.env.SERVER_PORT;

//Connect to DB
connectDB();

//Middleware
app.use(express.json());

//Routes
app.get("/hello", (req, res) => {
  res.send("Task manager App");
});

app.use("/api/v1/tasks", tasks);

app.listen(port, console.log(`Server Listening on port ${port}`));
