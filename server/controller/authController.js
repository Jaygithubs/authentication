const User = require('../models/Users');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/emailSend');
const emailVerificationTemplate = require('../utils/emailVerificationTemplate');

const getUsers = async (req,res) => {
    const users = await User.find();
    res.send(users);
}

const registerUser = async (req,res) => {
    
    try
    {
        const { name,email,password,phone,address,role } = req.body;

        const existingUser = await User.findOne({email});

        // check already exist 
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:'User already registered'
            });
        }

        // hash the password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // check user role
        let finalRole = "Customer"; // default

        if (role === "Provider") {
        finalRole = "Provider";
        }

        if (role === "Delivery") {
        finalRole = "Delivery";
        }

        // generate email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const emailVerificationToken = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex');
        const emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            phone,
            address,
            role:finalRole,
            emailVerified:false,
            emailVerificationToken:emailVerificationToken,
            emailVerificationExpires:emailVerificationExpires
        });

        await newUser.save();

        // sending verification email here
        const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
        const html = emailVerificationTemplate(name,verifyLink);
        await sendEmail({
            to:email,
            subject:'Email Verification',
            html:html
        });

        res.status(201).json({
            success:true,
            message:'You are signed up successfully'
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:'Sign up failed',
            error:err.message
        })
    }

}

const loginUser = async (req,res) => {
    
    try
    {
        const { email,password } = req.body;

        // check user exist
        const isUserExists = await User.findOne({email});
        if(!isUserExists)
        {
            return res.status(400).json({
                success:false,
                message:'Invalid email or password'
            })
        }

        // compare password
        const isPasswordMatch  = await bcrypt.compare(password,isUserExists.password)
        if(!isPasswordMatch)
        {
            return res.status(400).json({
                success:false,
                message:'Invalid email or password'
            })
        }

        if (!isUserExists.emailVerified) {
        return res.status(401).json({
            success: false,
            message: "Please verify your email first"
        });
        }


        // create JWT token
        const token = jwt.sign(
            {
                id:isUserExists.id,
                role:isUserExists.role
            },
            process.env.JWT_SECRET
        );

        // send response
        res.status(200).json({
            success:true,
            message:'Login successful',
            Token:token
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:'Login failed'
        });
    }

}

module.exports={getUsers,registerUser,loginUser}