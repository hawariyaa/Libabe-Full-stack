import React from 'react'
import '../css/listproduct.css'
import { useEffect } from 'react';
import removeicon from '../assets/Admin_Assets/cross_icon.png'

function Listproduct() {
    
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>{setAllProducts(data)});
  }
  useEffect(()=>{
    fetchInfo();
  }, []); //by adding one square bracket the function will only be executed once

  const removeproduct = async(id) =>{
       await fetch('http//:localhost:4000/removeproduct', {
        method:'POST',
        header:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({id:id})
       })
       await fetchInfo();
  }

  return (
  <div className="list-product">
    <h1>All product lists</h1>
    <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Prices</p>
        <p>New Prices</p>
        <p>Category</p>
        <p>Remove</p>
    </div>
    <div className="listproduct-allproducts">
      <hr />
      {allproducts.map((product, index)=>{
        return <><div key={index} className="list-product-main">
          <img src={product.image} alt="" className="listprocut-product-icon" />
          <p>{product.name}</p>
          <p>${product.old_price}</p>
          <p>${product.new_price}</p>
          <p>{product.category}</p>
          <img src={removeicon} onClick={()=>{removeproduct(product.id)}} alt="" className="list-product-removeicon" />
        </div>
        <hr />
        </>
      })}
    </div>
  </div>
  )
}

export default Listproduct