import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import{uploadOnCloudinary} from "../utils/uploadOnCloudinary.js"

import{ApiError} from "../utils/ApiError.js"
const registerUser = asyncHandler(async (req, res) => {
 //get the user details from frontend ]
//  validation on ever detaila email, name etc (not empty)
//  check if user already exist  check username and email 
//  check files cover images  check for **avtar
// upload files to cloudinary , check avatar  
// create user object -create entry in db
// remove password and refresh token field from responnse  
// check for user creation 
// return res 
// 

const {fullname,email, username,password}=req.body
console.log("email:", email,"password:", password);
// if(fullname==="") {
//     throw new ApiError(400,"fullname is required")
// }

if(
    [fullname,email,username,password].some((field)=> field?.trim()==="")
    // Handle the case where one or more fields are empty or contain only whitespace
){
    throw new ApiError(400,"all fields must be filled ")

}

User.findOne({
    $or:[
        {email},
        {username},
    ]
})
if(existedUser){
    throw new ApiError(409,"email or username already exist")
}

const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath= req.files.coverImage[0]?.path;
if(!avatarLocalPath){
    throw new ApiError(400,"avatar is required")
}
   
const avatar=await uploadOnCloudinary(avatarLocalPath)
const coverImage=await uploadOnCloudinary(coverImageLocalPath)
if(!avatar){
    throw new ApiError(400,"avatar is required")
}
const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase(),
}) 
 const CreatedUser = await User.findById(user._id).select(
    "-password  -refreshToken"
 )

});

export { registerUser };
