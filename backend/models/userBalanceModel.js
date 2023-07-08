const mongoose =require("mongoose");

const userBalanceSchema=new mongoose.Schema({
    userFrom: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    userTo: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },   
});

module.exports=mongoose.model("UserBalance",userBalanceSchema);