import { useState } from 'react'
import './css/App.css'
import Navbar from './components/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import LoginSignup from './pages/LoginSignup'
import Product from './pages/Product'
import ShopCategory from './pages/ShopCategory'
import Footer from './components/Footer'
import mens_banner from './Assets/Frontend_Assets/banner_mens.png'
import womens_banner from './Assets/Frontend_Assets/banner_women.png'
import kids_banner from './Assets/Frontend_Assets/banner_kids.png'

// to select a lot of things at once you can use ctrl+F2
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory banner={mens_banner} category="men"/>} />
        <Route path='/womens' element={<ShopCategory banner={womens_banner} category="women"/>} />
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid"/>} />
        <Route path='/product' element={<Product />}>
           <Route path=':productId' element={<Product />}/>
         </Route>
         <Route path='/cart' element={<Cart/>} />
         <Route path='/login' element={<LoginSignup />}/>
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
