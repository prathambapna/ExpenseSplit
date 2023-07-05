const express=require("express");
const isAuthenticatedUser = require("../middleware/auth");
const isValidGroupMembership=require("../middleware/validateGroupMembership");
const { createExpense, updateExpense } = require("../controller/expenseController");
const router=express.Router();

router.route("/group=:groupId/expense/create").post(isAuthenticatedUser,isValidGroupMembership,createExpense);
router.route("/group=:groupId/expense/update/:expenseId").patch(isAuthenticatedUser,isValidGroupMembership,updateExpense);

module.exports=router;