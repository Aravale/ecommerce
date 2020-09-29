const Category = require('../models/category')
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    const category = new Category(req.body);

    category.save((error, categoryData) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        else {
            res.json({ categoryData });
        }
    });
}

exports.read = (req,res) => {
    return res.json(req.category);
}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((error,category) => {
        if(error||!category){
            return res.status(400).json({error:"Category not found!"});
        }
        req.category = category;
        next();
    });
}

exports.remove = (req,res) => {
    const category = req.category;

    category.remove((error,deletedProduct) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        else {
            res.json({  message:"Category deleted!" });
        }
    })
}

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name

    category.save((error, categoryData) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        else {
            res.json({ categoryData });
        }
    });
}

exports.list = (req, res) => {
    Category.find().exec((error,data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        else {
            res.json(data);
        }
    });
}