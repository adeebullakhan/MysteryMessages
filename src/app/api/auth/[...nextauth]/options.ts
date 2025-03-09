// referd from documentation of next-au
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials: {
                email: {label:"Email", type:"text"},
                password: {label:"Password", type:"password"}
            },
            async authorize(credentials:any): Promise<any>{
              await dbConnect();
              try{
                 const user = await userModel.findOne({
                    $or: [
                        {email: credentials.email},
                        {username: credentials.email}
                    ]
                  })
                    if(!user){
                        throw new Error("No user found");
                    }
                    if(!user.isVerified){
                   throw new Error("verify your account before login");

                    }
                   const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                   if(isPasswordCorrect){
                    return user
                   }else{
                    throw new Error("Password is incorrect")
                   }

              }
              catch(err:any)
                {
                    throw new Error(err);
                }
            }
        })
    ],
    
    pages: {
        signIn : '/sign-in',
},
session: {
    strategy: "jwt",
},
secret: process.env.NEXTAUTH_SECRET,
}

