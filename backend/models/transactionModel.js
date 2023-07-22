const mongoose =require("mongoose");

const transactionSchema=new mongoose.Schema({
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
    amount: {
        type: Number,
        default: 0,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    }
});

module.exports=mongoose.model("Transaction",transactionSchema);