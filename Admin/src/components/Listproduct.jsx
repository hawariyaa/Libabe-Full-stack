import React from 'react'
import '../css/listproduct.css'

function Listproduct() {
    
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>{setAllProducts(data)});
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
    </div>
  </div>
  )
}

export default Listproduct