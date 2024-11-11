const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  todos: [
    {
      text: { type: String, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.updateTodo = async function (todoId, newText) {
  const todo = this.todos.id(todoId);
  if (todo) {
    todo.text = newText;
    await this.save();
  }
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
