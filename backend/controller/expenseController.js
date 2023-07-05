const ErrorHandler=require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const Group=require("../models/groupModel");
const Expense=require("../models/expenseModel");

exports.createExpense=catchAsyncErrors(async(req,res,next)=>{
    const {title,description,amount,payer,participants,splitType}=req.body;
    
    const group=await Group.findById(req.group._id);

    //payer and participants are there in the group
    const isPayerThereInGroup=await group.participants.find((u)=>u.toString()===payer.toString());
    if(!isPayerThereInGroup){
        return next(new ErrorHandler(`payer : ${payer.toString()} not there in group`,400));
    }

    const allUsersInGroup =await  participants.every(p => group.participants.includes(p.user));
    if(!allUsersInGroup){
        return next(new ErrorHandler("invalid participants",400));
    }


    //equal split
    if(splitType==="equal"){
        let total_participants=participants.length;
        let equalShare=amount/total_participants;

        await participants.forEach((participant)=>{
            participant.share=equalShare;
        });
    }

    else if(splitType==="unequal"){
        //check if total amount is equal to share of users
        let totalShare=0;
        await participants.forEach((p)=>{
            totalShare+=Number(p.share);
        });

        if(totalShare!==Number(amount)){
            return next(new ErrorHandler("Total amount not matches with sum of user's share",400));
        }
    }


    //create expense

    const expense=await Expense.create({
        title,description,amount,payer,participants,splitType,
        group:req.group._id,
    });


    group.expenses.push(expense);
    await group.save({validateBeforeSave:false});

    res.status(201).json({
        success:true,
        expense,
    })

});



exports.updateExpense=catchAsyncErrors(async(req,res,next)=>{
    const {expenseId}=req.params;
    const updateExpenseFields=req.body;

    const expense=await Expense.findById(expenseId);
    if(!expense){
        return next(new ErrorHandler("Expense not found",400));
    }

    expense.title=updateExpenseFields.title || expense.title;
    expense.description=updateExpenseFields.description || expense.description;
    expense.amount=updateExpenseFields.amount || expense.amount;
    expense.payer=updateExpenseFields.payer || expense.payer;
    expense.participants=updateExpenseFields.participants || expense.participants;
    expense.splitType=updateExpenseFields.splitType || expense.splitType;
    
    const participants= expense.participants;
    if(expense.splitType==="equal"){
        let total_participants=participants.length;
        let equalShare=expense.amount/total_participants;

        participants.forEach((participant)=>{
            participant.share=equalShare;
        });

        expense.participants=participants;

    }
    else if(expense.splitType==="unequal"){
        //check if total amount is equal to share of users
        let totalShare=0;
        participants.forEach((p)=>{
            totalShare+=Number(p.share);
        });

        if(totalShare!==Number(expense.amount)){
            return next(new ErrorHandler("Total amount not matches with sum of user's share",400));
        }
    }


    await expense.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
        expense,
    })
});

//get expense
exports.getExpense=catchAsyncErrors(async(req,res,next)=>{
    const {expenseId}=req.params;

    const expense=await Expense.findById(expenseId);
    if(!expense){
        return next(new ErrorHandler("Expense not found",400));
    }

    return res.status(200).json({
        success:true,
        expense,
    })

});


/*
Delete Expense:

Function to delete an existing expense.
Retrieve the expense by ID.
Remove the expense from the database.
Adjust the group balances accordingly.

Get User Expenses:
Function to retrieve all expenses for a specific user.
Retrieve the expenses associated with the user from the database.
Return the list of expenses.

Calculate Balances:
Function to calculate and update the group balances.
Iterate through the expenses within a group.
Calculate each user's share and update their balance accordingly.
Save the updated balances to the database.

Settlement:
Function to settle outstanding balances within a group.
Identify the users involved in the settlement.
Determine the amounts to be settled for each user.
Create settlement transactions or update balances accordingly.
*/