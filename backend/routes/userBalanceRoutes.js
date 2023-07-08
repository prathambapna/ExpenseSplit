const express=require("express");
const isAuthenticatedUser = require("../middleware/auth");
const isValidGroupMembership = require("../middleware/validateGroupMembership");
const { getAllUserBalancesOfAllGroups } = require("../controller/userBalanceController");
const router=express.Router();
router.route("/balances").get(isAuthenticatedUser,getAllUserBalancesOfAllGroups);
module.exports=router;