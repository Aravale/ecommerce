const User = require('../models/user')
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const { errorHandler } = require("../helpers/dbErrorHandler");
const { validationResult } = require('express-validator');

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.errors.map(error => { return error.msg })[0] });
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        else {
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json({ user });
        }
    });
}

exports.signin = (req, res) => {
    // find user based on email
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "User with email does not exist!" });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({ error: "Email and password do not match!" });
        }
        //Generate token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        //Persist token as t in cookie with expiry
        res.cookie('t', token, { expire: new Date() + 9999 });
        //Return response with user and token to frontend 
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });

}

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: "Successfully signed out" })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({ error: "Access Denied!" });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({ error: "Admin access only!" });
    }
    next();
}