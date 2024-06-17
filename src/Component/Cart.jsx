import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

const Cart = () => {
  const { id } = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
        const singleProduct = async (id) => {
            try {
                const response = await fetch(`http://localhost:1234/AllProduct/${id}`)
                const data = await response.json()
                console.log("Single Product : ", data)
                setProduct(data)
            } catch (error) {
                console.error("Error fetching product:", error)
            }
        }

        singleProduct(id)
    }, [id])
  return (
    <div className='d-flex justify-content-between'>
        <div id='cart' className='rounded-3 shadow-lg p-3 container d-flex align-items-center justify-content-between gap-2' style={{height: "60vh"}}>
            {Object.keys(product).length > 0 ? (
                <div className='card my-3 col-11 mx-auto col-md-6 col-lg-5 d-flex'>
                    <div style={{ width: "100%", height: "250px" }}>
                        <img src={product.image} alt={product.productName} className='img-fluid w-100 h-100' />
                    </div>
                    <div className='card-body'>
                        <h3 className='text-primary'>{product.productName}</h3>
                        <div className='d-flex align-items-center justify-content-between'>
                          <p className='text-secondary'>{product.category}</p>
                          <p className='text-secondary'><b>${product.price}.00</b></p>
                        </div>
                        <p className='text-secondary'>{product.description}</p>
                        <div className='d-flex align-item-center'>
                          <p className='bg-primary p-1 rounded-2'>-</p>
                          <p className='bg-primary p-1 rounded-2'>+</p>
                        </div>
                        <button className='btn btn-danger'>Remove to Cart</button>
                    </div>
                </div>
            ) : null}
        </div>
        <div id='cartSum' className='shadow p-3 d-grid rounded-3'>
          <p>CART SUMMARY</p>
          <div className='d-flex justify-content-between align-items-center'>
            <p>Subtotal</p>
            <p>0</p>
          </div>
          <button className='btn btn-primary'>CHECKOUT</button>
        </div>
    </div>
  )
}

export default Cart