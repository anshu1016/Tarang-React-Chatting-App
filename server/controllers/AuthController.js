import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";

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
            lastname: user.lastName,
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
                    lastname: userData.lastName,
                    firstName: userData.firstName,
                    profileSetup: userData.profileSetup
                  
        })
      
    
      } 
    catch (err) {
        console.log('Error during signup:', err);
        return res.status(500).send("Internal Server Error");
      }
}