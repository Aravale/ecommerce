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