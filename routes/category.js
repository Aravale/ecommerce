const express = require('express');
const router = express.Router();

const {requireSignin,isAuth,isAdmin} = require("../controllers/auth");
const {create} = require("../controllers/category");
const {userById} = require("../controllers/user");

router.post("/category/create/:userId",requireSignin,isAuth,isAdmin, create);

/* router.get("/hello", requireSignin, (req,res)=>{
    res.send("hello there")
}); */

router.param("userId", userById);


module.exports = router;