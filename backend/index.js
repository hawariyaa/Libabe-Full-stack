const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// creating a mongodb atlas database
// Database connection with mongodb, our database is connected to the express server
mongoose.connect('mongodb+srv://hawip:hawip@cluster0.t49bxrz.mongodb.net/e-commerce')
.then(()=> console.log("connected successful"))
.catch(err => console.error("error is:", err));
// updated the password part to my database password, mongodb+srv://hawipaul:<db_password>@cluster0.t49bxrz.mongodb.net/
// also added a path where we will store data of our application(the database name in the mongo db atlas)


// API Endpoint Creation
app.get('/', (req,res)=>{
    res.send('Express app is Running');
})

app.listen(port,(error)=>{
    if(!error){
        console.log('Server Running on port'+port);
    }
    else{
        console.log('Error: '+error);
    }
})

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
           return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage});

app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


// schema for creating product
const Product = mongoose.model("product", {
    id:{
        type: Number,
        required: true, 
    },
    name: {
        type:String,
        required: true, // if we tried to upload a product without a name it won't be uploaded
    },
    category: {
        type:String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    image:{
        type:String,
        required:true,
    },
    available: {
        type: Boolean,
        default: true,
    },
})
app.post('/addproduct', async (req,res) => {
    let products = await Product.findOne().sort({id: -1});
    let id;
    if(products){
        let last_product = products;
        id = last_product.id + 1; 
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//creating API for removing products
app.post('/removeproduct', async(req, res)=> {
    let removed = await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:removed.name
    })
})

//creating API for getting all products
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})


