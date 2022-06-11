import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logOut from "./routes/logout.js" // logout route
import authRoute from "./routes/auth.js";   //authentication route
import usersRoute from "./routes/users.js";    //users route
import hotelsRoute from "./routes/hotels.js";   //hotels route
import roomsRoute from "./routes/rooms.js";     //rooms route
import cookieParser from "cookie-parser";       //cooke-parser


const app = express();    //create express app
dotenv.config()           //configuratin for dotenv to user .env file

//connect to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);                //connect to DB.
        console.log("Connected to MongoDB")
      } catch (error) {
        throw error;
      }
};

//middlewares
app.use(cookieParser());
app.use(express.json());    //allows Json request in the req body

app.use("/api/auth", authRoute);             //mount route on endpoint
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/logout", logOut);

app.use((err, req,res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json(
    {
      success: false, 
      status: errorStatus, 
      message: errorMessage, 
      stack: err.stack
    }
  )
})
app.listen (8800, () => {
connect();
console.log("Connected to Backend");
});