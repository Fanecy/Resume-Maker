import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/db.js";

const app = express();
const port = 4000;

//中间件：连通前后端
app.use(cors());

//连接数据库
connectDB();

app.use(express.json());

//Route
// 定义 GET 类型路由：路径为 "/"（根路径），用于测试服务器是否启动成功
app.get("/", (req, res) => {
  // 向客户端（浏览器/前端）返回响应：字符串 "API WORKING"
  res.send("API WORKING");
});

// 监听指定端口，启动服务器
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
