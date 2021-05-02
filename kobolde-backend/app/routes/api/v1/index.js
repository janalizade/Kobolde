const express = require("express");
const userRouter = require("./user.router");
const adminRouter = require("./admin.router");

const app = express();

app.use("/user/", userRouter);
app.use("/admin/", adminRouter);

module.exports = app;
