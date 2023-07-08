const mongoose =require("mongoose");

const groupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter group name"],
        maxLength:[30,"Max length for name is 30"],
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
    },
    participants:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    expenses:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Expense"
        }
    ],
    balances:[
        {
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
        }
    ],
    
});

module.exports=mongoose.model("Group",groupSchema);


