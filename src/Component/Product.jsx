import React, {useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom'

const Product = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);

    const handleAddToCart = (id) => {
        console.log("Received Id : ", id)
        navigate(`cart/${id}`)
    };

    const handleClick = (id) => {
        console.log("Received Id : ", id)
        navigate(`/products/${id}`)
    }

    useEffect(() => {
        fetch('http://localhost:1234/AllProduct')
            .then(res=>res.json())
            .then((data) => {
                console.log("FakeStore API Data : ", data )
                setProducts(data)
            })
    },[])
  return (
    <div>
        <h1 className='text-center text-primary my-3'>Product Page</h1>

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
                            <p style={{maxHeight: 80, overflow: 'hidden', textOverflow: 'ellipsis'}} className='text-secondary'>{product.description}</p>
                        </div>
                        <div className='d-flex justify-content-between p-3'>
                            <button onClick={() => handleAddToCart(product.id)} className='btn btn-primary'>Add To Cart</button>
                            <button onClick={() => handleClick(product.id)} className='btn btn-secondary'>View Details</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Product