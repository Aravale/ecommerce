const Category = require('../models/category')
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    const category = new Category(req.body);

    category.save((err, categoryData) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
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
    Category.findById(id).exec((err,category) => {
        if(err||!category){
            return res.status(400).json({error:"Category not found!"});
        }
        req.category = category;
        next();
    });
}

exports.remove = (req,res) => {
    const category = req.category;

    category.remove((err,deletedProduct) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
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

    category.save((err, categoryData) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        else {
            res.json({ categoryData });
        }
    });
}

exports.list = (req, res) => {
    Category.find().exec((err,categoryList) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        else {
            res.json({ categoryList });
        }
    });
}