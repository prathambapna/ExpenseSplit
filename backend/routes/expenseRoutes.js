const express=require("express");
const isAuthenticatedUser = require("../middleware/auth");
const isValidGroupMembership=require("../middleware/validateGroupMembership");
const { createExpenseUnequal } = require("../controller/expenseController");
const router=express.Router();

router.route("/user/:userId/group/:groupId/expense/create/unequal").post(isAuthenticatedUser,isValidGroupMembership,createExpenseUnequal);

module.exports=router;