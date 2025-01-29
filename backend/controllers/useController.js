import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// Login user
const loginUser = async(req,res) =>{

  const {email,password} = req.body;

  try {
    
    // check the email has already registered
    const user = await userModel.findOne({email})
    if(!user){
      return res.json({success:false,message:"User Doesn't exist"})
    }

    // compare the password and hashed password are same
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.json({success:false,message:"Invalid credentials"})
    }

    // create token to login successful user
    const token = createToken(user._id)
    res.json({success:true,token})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

// creating a function for jwt token
const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}



// Register user
const registerUser = async(req,res)=>{

  const {name,email,password} = req.body
  try {
    // checking user email is already exist
    const exist = await userModel.findOne({email})
    if(exist){
      return res.json({success:false,message:"User already exist"})
    }

    // validating email format and strong password
    if(!validator.isEmail(email)){
      return res.json({success:false,message:"Please enter a valid email"})
    }
    if(password.length<8){
      return res.json({success:false,message:"Please enter a strong password"})
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password,salt)

    // creating the new user in the database
    const newUser = new userModel({
      name,
      email,
      password:hashedPassword
    })
    const user = await newUser.save()
    
    const token = createToken(user._id)
    res.json({success:true,token})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }



}


export {loginUser,registerUser}