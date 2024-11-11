const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});

router.post("/signup", async (req, res) => {
  const { name, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  try {
    const existingUser = await User.findOne({ name: name });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
    }

    const newUser = new User({
      name: name,
      password,
    });

    await newUser.save();
    res.redirect("/login.html");
  } catch (error) {
    res.status(500).json({ message: "회원가입 처리 중 오류 발생", error });
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name: name });
    if (!user) {
      return res.status(400).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
    }

    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/index.html");
  } catch (error) {
    res.status(500).json({ message: "로그인 처리 중 오류 발생", error });
  }
});

module.exports = router;
