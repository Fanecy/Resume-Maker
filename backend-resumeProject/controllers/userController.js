import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//生成token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user }, process.env.JWT_SECRET, { expiresIn: "7d" }); //7天内失效
};

export const registerUser = async (req, res) => {
  console.log("收到注册请求:", req.body);
  try {
    const { name, email, password } = req.body;

    //检查用户是否存在
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "用户已存在!" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "密码至少需要8个数字或字母!" });
    }

    //对密码进行哈希处理
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    //创建用户
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "服务器错误",
      error: error.message,
    });
  }
};

//登录函数
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "登录错误,邮箱或密码不正确!" });

    //密码验证
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return res.status(400).json({ message: "登录错误,邮箱或密码不正确!" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "服务器错误",
      error: error.message,
    });
  }
};

//获得用户信息函数
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "获取用户信息错误" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "服务器错误",
      error: error.message,
    });
  }
};
