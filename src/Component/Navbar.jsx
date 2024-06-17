import React from 'react'
import { FaCartArrowDown } from "react-icons/fa6";
import { IoMdHelpCircle } from "react-icons/io";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='d-flex justify-content-between align-items-center gap-' id='navbar'>
        <div className='text-primary'><h2>Mercy Stores</h2></div>
        <div className='d-flex align-items-center justify-content-end w-75'>
          <div className='border p-2 d-flex align-items-center rounded-2 searchDiv'>
            <input className='border border-0 w-100 mx-2' type="search" placeholder='Search for a product/products category' />
            <button className='btn btn-primary'>Search</button>
          </div>
          <ul class="d-flex align-items-center justify-content-center mt-3">
              <li class="">
                <Link className='link-dark mx-3 link-offset-1-hover link-underline-opacity-0 d-flex align-items-center'>
                  <RiAccountPinCircleFill />
                  <span class="mx-2">Account</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link className='link-dark mx-3 link-offset-1-hover link-underline-opacity-0 d-flex align-items-center'>
                  <IoMdHelpCircle />
                  <span class="mx-2">Help</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="cart" className='link-dark mx-3 link-offset-1-hover link-underline-opacity-0 d-flex align-items-center'>
                  <FaCartArrowDown />
                  <span class="mx-2">Cart</span>
                  <sup id='supNum' className='bg-danger rounded-circle text-light fw-bold'>0</sup>
                </Link>
              </li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar