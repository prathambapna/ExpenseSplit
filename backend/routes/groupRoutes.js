const express=require("express");
const isAuthenticatedUser = require("../middleware/auth");
const { createGroup, addUserToGroup, removeUserFromGroup, deleteGroup } = require("../controller/groupController");
const router=express.Router();

router.route("/group/create").post(isAuthenticatedUser,createGroup);
router.route("/group/addUser/:groupId").post(isAuthenticatedUser,addUserToGroup);
router.route("/group/:groupId/user/:userId").delete(isAuthenticatedUser,removeUserFromGroup);
router.route("/group/delete/:groupId").delete(isAuthenticatedUser,deleteGroup);

module.exports=router;