const User = require('../models/Users');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

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

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            phone,
            address,
            role:finalRole
        });
        await newUser.save();

        res.status(201).json({
            success:true,
            message:'You are signed up successfully'
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:'Sign up failed'
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