const express=require("express");
const isAuthenticatedUser = require("../middleware/auth");
const isValidGroupMembership=require("../middleware/validateGroupMembership");
const { createExpense, updateExpense, getExpense, deleteExpense } = require("../controller/expenseController");
const router=express.Router();

router.route("/group=:groupId/expense/create").post(isAuthenticatedUser,isValidGroupMembership,createExpense);

router.route("/group=:groupId/expense/:expenseId").get(isAuthenticatedUser,isValidGroupMembership,getExpense)
                                                  .patch(isAuthenticatedUser,isValidGroupMembership,updateExpense)
                                                  .delete(isAuthenticatedUser,isValidGroupMembership,deleteExpense);

                                                  

module.exports=router;