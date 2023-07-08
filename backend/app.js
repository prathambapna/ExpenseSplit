const express =require("express");
const app=express();
const cookieParser=require("cookie-parser");
const errorMiddleware=require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

//route imports
const user=require("./routes/userRoutes");
const groupRoute =require("./routes/groupRoutes");
const expenseRoute=require("./routes/expenseRoutes");
const userBalanceRoute=require("./routes/userBalanceRoutes");

app.use("/api/v1",user);
app.use("/api/v1",groupRoute);
app.use("/api/v1",expenseRoute);
app.use("/api/v1",userBalanceRoute);

//middleware for error
app.use(errorMiddleware);

module.exports=app;