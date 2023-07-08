const express=require("express");
const isAuthenticatedUser = require("../middleware/auth");
const { createGroup, addUserToGroup, removeUserFromGroup, deleteGroup, groupDetail, groupExpenses, groupMembers, updateGroupName } = require("../controller/groupController");
const isValidGroupMembership = require("../middleware/validateGroupMembership");
const router=express.Router();

router.route("/group/create").post(isAuthenticatedUser,createGroup);

router.route("/group/addUser/:groupId").post(isAuthenticatedUser,addUserToGroup);

router.route("/group/:groupId/user/:userId").delete(isAuthenticatedUser,removeUserFromGroup);

router.route("/group/delete/:groupId").delete(isAuthenticatedUser,deleteGroup);

router.route("/group/update/:groupId").patch(isAuthenticatedUser,isValidGroupMembership,updateGroupName);

router.route("/group/:groupId").get(isAuthenticatedUser,groupDetail);

router.route("/group=:groupId/expenses").get(isAuthenticatedUser,isValidGroupMembership,groupExpenses);

router.route("/group=:groupId/members").get(isAuthenticatedUser,isValidGroupMembership,groupMembers);

module.exports=router;