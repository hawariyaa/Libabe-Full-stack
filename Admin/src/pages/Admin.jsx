import React from 'react'
import '../css/admin.css'
import Sidebar from '../components/Sidebar'
import {Routes, Route} from 'react-router-dom'
import Addproduct from '../components/Addproduct'
import Listproduct from '../components/Listproduct'

const Admin = () => {
  return (
    <div className="admin">
        <Sidebar />
        <Routes>
          <Route path='/addproduct' element={<Addproduct />}></Route>
          <Route path='/listproduct' element={<Listproduct />}></Route>
        </Routes> 
    </div>
      
  )
}

export default Admin