const express=require("express");
const { getAllUsers, registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = require("../controller/userController");
const isAuthenticatedUser = require("../middleware/auth");
const router=express.Router();

router.route("/users").get(isAuthenticatedUser, getAllUsers);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);


module.exports=router;