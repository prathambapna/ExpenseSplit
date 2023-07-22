const mongoose =require("mongoose");

const groupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter group name"],
        maxLength:[20,"Max length for name is 20"],
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
            type:mongoose.Schema.ObjectId,
            ref:"UserBalance"
        }
    ],
    transactions:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Transaction"
        }
    ]
    
});

module.exports=mongoose.model("Group",groupSchema);


