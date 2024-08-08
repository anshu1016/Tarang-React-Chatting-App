import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";
import {renameSync,unlinkSync} from "fs"
import { request } from "http";
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
}

export const Signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }
    console.log('Creating user...');
    const user = await User.create({ email, password });
    console.log('User created:', user);
    const token = createToken(email, user.id);
    console.log('Token created:', token);
    res.cookie("jwt", token, {
      maxAge,
      secure: true,
      sameSite: "None"
    });
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup
      }
    });

  } catch (err) {
    console.log('Error during signup:', err);
    return res.status(500).send("Internal Server Error");
  }
}

export const login = async(req,res,next) =>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).send("Email and Password are required");
        }
        console.log('Finding user...');
        const user = await User.findOne({ email });
        if(!user){
            console.log('User did not Found:')
            return res.status(404).send("Imvald Email");
        }
        console.log('User Found:', user);

        const auth = await compare(password,user.password);
        if(!auth){
            return res.status(404).send("password should be correct"); 
        }
        const token = createToken(email, user.id);
        console.log('Token created:', token);
        res.cookie("jwt", token, {
          maxAge,
          secure: true,
          sameSite: "None"
        });
        return res.status(200).json({
          user: {
            id: user.id,
            email: user.email,
            image: user.image,
            color: user.color,
            lastName: user.lastName,
            firstName: user.firstName,
            profileSetup: user.profileSetup
          }
        });
    
      } catch (err) {
        console.log('Error during signup:', err);
        return res.status(500).send("Internal Server Error");
      }
}


export const getUserInfo = async(req,res) =>{
    try {
        const userData = await User.findById(req.userId);
        console.log(req.userId,"ID FROM MIDDLEWARE")
        if(!userData){
            return res.status(404).send("User with the given ID not found.")
        }
        return res.status(200).json({
                    id: userData.id,
                    email: userData.email,
                    image: userData.image,
                    color: userData.color,
                    lastName: userData.lastName,
                    firstName: userData.firstName,
                    profileSetup: userData.profileSetup        
        })
      } 
    catch (err) {
        console.log('Error during signup:', err);
        return res.status(500).send("Internal Server Error");
      }
}

export const updateProfile = async(req,res) =>{
    try {
        const {userId} = req;
        const {firstName,lastName,color} = req.body;
       
        if(!firstName || !lastName){
            return res.status(404).send("FirstName, LastName or Color is required")
        }

        const userData = await User.findByIdAndUpdate(userId,{firstName,lastName,color,profileSetup:true},{new:true,runValidators:true});
        console.log(req.userId,"ID FROM MIDDLEWARE")
        return res.status(200).json({
                    id: userData.id,
                    email: userData.email,
                    image: userData.image,
                    color: userData.color,
                    lastName: userData.lastName,
                    firstName: userData.firstName,
                    profileSetup: userData.profileSetup        
        })
      } 
    catch (err) {
        console.log('Error during signup:', err);
        return res.status(500).send("Internal Server Error");
      }
}


export const addProfileImage = async(req,res) =>{
    try {
        if(!req.file){
            return res.status(400).send("File is required.")
        }
        const date =  Date.now();
        let fileName = "uploads/profiles/" + date +req.file.originalname
       renameSync(req.file.path,fileName);

       const updatedUser = await User.findByIdAndUpdate(req.userId,{image:fileName},{new:true,runValidators:true})
       
        return res.status(200).json({           
                    image: updatedUser.image,                
        })
      } 
    catch (err) {
        console.log('Error during signup:', err);
        return res.status(500).send("Internal Server Error");
      }
}

export const removeProfileImage = async(req,res) =>{
    try {
        const {userId} = req;
        const user = await User.findById(userId)
       if(!user){
        return res.status(404).send("User not found")
       }
       if(user.image){
        unlinkSync(user.image)

       }
       user.image = null;
       await user.save()
        
        return res.status(200).send("Profile Image Removed Successfully.")
      } 
    catch (err) {
        console.log('Error during signup:', err);
        return res.status(500).send("Internal Server Error");
      }
}