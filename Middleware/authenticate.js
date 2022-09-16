import userModel from "../Models/todomodel.js";
import jwt from "jsonwebtoken";
const authUser=async(req,res,next)=>{
    let token
    console.log(req.cookies);
    // const{authorization}=req.headers;
    const{authorization}=req.cookies;
    console.log(authorization);
    if(authorization && authorization.startsWith('Bearer')){
        try {
            token=authorization.split(" ")[1]
            console.log(token);
           // Verify token
           const{userID}=jwt.verify(token,process.env.JWT_secret_key)
           //Get user from token
           req.user=await userModel.findById(userID).select("-password")
           next()
        } catch (error) {
            console.log(error);
            res.status(401).send({"status":"Unautorize User"})
        }
    }
    if(!token){
        res.send({"status":"No token"})
    }
}
export default authUser