import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiRespose } from "../utils/ApiResponse.js";

import { ApiError } from "../utils/ApiError.js";
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

  const { fullname, email, username, password } = req.body;
  console.log("email:", email, "password:", password);
  // if(fullname==="") {
  //     throw new ApiError(400,"fullname is required")
  // }

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
    // Handle the case where one or more fields are empty or contain only whitespace
  ) {
    throw new ApiError(400, "all fields must be filled ");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(409, "email or username already exist");
  }
  // console.log(req.files);
  // handle the files

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath= req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "avatar is required");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  // check if user is created successfully
  const CreatedUser = await User.findById(user._id).select(
    "-password  -refreshToken"
  );

  if (!CreatedUser) {
    throw new ApiError(500, "Failed to create user");
  }

  return res
    .status(201)
    .json(new ApiRespose(200, CreatedUser, "User regesterd successfully "));
});

const genrateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ ValidateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiErrorError(500, "Failed to generate tokens ");
  }
};
const LoginUser = asyncHandler(async (req, res) => {
  // / req body -> data
  //  username or email
  // find the use
  // password check
  // reate access and refresh token
  // send to cookies
  // success login

  const { email, username, password } = req.body;
  console.log("email:", email, "password:", password);
  if (!username || !email) {
    throw new ApiError(400, "Please provide email or username");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await user.isPasswordCorrect(password, this.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "password is not correct");
  }

  const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(
    user._id
  );
  const loggedUser = await User.findById(user._id).select("-password -refreshToken")
//   
// cookie section  
// 
    const options = {
        // will be only modified from server
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiRespose(200, {
            user: loggedUser,
            accessToken,
            refreshToken,
        },
         "User logged in successfully"
        )
    )
    
});

const LoggoutUser= asyncHandler (async(req, res)=>{
    // req.user -> userId
    // delete refresh token from db
    // send response
    // cookies will be cleared
})

export { registerUser, LoginUser };
