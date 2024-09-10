import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true //to make it easier to search in db

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true //to make it easier to search in db

    },
    avatar:{
        type:String,// cloudinary url used
        required:true,
    },
    coverImage:{
        type:String,// cloudinary url used
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    password:{
        type:String,
        required:true,
        
    },
    refreshToken:{
        type:String,
       
    }
    
 }, {timestamps:true})


export const User = mongoose.model("User",UserSchema);