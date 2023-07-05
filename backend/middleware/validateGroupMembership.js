const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const Group=require("../models/groupModel");
const User=require("../models/userModel");

const isValidGroupMembership=catchAsyncError(async(req,res,next)=>{
    const {groupId,userId}=req.params;

    const user=await User.findById(userId);
    const group=await Group.findById(groupId);

    if(!user){
        return next(new ErrorHandler("User does not exist",400));
    }

    if(!group){
        return next(new ErrorHandler("Group does not exist",400));
    }

    const isMember=await group.participants.find((u)=>u.toString()===userId.toString());

    if(!isMember){
        return next(new ErrorHandler("Group members can only add expense to this group",403));
    }

    req.group=group;
    next();
});

module.exports=isValidGroupMembership;