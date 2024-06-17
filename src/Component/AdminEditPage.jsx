import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const AdminEditPage = () => {
    const [image, setimage] = useState("")
    const [title, settitle] = useState("")
    const [price, setprice] = useState()
    const [category, setcategory] = useState("")
    const [description, setdescription] = useState("")
    const [data, setData] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const editProduct = async (id) => {
            try {
                if(id) {
                    const response = await fetch(`http://localhost:1234/AllProduct/${id}`);
                    const data = await response.json();
                    console.log("Edit Product: ", data);
                    setData(data);
                }  
            } catch (error) {
                console.error("Error fetching product:", error)
            }
        };

        editProduct()
    }, [id]);

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
          console.log("Data : ", data);
          settitle(data.title);
          setprice(data.price);
          setcategory(data.category);
          setdescription(data.description);
          setimage(data.image);
        }
      }, [data]);


    const selectImage = (ev) => {
        const file = ev.target.files[0]

        const reader = new FileReader()

        reader.onloadend = () => {
            console.log("Image in Base64 : ", reader.result)
            if(!reader.result.includes("image/jpeg" || "image/png" || "image/jpg" || "image/gif" || "image/svg")){
                alert("Please Select an Image File")
            } else{
                setimage(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }

    const submitForm = async (ev) => {
        ev.preventDefault()
        const productData = {
            image,
            title,
            price,
            category,
            description
        };
        console.log("Product Data: ", productData);

        try {
            const response = await fetch(`http://localhost:1234/AllProduct/${id}`, {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(productData)
            });
            if(response.ok) {
                console.log("Product Successfully Edited");
                alert("Product Successfully Edited");
                setimage("");
                settitle("");
                setprice("");
                setcategory("");
                setdescription("");
                navigate("/allProducts");
            }else {
                console.error("Failed to Edit Product")
            }
        } catch (error) {
            console.log("Error Editing Product : ", error)
        }
    };

  return (
    <div className='mt-5'>
        <h1 className='text-center text-primary'>Edit Product {id}</h1>
        <form onSubmit={submitForm} className='mx-auto col-11 col-md-6 col-lg-5 shadow rounded-4 p-3'>
            <input required value={title} onChange={(ev) => settitle(ev.target.value)} type="text" placeholder='Product Title' className='form-control my-2' />
            <input required value={price} onChange={(ev) => setprice(ev.target.value)} type="number" placeholder='Product Price' className='form-control my-2' />
            <input required value={category} onChange={(ev) => setcategory(ev.target.value)} type="text" placeholder='Product Category' className='form-control my-2' />
            <input required value={description} onChange={(ev) => setdescription(ev.target.value)} type="text" placeholder='Product Description' className='form-control my-2' />
            <input required onChange={selectImage} type="file" name="productImage" id="productImage" className='my-2 form-control' />
            {image ? (
                        <div>
                            <p>Preview : </p>
                            <div style={{width: "50%", height : "250px", margin: "auto"}}>
                                <img src={image} alt="Product" className='img-fluid w-100 h-100' />
                            </div>
                        </div>
                    ) : null}
            <button  type='submit' className='btn btn-primary w-100 my-2' >Update Product</button>
        </form>
    </div>
  )
}

export default AdminEditPage