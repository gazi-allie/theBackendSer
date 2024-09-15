import { asyncHandler } from "../utils/asyncHandler.js";

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

});

export { registerUser };
