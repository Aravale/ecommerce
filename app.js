//IMPORTS
const express = require('express');
require("dotenv").config();
const mongoose =require('mongoose');
const morgan =require('morgan');
const bodyParser =require('body-parser');
const cookieParser =require('cookie-parser');

//APP CONFIG
const app = express();

//DB CONFIG
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log("DB COnnected"))

//ROUTES
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

//MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//ROUTES MIDDLEWARE
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);

//SERVER
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
