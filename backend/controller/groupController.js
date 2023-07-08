const ErrorHandler=require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const Group=require("../models/groupModel");

//create a group
exports.createGroup=catchAsyncErrors(async(req,res,next)=>{
    const {name}=req.body;
    const group=await Group.create({
        name,
        createdAt:Date.now(),
        createdBy:req.user._id,
    });

    //adding the group in user's group list
    const user=await User.findById(req.user._id);
    user.groupList.push(group);
    await user.save({validateBeforeSave:false});

    group.participants.push(user);
    await group.save({validateBeforeSave:false});

    res.status(201).json({
        success:true,
        group,
    })
});


//add user to a group
exports.addUserToGroup=catchAsyncErrors(async(req,res,next)=>{
    const {groupId}=req.params;
    const user=await User.findById(req.body.userId);
    const group=await Group.findById(groupId);

    if(!user){
        return next(new ErrorHandler("User does not exist",400));
    }

    if(!group){
        return next(new ErrorHandler("Group does not exist",400));
    }

    //only user admin can add members
    if(group.createdBy.toString() !== req.user._id.toString()){
        return next(new ErrorHandler("You are not authorised to add user to this group",404));
    }

    //if member alreay present in group
    const isUserExistingInGroup=await group.participants.find((u)=>u.toString()===req.body.userId);
    if(isUserExistingInGroup){
        return next(new ErrorHandler("User already exists in group",400));
    }

    group.participants.push(user);
    await group.save({validateBeforeSave:false});

    user.groupList.push(group);
    await user.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
        group,
    })

});

//remove user from a group
exports.removeUserFromGroup=catchAsyncErrors(async(req,res,next)=>{
    const {userId,groupId}=req.params;

    const user=await User.findById(userId);
    const group=await Group.findById(groupId);

    if(!user){
        return next(new ErrorHandler("User does not exist",400));
    }

    if(!group){
        return next(new ErrorHandler("Group does not exist",400));
    }

    //only user admin can remove members
    if(group.createdBy.toString() !== req.user._id.toString()){
        return next(new ErrorHandler("You are not authorised to remove user from this group",404));
    }

    //if member not present in group
    const isUserExistingInGroup=await group.participants.find((u)=>u.toString()===userId);
    if(!isUserExistingInGroup){
        return next(new ErrorHandler("User does not exists in group",400));
    }


    //if user is groupAdmin , delete group
    if(group.createdBy.toString() === userId){
        await group.participants.forEach(catchAsyncErrors(async(participantId)=>{
            const user=await User.findById(participantId);
            const groupList=await user.groupList.filter((grpId)=>grpId.toString() !== groupId.toString());
            user.groupList=groupList;
            await user.save({validateBeforeSave:false});
        }));
    
        await group.deleteOne();
    
        res.status(200).json({
            success:true,
        });
        return;
    }

    //remove user from participants list in group
    const participants=await group.participants.filter((participantId)=>participantId.toString()!==userId.toString());
    group.participants=participants;
    await group.save({validateBeforeSave:false});

    //remove that group from user's groupList
    const groupList=await user.groupList.filter((grpId)=>grpId.toString() !== groupId.toString());
    user.groupList=groupList;
    await user.save({validateBeforeSave:false});
    

    res.status(200).json({
        success:true,
        group,
    })

});




//delete a group
exports.deleteGroup=catchAsyncErrors(async(req,res,next)=>{
    const group= await Group.findById(req.params.groupId);

    if(!group){
        return next(new ErrorHandler("Group invalid",404));
    }

    //only admin can delete group
    if(group.createdBy.toString() !== req.user._id.toString()){
        return next(new ErrorHandler("You are not authorised to delete this group",404));
    }

    await group.participants.forEach(catchAsyncErrors(async(userId)=>{
        const user=await User.findById(userId);
        const groupList=await user.groupList.filter((grpId)=>grpId.toString() !== req.params.groupId.toString());
        user.groupList=groupList;
        await user.save({validateBeforeSave:false});
    }));

    await group.deleteOne();

    res.status(200).json({
        success:true,
    })
});

//get single group details

exports.groupDetail=catchAsyncErrors(async(req,res,next)=>{
    const {groupId}=req.params;
    
    const group= await Group.findById(req.params.groupId);

    if(!group){
        return next(new ErrorHandler("Group not found",404));
    }

    //existing member can only access group details 
    const isUserExistingInGroup=await group.participants.find((u)=>u.toString()===req.user._id.toString());
    if(!isUserExistingInGroup){
        return next(new ErrorHandler("You are not authorised to access this group",400));
    }

    res.status(200).json({
        success:true,
        group,
    })

});


//get group expenses
exports.groupExpenses=catchAsyncErrors(async(req,res,next)=>{
    const group=await Group.findById(req.group._id);
    await group.populate('expenses');
    res.status(200).json({
        success:true,
        expenses:group.expenses,
    })
})


//get group members
exports.groupMembers=catchAsyncErrors(async(req,res,next)=>{
    const group=await Group.findById(req.group._id);
    await group.populate('participants','name email groupList');
    res.status(200).json({
        success:true,
        members:group.participants,
    })
})



//update group name
exports.updateGroupName=catchAsyncErrors(async(req,res,next)=>{
    req.group.name=req.body.name;

    res.status(200).json({
        success:true,
        group:req.group,
    })
});

//get all balances of a group
exports.groupBalances=catchAsyncErrors(async(req,res,next)=>{

    let balances = [];

    const group = await Group.findById(req.group._id);
    const groupBalances = group.balances;

    for (const balance of groupBalances) {

    let userMap=balances.find((obj) => obj.userFrom.toString() === balance.userTo.toString() && obj.userTo.toString() === balance.userFrom.toString());
    if(!userMap){
        userMap={userFrom:balance.userFrom,userTo:balance.userTo,amount:balance.balance};
        balances.push(userMap);
    }
    else{
        userMap.amount-=balance.balance;
    }
    }

    for (const balance of balances) {
        const userFrom = await User.findById(balance.userFrom);
        const userTo = await User.findById(balance.userTo);
        balance.userFrom = {
          _id: userFrom._id,
          name: userFrom.name,
          email: userFrom.email,
        };
        balance.userTo = {
            _id: userTo._id,
            name: userTo.name,
            email: userTo.email,
        };
        const type=(balance.amount>0)?"lent":"owe";
        balance.message=`${userFrom.name} ${type} ${Math.abs(balance.amount)} to ${userTo.name}`
    }

    balances = balances.filter((balance) => balance.amount !== 0);
  
    res.status(200).json({
      success: true,
      balances,
    });
})