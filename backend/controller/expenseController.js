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
    let balances= group.balances;
    await participants.forEach(catchAsyncErrors(async(participant)=>{
        if(payer.toString()!==participant.user.toString()){
            const userBalanceMap=await balances.find((obj)=>
                obj.userFrom.toString()===payer.toString() && obj.userTo.toString()===participant.user.toString(),
            );
            if(!userBalanceMap){
                balances.push(({
                    userFrom:payer,
                    userTo:participant.user,
                    balance:participant.share,
                    group:req.group._id,
                }));
            }
            else{
                userBalanceMap.balance+=participant.share;
            }
        }
    }));
    balances = balances.filter((b) => b.balance !== 0);
    group.balances=balances;
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

    const group=await Group.findById(req.group._id);
    const balances= group.balances;
    const oldParticipants=expense.participants;
    const oldPayer=expense.payer;
    await oldParticipants.forEach(catchAsyncErrors(async(participant)=>{
        if(oldPayer.toString()!==participant.user.toString()){
            const userBalanceMap=await balances.find((obj)=>
                obj.userFrom.toString()===oldPayer.toString() && obj.userTo.toString()===participant.user.toString(),
            );
            userBalanceMap.balance-=participant.share;
        }
    }));
    group.balances=balances;
    await group.save({validateBeforeSave:false});

    expense.title=updateExpenseFields.title || expense.title;
    expense.description=updateExpenseFields.description || expense.description;
    expense.amount=updateExpenseFields.amount || expense.amount;
    expense.payer=updateExpenseFields.payer || expense.payer;
    expense.participants=updateExpenseFields.participants || expense.participants;
    expense.splitType=updateExpenseFields.splitType || expense.splitType;
    
    const participants= expense.participants;
    const payer=expense.payer;
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

    let newBalances= group.balances;
    await participants.forEach(catchAsyncErrors(async(participant)=>{
        if(payer.toString()!==participant.user.toString()){
            const userBalanceMap=await newBalances.find((obj)=>
                obj.userFrom.toString()===payer.toString() && obj.userTo.toString()===participant.user.toString(),
            );
            if(!userBalanceMap){
                newBalances.push(({
                    userFrom:payer,
                    userTo:participant.user,
                    balance:participant.share,
                    group:req.group._id,
                }));
            }
            else{
                userBalanceMap.balance+=participant.share;
            }
        }
    }));
    newBalances = newBalances.filter((b) => b.balance !== 0);
    group.balances=newBalances;
    await group.save({validateBeforeSave:false});
    

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


exports.deleteExpense=catchAsyncErrors(async(req,res,next)=>{
    const {expenseId}=req.params;
    const group=await Group.findById(req.group._id);
    const expense=await Expense.findById(expenseId);
    if(!expense){
        return next(new ErrorHandler("Expense not found",400));
    }
    let balances= group.balances;
    const oldParticipants=expense.participants;
    const oldPayer=expense.payer;
    await oldParticipants.forEach(catchAsyncErrors(async(participant)=>{
        if(oldPayer.toString()!==participant.user.toString()){
            const userBalanceMap=await balances.find((obj)=>
                obj.userFrom.toString()===oldPayer.toString() && obj.userTo.toString()===participant.user.toString(),
            );
            userBalanceMap.balance-=participant.share;
        }
    }));
    balances = balances.filter((b) => b.balance !== 0);
    group.balances=balances;
    
    const expenseList=await group.expenses.filter((expId)=>expId.toString() !== expenseId.toString());
    group.expenses=expenseList;
    
    await group.save({validateBeforeSave:false});

    await expense.deleteOne();

    res.status(200).json({
        success:true,
    });

});

/*


Settlement:
Function to settle outstanding balances within a group.
Identify the users involved in the settlement.
Determine the amounts to be settled for each user.
Create settlement transactions or update balances accordingly.
*/







