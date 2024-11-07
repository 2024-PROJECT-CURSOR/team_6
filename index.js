const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://giyoungLim:team6gy@cluster0.vxn0g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
mongoose
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello world"));

app.listen(port, () => console.log(`Todolist app listening on port ${port}`));
