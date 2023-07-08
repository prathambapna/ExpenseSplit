const ErrorHandler=require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const Group=require("../models/groupModel");
const Expense=require("../models/expenseModel");
const UserBalance=require("../models/userBalanceModel");

const clearBalancesWithNoAmount=catchAsyncErrors(async(req,res,next)=>{
    let userBalances=await UserBalance.find();
    for(const balance of userBalances){
        if(balance.balance===0){
            userBalances= await userBalances.filter((bal)=>bal!==balance);
        }
    }
    res.status(200).json({
        success:true,
        userBalances,
    })
});

module.exports=clearBalancesWithNoAmount;