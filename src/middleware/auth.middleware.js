import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { jwt } from "jsonwebtoken";
import { User } from "../models/user.model";


export const vefifyJwt = asyncHandler (async(req, res, next)=>{


    // check if token exists in req.headers.authorization
    // if not, return 401 unauthorized
    // if token is valid, continue to next middleware
   try {
    const token = req.cookies?.accessToken || 
    
    req.header('Authorization')?.replace("Bearer","")
    
    if(!token){
        throw new ApiError(401,"Not authenticated, token required")
    }
    const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     
 
   const user= await User.findById(decodedtoken?._id).select
    ( "-password  -refreshToken")
 
    if(!user){
 
     // to vii
     throw new ApiError(401,"Not authenticated, token invalid or expired")
    }
    req.user = user ;
    next();
   } catch (error) {
    throw new ApiError(401, error?.message|| "Invalid  accesss Token")
    
   }

})