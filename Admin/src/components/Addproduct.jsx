import React from 'react'
import {useState} from 'react'
import upload_area from '../assets/Admin_Assets/upload_area.svg'
import '../css/addproduct.css'
function Addproduct() {

  const [image, setImage] = useState(false);
  //What productDetails is It’s a state object that holds all the form data for your product.
  // It starts empty ("" values).As the user types/selects things in the form, productDetails gets updated.
  const [productDetails, setProductDetails] = useState({
    name:"",
    image:"",
    category:"",
    new_price:"",
    old_price:""
  })

  const ImageHandler = (e) =>{
    setImage(e.target.files[0]);
  }
  //bescally what its doing is is its setting the value that has been inputed to the productDetails right
  //...productDetails → copies the existing state object.[e.target.name] → dynamically updates the field (e.g. name, old_price, category).
  //e.target.value → the new value from the input/select.
  const changeHandler = (e) =>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
  const Add_Product = async () =>{
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formdata = new FormData();
    formdata.append('product', image);
     
    await fetch('http://localhost:4000/upload', {
      method: 'POST', 
      headers:{
        Accept:'application/json',
      },
      body:formdata
    }).then((resp) => resp.json()).then((data)=>{responseData=data});

    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp) => resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed")
      })
    }

  }
  return (
    
      <div className="add-product">
        <div className="addproduct-itemfield">
          <p>Product Title</p>
          <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Title here' />
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input type="text" value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder='old price' />
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input type="text" value={productDetails.new_price} onChange={changeHandler} name='new_price' placeholder='new price' />
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select name="category" value={productDetails.category} onChange={changeHandler} className="add-product-selector">
            <option value="women">women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <p>Upload Image of Product</p>
          <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-tumbnail' alt="" />
          </label>
          <input onChange={ImageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>{Add_Product()}} className='product-btn'>ADD</button>
      </div>
    
  )
}

export default Addproduct