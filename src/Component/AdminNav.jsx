import React from "react"
import { Link } from "react-router-dom"


const AdminNav = ()=>{
    return(
        <div className='d-flex justify-content-between align-items-center col-11 col-md-6 col-lg 6 w-100' id='navbar'>
            <div className=''><h2>Mercy Stores</h2></div>
            <div>
                <ul className='d-flex align-items-center justify-content-between gap-4'>
                    <li><Link className='text-dark link' to="/allProducts">All Products</Link></li>
                    <li><Link className='text-dark link' to="/postProducts">Post Products</Link></li>
                </ul>
            </div>
            <div className='d-flex gap-3'>
            <button className='btn btn-dark'>Sign Up</button>
            <button className='btn btn-dark'>Log In</button>
            </div>
        </div>
    )
}

export default AdminNav