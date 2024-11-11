const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoute = require("./router/auth");
const todoRoute = require("./router/todo");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://giyoungLim:team6gy@cluster0.vxn0g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.redirect("/auth/signup");
});

app.use("/auth", authRoute);
app.use("/todo", todoRoute);

app.listen(port, () => console.log(`Todolist app listening on port ${port}`));
