import React from 'react'
import Navbar from '../Component/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <Navbar/>
        <div className='container' id='container'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout