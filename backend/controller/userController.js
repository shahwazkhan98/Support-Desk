const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Vallidation
  if (!name || !email || !password) {
    // res.status(400).json({
    //   message: "Please include all Detail",
    // });
    res.status(400);
    throw new Error("Please Include all Field");
  }

  // Find User Exist
  const userExists = await User.findOne({ email : email });
  if(userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  // Hash Pass

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token : generatToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
  res.send("User Registered");
});

const loginUser = asyncHandler(async(req,res)=>{
  const {email , password} = req.body
  if(!email || !password){
     res.status(400);
     throw new Error("Please include all Detail");
  }

  const user = await User.findOne({email});
  if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email:user.email,
      token : generatToken(user._id)
    })
  }else{
    res.status(401);
    throw new Error("Invalid Credential")
  }
});



const getMe = (req,res)=>{
  res.send("Me Route")
}
// Generat Token
const generatToken = (id)=>{
return jwt.sign({id}, process.env.JWT_SECRET , {
  expiresIn :'30d'
})
}
module.exports = {registerUser , loginUser, getMe};
