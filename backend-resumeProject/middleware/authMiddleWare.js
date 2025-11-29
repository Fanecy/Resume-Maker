import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token = req.header.authorization; //尝试获取token
    if (token && token.startsWith("Bearer")) {
      //格式校验，通常Token从Bearer开始
      token = token.split(" ")[1]; //只要bearer后的部分
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //验证 Token 的签名和有效
      req.user = await User.findById(decoded.id).select("-password"); //确认用户存在
      next(); //继续下一步，不然驳回
    } else {
      res.status(401).json({ message: "没有权限,没有找到Token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token出错" });
    error: error.message;
  }
};
