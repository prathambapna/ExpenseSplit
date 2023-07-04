const express=require("express");
const { getAllUsers, registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, myGroups } = require("../controller/userController");
const isAuthenticatedUser = require("../middleware/auth");
const router=express.Router();

router.route("/users").get(isAuthenticatedUser, getAllUsers);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser,getUserDetails);

router.route("/password/update").put(isAuthenticatedUser,updatePassword);

router.route("/me/update").put(isAuthenticatedUser,updateProfile);

router.route("/me/groups").get(isAuthenticatedUser,myGroups);

module.exports=router;