require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// creating a mongodb atlas database
// Database connection with mongodb, our database is connected to the express server
const connection = async () =>{
await mongoose.connect('mongodb+srv://hawipaul:hawipaul@cluster0.tjbn4v8.mongodb.net/e-commerce1')
.then(()=> console.log("connected successful"))
.catch(err => console.error("error is:", err));
// updated the password part to my database password, mongodb+srv://hawipaul:<db_password>@cluster0.t49bxrz.mongodb.net/
// also added a path where we will store data of our application(the database name in the mongo db atlas)
}
connection();

// API Endpoint Creation
app.get('/', (req,res)=>{
    res.send('Express app is Running');
})

app.listen(port,(error)=>{
    if(!error){
        console.log('Server Running on port '+port);
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

//schema creating for user model
const Users = mongoose.model('users', {
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
      type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
//creating endpoint for registering the user
app.post('/signup', async (req, res)=>{
    try{
    const {name, email, password} = req.body
    if(!name || !email || !password){
       return res.status(400).json({
         success:false,
         message:"All fields are required",
       })
    }
    const existingUser = await Users.findOne({email})
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"user already exists",
        })
    }
    //since its a newuser signup we are creating an empty cart
    let cart = {};
    for(let i = 0;i<300;i++){
        cart[i]=0;
    }
    //Usually people use 10–12 salt rounds. 15 is okay but could be unnecessarily slow, especially if your API is under heavy traffic.
    //you might want to use HTTP status codes (400 for validation errors, 409 for duplicate user, 500 for server error, etc
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = new Users({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        cartData:cart,
    })
    await users.save()
    const data = {
        user:{
            id:users.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true, token})
    }
    catch (error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"internal server error",
        })
    }
})
const loginLimiter = rateLimit({
        windowMs: 1000 * 60 * 60,
        max: 5,
        message: "Too may lgoin attempt"
    })
app.post('/login', async (req, res) => {
    try{
    const {email, password} = req.body;
    if(!email || !password){
       return res.json({
            success:false,
            message:"Email and password are required!",
        })
    }
    
    const findUser = await Users.findOne({email});
    if(!findUser){
       return  res.json({
            success:false,
            message:"user doesn't exist!"
        })
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if(findUser){
       if(isMatch){
        const data = {
            user: {
                id:findUser.id
            }
        }
        const token = jwt.sign(data, 'secret_ecom');
        return res.json({success:true, token})
        
       }
       else{
      return   res.json({
            success:false,
            message:"invalid email or password",
        })
       }
    }
}
catch(error){
    console.error("Login error:" , error);
    return res.status(500).json({
        success:false,
        message:"server error"
    })
}
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

//creating API for getting all products, this will return all the objects(json) file inside an array.
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})


