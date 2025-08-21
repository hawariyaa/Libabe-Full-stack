import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import '../css/navbar.css'
import logo from '../Assets/Frontend_Assets/logo.png'
import cart from '../Assets/Frontend_Assets/cart_icon.png'

function Navbar() {
    const [Menu, setMenu] = useState('shop');
  return (
    <div className="nav-bar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Libabe</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu('shop')}}><Link to="/">Shop</Link> {Menu=== "shop" ? <hr/>: <></>}</li>
        <li onClick={()=>{setMenu('Men')}}><Link to ="/mens">Men</Link>{Menu=== 'Men' ? <hr/>: <></>}</li>
        <li onClick={()=>{setMenu('Women')}}><Link to="/womens">women</Link>{Menu=== 'Women' ? <hr/>:<> </>}</li>
        <li onClick={()=>{setMenu('Kids')}}><Link to="/kids">Kids</Link>{Menu=== 'Kids' ? <hr/>: <></>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/cart"><img src={cart} alt="" /></Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  )
}

export default Navbar