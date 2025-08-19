import { useState } from 'react'
import './css/App.css'
import Navbar from './components/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import LoginSignup from './pages/LoginSignup'
import Product from './pages/Product'
import ShopCategory from './pages/ShopCategory'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory category="mens"/>} />
        <Route path='/women' element={<ShopCategory category="women"/>} />
        <Route path='/kids' element={<ShopCategory category="kids"/>} />
        <Route path='/product' element={<Product />}>
           <Route path=':productId' element={<Product />}/>
         </Route>
         <Route path='/cart' element={<Cart/>} />
         <Route path='/login' element={<LoginSignup />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
