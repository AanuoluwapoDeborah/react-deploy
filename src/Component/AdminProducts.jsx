import React, {useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom'
import AdminNav from './AdminNav'
import { useDispatch, useSelector } from 'react-redux'
import { fetchingProducts, fetchingProductSuccessful, fetchingFailed } from '../Redux/ProductSlice'

const AdminProducts = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    
        useEffect(() => {
            try {
                dispatch(fetchingProducts());
                fetch('http://localhost:1234/AllProduct')
                .then(res=>res.json())
                .then((data) => {
                    console.log("FakeStore API Data: ", data )
                    setProducts(data);
                    dispatch(fetchingProductSuccessful(data));
                })
                .catch(error => {
                    console.log(error);
                })
            } catch (error) {
                console.log(error.message);
                dispatch(fetchingFailed(error.message));
            }
        },[])

        const allProducts = useSelector((state) => state.ProductSlice.FetchedData);
        console.log("All products from redux: ", allProducts)

    const handleClick = (id) => {
        console.log("Received Id : ", id)
        navigate(`/products/${id}`)
    }

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if(isConfirmed) {
            fetch(`http://localhost:1234/AllProduct/${id}`, {
                method : "DELETE",
            })
        .then(res => {
                if(res.ok) {
                    setProducts(products.filter(product => product.id !== id))
                    alert(`Product ${id} Deleted Successfully`)
                    console.log(`Product ${id} Deleted Successfully`)
                }else{
                    console.error(`Failed to delete product ${id}.`);
                }
            }).catch(error => {
                console.error("Error deleting product:", error);
            });
        }
    }

    const handleEdit = (id) => {
        console.log("Received Id : ", id)
        navigate(`/editProduct/${id}`)
    }
  return (
      <div>
        <AdminNav/>
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
                            <button onClick={() => handleEdit(product.id)} className="btn btn-primary">Edit Products</button>
                            <button onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete Product</button>
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

export default AdminProducts