const ErrorHandler=require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const Group=require("../models/groupModel");
const Expense=require("../models/expenseModel");
const UserBalance=require("../models/userBalanceModel");

exports.getAllUserBalancesOfAllGroups=catchAsyncErrors(async(req,res,next)=>{
    const userBalances=await UserBalance.find();
    res.status(200).json({
        success:true,
        userBalances,
    })
});
