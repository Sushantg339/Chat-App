import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/utils.js"
export const registerController = async(req,res)=>{
    try {
        const {fullName , email , password} = req.body
        if(!fullName || !email || !password){
            return res.status(400).json({
                message : "all fields are required"
            })
        }

        if(password.length < 8){
            return res.status(400).json({
                message : "password must be at least 8 characters"
            })
        }

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message : "invalid email format"
            })
        }

        const user = await userModel.findOne({email})

        if(user){
            return res.status(400).json({
                message : "email already exists"
            })
        }

        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password , salt)

        const newUser = new userModel({
            fullName,
            email,
            password : hashedPassword
        })

        if(newUser){
            generateToken(newUser._id , res)
            await newUser.save()
            res.status(201).json({
                _id : newUser._id,
                email : newUser.email,
                fullName : newUser.fullName,
                profilePic : newUser.profilePic
            })
        }else{
            return res.status(400).json({
                message : "Invalid User Data"
            })
        }
    } catch (error) {
        console.log('error in register controller: ', error )
        res.status(500).json({
            message : "internal server error"
        })
    }
}

export const loginController = (req,res)=>{
    
}