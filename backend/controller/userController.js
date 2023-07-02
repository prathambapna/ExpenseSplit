const ErrorHandler=require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const sendToken=require("../utils/jwtToken");



//register a user
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user =await User.create({
        name,email,password,
        avatar:{
            public_id:"sample public id",
            url:"profile pic url"
        }
    });

    const token =user.getJWTToken();

    sendToken(user,201,res);
});

//login user
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    //checking if user has given email and password both
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400));
    }
    
    const user=await User.findOne({email:email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password"),401);
    }

    const isPasswordMatched=user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password"),401);
    }

    sendToken(user,200,res);

});

//logout user
exports.logoutUser=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged out"
    })
});


//get all users
exports.getAllUsers=catchAsyncErrors(async(req,res)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users,
    })
});