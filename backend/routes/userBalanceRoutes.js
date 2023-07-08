const express=require("express");
const isAuthenticatedUser = require("../middleware/auth");
const isValidGroupMembership = require("../middleware/validateGroupMembership");
const clearNullBalancesRecord=require("../middleware/clearNullBalancesRecord");
const { getAllUserBalancesOfAllGroups, clearBalancesWithNoAmount } = require("../controller/userBalanceController");

const router=express.Router();

router.route("/balances").get(isAuthenticatedUser,clearNullBalancesRecord,getAllUserBalancesOfAllGroups);

module.exports=router;