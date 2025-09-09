const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());

// creating a mongodb atlas database
// Database connection with mongodb, our database is connected to the express server
mongoose.connect('mongodb+srv://hawipaul:hawipaul@cluster0.t49bxrz.mongodb.net/e-commerce')
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
const product = mongoose.model("product", {
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
    avialble: {
        type: Boolean,
        default: true,
    },
})
app.post('/addproduct', async (req,res) => {
    const product = new product({
        id:req.body.id,
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



