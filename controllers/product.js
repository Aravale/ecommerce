const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const { json } = require('body-parser')
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({error:'Image could not be uploaded!'});
        }
        //check for all fields
        const {name, description, price, category, quantity, shipping} = fields;
        if(!name || !description|| !price|| !category|| !quantity|| !shipping){
            return res.status(400).json({error:'All fields are required!'})
        }
        let product = new Product(fields)
        if(files.photo){
            if(files.photo.size > 100000){
                return res.status(400).json({error:'Image should be less than 1mb!'})
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type;
        }
        product.save((err, productData) => {
            if (err) {
                return res.status(400).json({
                    err: errorHandler(err)
                })
            }
            else {
                res.json({ productData });
            }
        });
    })


}