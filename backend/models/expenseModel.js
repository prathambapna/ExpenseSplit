const mongoose =require("mongoose");

const expenseSchema=new mongoose.Schema({
    description:{
        type:String,
        required:[true,"Please enter expense description"],
        maxLength:[50,"Max length for description is 30"],
    },
    amount:{
        type:Number,
        required:[true,"Please enter the amount"],
    },
    group:{
        type:mongoose.Schema.ObjectId,
        ref:"Group",
        required:true,
    },
    payer:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    participants:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            share:{
                type:Number,
                default:0,
                required:true,
            }
        }
    ],
});

module.exports=mongoose.model("Expense",expenseSchema);