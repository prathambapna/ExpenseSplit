const ErrorHandler=require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const Group=require("../models/groupModel");
const Expense=require("../models/expenseModel");

exports.createExpenseUnequal=catchAsyncErrors(async(req,res,next)=>{
    const {title,description,amount,payer,participants}=req.body;
    
    const group=await Group.findById(req.group._id);

    //payer and participants are there in the group
    const isPayerThereInGroup=await group.participants.find((u)=>u.toString()===payer.toString());
    if(!isPayerThereInGroup){
        return next(new ErrorHandler(`payer : ${payer.toString()} not there in group`),400);
    }

    const allUsersInGroup =await  participants.every(p => group.participants.includes(p.user));
    if(!allUsersInGroup){
        return next(new ErrorHandler("invalid participants"),400);
    }


    //check if total amount is equal to share of users
    let totalShare=0;
    await participants.forEach((p)=>{
        totalShare+=Number(p.share);
    });

    if(totalShare!==Number(amount)){
        return next(new ErrorHandler("Total amount not matches with sum of user's share",400));
    }

    //create expense

    const expense=await Expense.create({
        title,description,amount,payer,participants,
        group:req.group._id,
    });


    group.expenses.push(expense);
    await group.save({validateBeforeSave:false});

    res.status(201).json({
        success:true,
        expense,
    })

})