import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {sendEmail} from '../config/nodemailer.js'


import User from "../models/user.model.js"
import {JWT_EXPIRES_IN,JWT_SECRET} from '../config/env.js'

// what is a request body => req.body is an object containig data from the client (POST request)

export const signUp = async (req,res,next) => {
    // Implement sign up logic here
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Logic to create a new user

        const {name,email,password}=req.body;
        
        // check if user already exists
        const existinguser = await User.findOne({email})

        if(existinguser){
            const error = new Error('user already exists');
            error.statusCode =409;
            throw error;
            
        }

        // Hash password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create([{name, email,password: hashedPassword}],{session});

        const token =jwt.sign({userId:newUser[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        // await sendEmail({
        //     to:email,
        //     subject: 'Welcome to Our App 🎉',
        //     text: `Hi ${name}, welcome to our app!`,
        //     html:`<h2>Welcome, ${name}!</h2><p>Thanks for signing up with us.</p>`
        // });

        await session.commitTransaction();
        session.endSession();
        

        res.status(201).json({
            success:true,
            message:'User created successfully',
            data:{
                token,
                user:newUser[0],
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
export const signIn = async (req,res,next) => {
    try {
        const {email,password} = req.body;

        // check user exist
        const user =await User.findOne({email});
        if(!user){
            const error=new Error('User not found');
            error.statusCode=404;
            throw error;

        }
        const isPasswordvalid = await bcrypt.compare(password,user.password);
        if(!isPasswordvalid){
            const error =new Error('invalid password');
            error.statusCode = 401;
            throw error;
        }
        const token =jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        await sendEmail({
            to: email,
            subject: 'Welcome to Our App 🎉',
            text: `Hi ${email}, welcome to our app!`,
            html: `<h2>Welcome, ${email}!</h2><p>Thanks for signing up with us.</p>`,
            
        });


        res.status(200).json({
            success:true,
            message: 'User signed in succesfully',
            data:{
                token,
                user,
            }
        });
    } catch (error) {
        next(error)
    }
}
// 
export const signOut = async (req, res, next) => { }

