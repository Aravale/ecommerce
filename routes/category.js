const express = require('express');
const router = express.Router();

const {requireSignin,isAuth,isAdmin} = require("../controllers/auth");
const {create, read, list, update, remove, categoryById} = require("../controllers/category");
const {userById} = require("../controllers/user");

router.get("/categories", list);
router.get("/category/:categoryId", read);
router.post("/category/create/:userId",requireSignin,isAuth,isAdmin, create);
router.delete("/category/:categoryId/:userId",requireSignin,isAuth,isAdmin, remove);
router.put("/category/:categoryId/:userId",requireSignin,isAuth,isAdmin, update);
/* router.get("/hello", requireSignin, (req,res)=>{
    res.send("hello there")
}); */

router.param("userId", userById);
router.param("categoryId", categoryById);


module.exports = router;