import React from 'react'
import {useState} from 'react'
import upload_area from '../assets/Admin_Assets/upload_area.svg'
import '../css/addproduct.css'
function Addproduct() {

  const [image, setImage] = useState(false);
  const ImageHandler = (e) =>{
    setImage(e.target.files[0]);
  }
  return (
    
      <div className="add-product">
        <div className="addproduct-itemfield">
          <p>Product Title</p>
          <input type="text" name='name' placeholder='Title here' />
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input type="text" name='old_price' placeholder='old price' />
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input type="text" name='new_price' placeholder='new price' />
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select name="category" className="add-product-selector">
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
        <button className='product-btn'>ADD</button>
      </div>
    
  )
}

export default Addproduct