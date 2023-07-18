const express=require("express");
const isAuthenticatedUser = require("../middleware/auth");
const clearNullBalancesRecord=require("../middleware/clearNullBalancesRecord");
const { createGroup, addUserToGroup, removeUserFromGroup, deleteGroup, groupDetail, groupExpenses, groupMembers, updateGroupName, groupBalances, settleUp } = require("../controller/groupController");
const isValidGroupMembership = require("../middleware/validateGroupMembership");
const router=express.Router();

router.route("/group/create").post(isAuthenticatedUser,createGroup);

router.route("/group/:groupId/addUser").post(isAuthenticatedUser,addUserToGroup);

router.route("/group/:groupId/user/:userId").delete(isAuthenticatedUser,removeUserFromGroup);

router.route("/group/:groupId/delete").delete(isAuthenticatedUser,deleteGroup);

router.route("/group/:groupId/update").patch(isAuthenticatedUser,isValidGroupMembership,updateGroupName);

router.route("/group/:groupId").get(isAuthenticatedUser,groupDetail);

router.route("/group/:groupId/expenses").get(isAuthenticatedUser,isValidGroupMembership,groupExpenses);

router.route("/group/:groupId/members").get(isAuthenticatedUser,isValidGroupMembership,groupMembers);

router.route("/group/:groupId/balances").get(isAuthenticatedUser,isValidGroupMembership,groupBalances);

router.route("/group/:groupId/settleBalance/:balanceId").delete(isAuthenticatedUser,isValidGroupMembership,settleUp);

module.exports=router;