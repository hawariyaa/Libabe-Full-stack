import React from 'react'
import '../css/navbar.css'
import navlogo from '../assets/Admin_Assets/nav-logo.svg'
import navprofile from '../assets/Admin_Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className="navbar">
        <img src={navlogo} alt="logo" className="nav-logo" />
        <img src={navprofile} alt="profile" className="nav-profile" />
    </div>
  )
}

export default Navbar