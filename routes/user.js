const express = require('express');
const router = express.Router();

const {userById, read, update} = require("../controllers/user");
const {requireSignin,isAuth,isAdmin} = require("../controllers/auth");

router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req,res)=>{
    console.log(req.params)
    res.json({user: req.profile})
});
router.param("userId", userById);

module.exports = router;