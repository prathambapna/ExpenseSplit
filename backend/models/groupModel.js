const mongoose =require("mongoose");
const validator=require("validator");
const User=require("./userModel");

const groupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter group name"],
        maxLength:[30,"Max length for name is 30"],
        unique:false,
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
    balances:[
        {
            topic:{
                user:{
                    type:mongoose.Schema.ObjectId,
                    ref:"User",
                    required:true,
                },
                amount:{
                    type:Number,
                    required:true,
                },
            },
            description:[
                {
                    user1:{
                        type:mongoose.Schema.ObjectId,
                        ref:"User",
                        required:true,
                    },
                    user2:{
                        type:mongoose.Schema.ObjectId,
                        ref:"User",
                        required:true,
                    },
                    amount:{
                        type:Number,
                        required:true,
                    },
                }
            ]
        }
    ],
    userAmountMap:[
        {
            usersIncluded:{
                user1:{
                    type:mongoose.Schema.ObjectId,
                    ref:"User",
                    required:true,
                },
                user2:{
                    type:mongoose.Schema.ObjectId,
                    ref:"User",
                    required:true,
                },
            },
            amount:{
                type:Number,
                required:true,
            },
        }
    ]
});

module.exports=mongoose.model("Group",groupSchema);

/*
settleup
[
    {
        user1
        user2
        type
        amount
    }
]
*/

