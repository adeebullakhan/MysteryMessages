// 1

import mongoose ,{ Schema, Document} from "mongoose";


//for message SCHEMA
export interface Message extends Document {
content: string;
createdAt: Date;
}

//schema
const MessageSchema: Schema <Message> = new Schema({
content: 
    {
        type: String, 
    required: true
},
createdAt:
    {
        type: Date,
        required: true,
    default: Date.now
}
});


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];

    }

    const UserSchema: Schema <User> = new Schema({
        username: 
            {
                type: String, 
            required: [true, "Username is required"], // if not true the it show meg
            trim: true, // for remove space
            unique: true // for unique username
        
        },
        email:
            {
                type: String,
                required: [true, "Email is required"],
                unique: true,
                match: [/.+\@\..+/, "Please enter a valid email address"]
        },
        password:
            {
                type: String,
                required: [true, "Password is required"],
        },
        verifyCode:
            {
                type: String,
                required: [true, "Verify code is required"],
        },
        verifyCodeExpiry:
            {
                type: Date,
                required: [true, "Verify code is required"],
        },
        isVerified:
            {
                type: Boolean,
                default: false, // by default false
        },
        isAcceptingMessage:
            {
                type: Boolean,
                default: true,
        },
        messages: [MessageSchema]
        });



const userModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));
export default userModel;