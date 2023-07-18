const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const Group = require("../models/groupModel");
const UserBalance = require("../models/userBalanceModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary=require("cloudinary");

//register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const myCloud =await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatars",
    width:150,
    crop:"scale",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given email and password both
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }

  sendToken(user, 200, res);
});

//logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  //eg : http://localhost/api/v1.....

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Expense_SPLIT Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //finding user with this hash token below (we created this while creating getResetPasswordToken in userModels)
  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password does not match confirm password", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//get all users
exports.getAllUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//geat user details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect"), 400);
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("password does not match with confirm password"),
      400
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

//update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

  let newUserData = {
    name: req.body.name,
    email: req.body.email,
  };


  if(req.body.avatar!==""){
    const user=await User.findById(req.user.id);

    // Check if the user has an existing avatar
    if (user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }
    const myCloud =await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder:"avatars",
      width:150,
      crop:"scale",
    });

    newUserData.avatar={
      public_id:myCloud.public_id,
      url:myCloud.secure_url,
    }
  }
  

  const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await updatedUser.save();
  res.status(200).json({
    success: true,
  });
});

//get all groups in which current user is present
exports.myGroups = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId)
  .populate('groupList')
  .populate({
    path: 'groupList',
    populate: {
      path: 'createdBy',
      model: 'User',
      select:'name',
    },
  });

  if (!user) {
    return next(new ErrorHandler("User does not exist", 400));
  }

  res.status(200).json({
    success: true,
    groups: user.groupList,
  });
});

//get all balances of a user
exports.myBalances = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    let balances = [];

    let userBalances = await UserBalance.find();
    for(const balance of userBalances){
      if(balance.balance===0){
        userBalances= userBalances.filter((bal)=>bal!==balance);
      }
    }
    for (const balance of userBalances) {
        if (balance.userFrom.toString() === userId.toString()) {
            let found = false;
            for (const userMap of balances) {
                if (userMap.user.toString() === balance.userTo.toString()) {
                    userMap.amount += balance.balance;
                    found = true;
                    break;
                }
            }
            if (!found) {
                balances.push({
                    user: balance.userTo,
                    amount: balance.balance,
                });
            }
        } 
        else if (balance.userTo.toString() === userId.toString()) {
            let found = false;
            for (const userMap of balances) {
                if (userMap.user.toString() === balance.userFrom.toString()) {
                    userMap.amount -= balance.balance;
                    found = true;
                    break;
                }
            }
            if (!found) {
                balances.push({
                    user: balance.userFrom,
                    amount: balance.balance * -1,
                });
            }
        }
    }

    for(const balance of balances){
        const user=await User.findById(balance.user);
        balance.user={
            name:user.name,
            email:user.email,
        }
        const type = balance.amount > 0 ? "lent" : "owe";
        balance.amount=Math.round(balance.amount*100)/100;
        balance.message = `You ${type} ${Math.abs(balance.amount)} to ${balance.user.name}`;
    }

    res.status(200).json({
        success: true,
        balances,
    });
});
