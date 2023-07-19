const ErrorHandler=require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const Group=require("../models/groupModel");
const Expense=require("../models/expenseModel");
const UserBalance=require("../models/userBalanceModel");

exports.createExpense=catchAsyncErrors(async(req,res,next)=>{
    let {title,description,amount,payer,participants,splitType}=req.body;
    
    const group=await Group.findById(req.group._id);

    //payer not selected
    if(Object.keys(payer).length === 0){
        return next(new ErrorHandler("Payer is mandatory",400));
    }

    //payer and participants are there in the group
    const isPayerThereInGroup=await group.participants.find((u)=>u.toString()===payer.toString());
    if(!isPayerThereInGroup){
        return next(new ErrorHandler(`payer : ${payer.toString()} not there in group`,400));
    }

    //Participants not present in group
    const allUsersInGroup =await  participants.every(p => group.participants.includes(p.user));
    if(!allUsersInGroup){
        return next(new ErrorHandler("Choose participants that are present in the group",400));
    }

    //payer not added in participant
    const payerThereInParticipants=await participants.find((p)=>p.user.toString()===payer.toString());
    if(!payerThereInParticipants){
        return next(new ErrorHandler("Please do add Payer also in participants",400));
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

    //balances
    let balances = [...group.balances];
    for(const participant of participants){
        if(participant.user.toString()!==payer.toString()){
            const userBalanceMap1 = await UserBalance.findOne({
                $and: [
                    { userFrom: payer },
                    { userTo: participant.user },
                    { _id: { $in: group.balances } }
                ]
            });
            const userBalanceMap2 = await UserBalance.findOne({
                $and: [
                    { userFrom: participant.user },
                    { userTo: payer },
                    { _id: { $in: group.balances } }
                ]
            });
            if(userBalanceMap1){
                userBalanceMap1.balance+=participant.share;
                await userBalanceMap1.save({validateBeforeSave:false});
            }
            else if(userBalanceMap2){
                userBalanceMap2.balance-=participant.share;
                await userBalanceMap2.save({validateBeforeSave:false});
            }
            else{
                const newUserBalance=await UserBalance.create({
                    userFrom:payer,
                    userTo:participant.user,
                    balance:participant.share,
                    group:req.group._id,
                });
                balances.push(newUserBalance);
            }
        }
    }
    
    //removing balance which has amount 0
    for(const balance of balances){
        const userBal=await UserBalance.findById(balance);
        if(userBal.balance===0){
            balances=balances.filter((b)=>b!=balance);
        }
    }
    group.balances= balances;
    
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

    const oldParticipants=expense.participants;
    const oldPayer=expense.payer;
    let balances = [...group.balances];

    for(const participant of oldParticipants){
        if(participant.user.toString()!==oldPayer.toString()){
            const userBalanceMap1 = await UserBalance.findOne({
                $and: [
                    { userFrom: oldPayer },
                    { userTo: participant.user },
                    { _id: { $in:balances } }
                ]
            });
            const userBalanceMap2 = await UserBalance.findOne({
                $and: [
                    { userFrom: participant.user },
                    { userTo: oldPayer },
                    { _id: { $in: balances } }
                ]
            });
            if(userBalanceMap1){
                userBalanceMap1.balance-=participant.share;
                await userBalanceMap1.save({validateBeforeSave:false});
            }
            else if(userBalanceMap2){
                userBalanceMap2.balance+=participant.share;
                await userBalanceMap2.save({validateBeforeSave:false});
            }
        }
    }

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

    let newBalances= [...group.balances];
    for(const participant of participants){
        if(participant.user.toString()!==payer.toString()){
            const userBalanceMap1 = await UserBalance.findOne({
                $and: [
                    { userFrom: payer },
                    { userTo: participant.user },
                    { _id: { $in: newBalances } }
                ]
            });
            const userBalanceMap2 = await UserBalance.findOne({
                $and: [
                    { userFrom: participant.user },
                    { userTo: payer },
                    { _id: { $in: newBalances } }
                ]
            });
            if(userBalanceMap1){
                userBalanceMap1.balance+=participant.share;
                await userBalanceMap1.save({validateBeforeSave:false});
            }
            else if(userBalanceMap2){
                userBalanceMap2.balance-=participant.share;
                await userBalanceMap2.save({validateBeforeSave:false});
            }
            else{
                const newUserBalance=await UserBalance.create({
                    userFrom:payer,
                    userTo:participant.user,
                    balance:participant.share,
                    group:req.group._id,
                });
                newBalances.push(newUserBalance);
            }
        }
    }
    
    for(const balance of newBalances){
        const userBal=await UserBalance.findById(balance);
        if(userBal.balance===0){
            newBalances=newBalances.filter((b)=>b!=balance);
        }
    }
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

//delete expense
exports.deleteExpense=catchAsyncErrors(async(req,res,next)=>{
    const {expenseId}=req.params;
    const group=await Group.findById(req.group._id);
    const expense=await Expense.findById(expenseId);
    if(!expense){
        return next(new ErrorHandler("Expense not found",400));
    }

    const oldParticipants=expense.participants;
    const oldPayer=expense.payer;
    let balances = [...group.balances];

    for(const participant of oldParticipants){
        if(participant.user.toString()!==oldPayer.toString()){
            const userBalanceMap1 = await UserBalance.findOne({
                $and: [
                    { userFrom: oldPayer },
                    { userTo: participant.user },
                    { _id: { $in:balances } }
                ]
            });
            const userBalanceMap2 = await UserBalance.findOne({
                $and: [
                    { userFrom: participant.user },
                    { userTo: oldPayer },
                    { _id: { $in: balances } }
                ]
            });
            if(userBalanceMap1){
                userBalanceMap1.balance-=participant.share;
                await userBalanceMap1.save({validateBeforeSave:false});
            }
            else if(userBalanceMap2){
                userBalanceMap2.balance+=participant.share;
                await userBalanceMap2.save({validateBeforeSave:false});
            }
        }
    }

    for(const balance of balances){
        const userBal=await UserBalance.findById(balance);
        if(userBal.balance===0){
            balances=balances.filter((b)=>b!=balance);
        }
    }
    group.balances= balances;
    
    await group.save({validateBeforeSave:false});
    
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







