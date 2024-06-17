import React, {useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    const handleProductPage = () => {
        alert("You need to log in before you can view product page");
        navigate(`/log-in`);
    }

    const handleClick = () => {
        alert("You need to log in before you can view product details");
        navigate(`/log-in`);
    }

    useEffect(() => {
        fetch('http://localhost:2000/HomeProduct')
            .then(res=>res.json())
            .then((data) => {
                console.log("FakeStore API Data : ", data )
                setProducts(data)
            })
    },[])
  return (
    <div>
      <nav className='d-flex justify-content-between align-items-center' id='navbar'>
        <div className=''><h2>Mercy Stores</h2></div>
        <div className='d-flex align-items-center justify-content-center w-50 gap-4'>
          <ul className='d-flex align-items-center justify-content-between gap-4 mt-3'>
              <li onClick={() => handleProductPage()}><Link className='text-dark link' to="/products">Product</Link></li>
              <li><Link className='text-dark link' to="/about">About</Link></li>
          </ul>
        </div>
        <div className='d-flex gap-3'>
          <button className='btn btn-dark'><Link className='text-light link' to="/sign-up">Sign Up</Link></button>
          <button className='btn btn-dark'><Link className='text-light link' to="/log-in">Log In</Link></button>
        </div>
      </nav>

        <h1 id='container' className='text-center text-primary my-3'>Home Page</h1>

        <div className='container-fluid'>
            <div className='row'>
                {products.map((product) => (
                    <div className='col-12  col-md-4 col-lg-4' key={product.id}>
                        <div className='card shadow border-0 rounded-3 p-3 my-3'>
                            <div style={{ width: "100%", height:"70vh", margin: "auto" }}>
                                <img src={product.image} alt={product.productName} className='img-fluid w-100 h-100 ' style={{objectFit : "cover", backgroundSize : "cover", height: "fit-content"}} />
                            </div>
                            <div className='card-body'>
                                <h3 style={{height: "8vh"}} className='text-primary fs-5 text-dark text-center d-flex align-items-center justify-content-center'>{product.title}</h3>
                                <div className='my-2 d-flex align-items-center justify-content-between mt-4'>
                                    <p className='text-secondary'>${product.price}</p>
                                    <p className='text-secondary'> {product.category}</p>
                                </div>
                                <p style={{maxHeight: 75, overflow: 'hidden'}} className='text-secondary'>{product.description}</p>
                            </div>
                            <div className='d-flex justify-content-between p-3'>
                                <button onClick={() => handleClick()} className='btn btn-secondary'>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Home