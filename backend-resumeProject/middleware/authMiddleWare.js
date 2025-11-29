import User from "../models/userModel";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token = req.header.authorization; //尝试获取token
    if (token && token.startsWith("Bearer")) {
      //格式校验，通常Token从Bearer开始
      token = token.split(" ")[1]; //只要bearer后的部分
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //验证
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "没有权限，没有找到Token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token出错" });
    error: error.message;
  }
};
