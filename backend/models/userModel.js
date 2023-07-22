const mongoose =require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt =require("jsonwebtoken");
const crypto =require("crypto");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Max length for name is 30"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"password must be of minimum 8 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    groupList:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Group",
            required:true,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    transactions:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Transaction"
        }
    ],
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});


//hashing password so that no can see that in database
//pre means before , so before save call this func and only if password is modified then only hash
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

//compare password
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

//generating password reset token
userSchema.methods.getResetPasswordToken=function(){
    //generating token
    const resetToken=crypto.randomBytes(20).toString("hex");

    //hashing and add to user schema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;
}

module.exports=mongoose.model("User",userSchema);