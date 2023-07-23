const express =require("express");
const app=express();
const cookieParser=require("cookie-parser");
const errorMiddleware=require("./middleware/error");
const bodyParser =require("body-parser");
const fileUpload=require("express-fileupload");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//route imports
const user=require("./routes/userRoutes");
const groupRoute =require("./routes/groupRoutes");
const expenseRoute=require("./routes/expenseRoutes");
const userBalanceRoute=require("./routes/userBalanceRoutes");

app.use("/api/v1",user);
app.use("/api/v1",groupRoute);
app.use("/api/v1",expenseRoute);
app.use("/api/v1",userBalanceRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});


//middleware for error
app.use(errorMiddleware);

module.exports=app;