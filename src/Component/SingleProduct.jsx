import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"

const SingleProduct = () => {
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
        <div>
            <h1 className='text-center text-primary'>Displaying  Single Product for id {id}</h1>

            <div className='container d-flex align-items-center justify-content-between gap-2 '>
                {Object.keys(product).length > 0 ? (
                    <div className='card my-3 col-11 mx-auto col-md-6 col-lg-5 '>
                        <div style={{ width: "100%", height: "250px" }}>
                            <img src={product.image} alt={product.productName} className='img-fluid w-100 h-100' />
                        </div>
                        <div className='card-body'>
                            <h3 className='text-primary'>{product.productName}</h3>
                            <p className='text-secondary'><b>${product.price}.00</b></p>
                            <p className='text-secondary'>{product.description}</p>
                        </div>
                    </div>
                ) : (
                    <h2 className='text-center text-primary w-100'>Loading....</h2>
                )}
            </div>
        </div>
    )
}

export default SingleProduct