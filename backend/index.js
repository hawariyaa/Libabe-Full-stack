const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// creating a mongodb atlas database
// Database connection with mongodb
mongoose.connect('mongodb+srv://hawipaul:hawipaul@cluster0.t49bxrz.mongodb.net/e-commerce');
// updated the password part to my database password, mongodb+srv://hawipaul:<db_password>@cluster0.t49bxrz.mongodb.net/
// also added a path where we will store data of our application


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

