const express=require("express");
const { getAllUsers, registerUser, loginUser } = require("../controller/userController");
const router=express.Router();

router.route("/users").get(getAllUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);


module.exports=router;