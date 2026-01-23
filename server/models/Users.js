const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        street:{
            type:String
        },
        city:{
            type:String,
        },
        pincode:{
            type:String
        }
    },
    role:{
        type:String,
        enum:["Admin","Provider","Customer","Delivery"],
        default:"Customer"
    },
    emailVerified:{
        type:Boolean,
        default:false
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Users",UserSchema);