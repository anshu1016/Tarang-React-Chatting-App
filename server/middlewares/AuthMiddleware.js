import jwt from "jsonwebtoken";

export const verifyToken = async(req,res,next) =>{
    
        console.log(req.cookies,"GET REQ FOR GETUSERINFO")
        const token = req.cookies.jwt;
        console.log({token},"TOKEN")
        if(!token) return res.status(401).send("You are not authenticated")
        jwt.verify(token,process.env.JWT_KEY,async(err,payload)=>{
        if(err){
            return res.status(401).send("Token is not valid or else token is expired. Login Again.")
        }
        req.userId = payload.userId
        next();
    })
    
}