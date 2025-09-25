import React from 'react'
import '../css/sidebar.css'
import {Link } from 'react-router-dom'
import product_icon from '../assets/Admin_Assets/Product_Cart.svg'
import list_product from '../assets/Admin_Assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={'/addproduct'} style={{textDecoration: "none"}}>
         <div className="sidebar-item">
           <img src={product_icon} alt="product_icon" />
           <p>Add product</p>
         </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration: "none"}}>
         <div className="sidebar-item">
           <img src={list_product} alt="product_icon" />
           <p>List Product</p>
         </div>
      </Link>
    </div>
  )
}

export default Sidebar