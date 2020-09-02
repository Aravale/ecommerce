const express = require('express');
const router = express.Router();

const {requireSignin,isAuth,isAdmin} = require("../controllers/auth");
const {create, read, remove, update, list, listRelated, productById, listCategories, listBySearch, photo} = require("../controllers/product");
const {userById} = require("../controllers/user");

router.get("/product/:productId", read);
router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get('/products/categories', listCategories);
router.get("/product/photo/:productId", photo);
router.post("/products/by/search", listBySearch);
router.post("/product/create/:userId",requireSignin,isAuth,isAdmin, create);
router.delete("/product/:productId/:userId",requireSignin,isAuth,isAdmin, remove);
router.put("/product/:productId/:userId",requireSignin,isAuth,isAdmin, update);
/* router.get("/hello", requireSignin, (req,res)=>{
    res.send("hello there")
}); */

router.param("userId", userById);
router.param("productId", productById);


module.exports = router;