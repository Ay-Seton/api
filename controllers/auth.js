import User from "../models/User.js"                                   //user model
import bcrypt from "bcryptjs"                                          //bcryptjs for password encryption
import { createError } from "../utils/error.js";                       //error utility function
import jwt from "jsonwebtoken"                                         //for signing access token

export const register = async (req, res, next)=> {
    try {
       const salt = bcrypt.genSaltSync(10);                                 // encryption salt
       const hash = bcrypt.hashSync(req.body.password, salt);               //hash password received from the request body with the Salt


        const newUser = new User({                                          //create a user object from the request body
            username: req.body.username, 
            email: req.body.email, 
            password: hash,
        })

        await newUser.save();                                              //save the new user to the db
        res.status(200).send("User has been created")                      //return success code
    } catch (err){
       next(err)
    }
}

export const login = async (req, res, next)=> {
    try {
       const user = await User.findOne({username: req.body.username});  // find user by the username supplied
       if(!user) return next(createError(404, "User not found"));        //send error to error Utility function if no user found

       const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)      //if user found, proceed to compare password
       if(!isPasswordCorrect) return next (createError(400, "Wrong password or username!"))  // if password is incorrect, send error to Error Utility funciton

       const token = jwt.sign({id:user._id, isAdmin:user.isAdmin }, process.env.jwt);     // if password & username are correct, sign/encrypt the userdetail with JWT as a Token

       const {password, isAdmin, ...otherDetails } = user._doc;  // destructure the user object returned from the db. 

       res.cookie("access_token", token, {  // CREATE A COOKIE WITH THE token created
          // expire: Date.now(),       // cookie expires in 40 seconds
           httpOnly: true,                        // security
       })
       .status(200)                           //success status
       .json(otherDetails);                 //destructured user object
    } catch (err){                      //catch error
       next(err)     // pass error if any to the next operation
    }
}

export const logout = async (req, res, next)=> {
    res.clearCookie('access_token');
    res.send('user logout successfully');
}