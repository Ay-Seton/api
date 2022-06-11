import jwt from "jsonwebtoken";  //import jsonwebtoken
import { createError } from "./error.js";  //import the error handler utility file

export const verifyToken = function (req, res, next) {
    const token = req.cookies.access_token;  //access the stored cookie in the request
    if (!token) {return next(createError(401, "You are not authenticated!"));  // if no token, return next with Create error fnction
    }
    jwt.verify(token, process.env.JWT, (err, user) => {     // if token exists, verify the token
        if (err) return next(createError(401, "You are not authenticated! Token Invalid"));  ///if verify error, return next 
        req.user = user;       //if verify success, assign req.user the value of user object
        next() 
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => { if (req.user.id === req.params.id || req.user.isAdmin) { next();} else { return next(createError(401, "You are not authorized"))}})
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => { if (req.user.isAdmin) { next(); } else { return next(createError(401, "You are not an Admin"))} })
}