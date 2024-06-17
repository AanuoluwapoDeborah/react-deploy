import React, {useState} from 'react'
import AdminNav from './AdminNav'

const Admin = () => {

    const [image, setimage] = useState("")
    const [title, settitle] = useState("")
    const [price, setprice] = useState()
    const [category, setcategory] = useState("")
    const [description, setdescription] = useState("")

    const selectImage = (ev) => {
        const file = ev.target.files[0]

        const reader = new FileReader()

        reader.onloadend = () => {
            console.log("Image in Base64 : ", reader.result)
            if(!reader.result.includes("image/jpeg" || "image.png" || "image/jpg" || "image/gif" || "image/svg")){
                alert("Please Select an Image File")
            } else{
                setimage(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }

    const submitForm = (ev) => {
        ev.preventDefault()
        const productData = {
            image,
            title,
            price,
            category,
            description
        }
        console.log("Product Data: ", productData)

        fetch('http://localhost:1234/AllProduct', {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(productData)
            }).then(res => {
                console.log("Product Posted Successfully");
                alert("Product Posted Successfully")
                setimage("")
                settitle("")
                setprice("")
                setcategory("")
                setdescription("")
            }).catch(error => {
                console.log("Error Posting Product : ", error)
            })
    }

  return (
    <div>
        <AdminNav/>
        <h1 className='text-center text-secondary my-2'>Post Product</h1>
            <div className='row container w-100  d-flex align-items-center mx-auto pt-5'>
                <div className='col-11 col-md-6 col-lg-6 '>
                    <h2>Add More Products</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Enim deleniti assumenda iure eum aliquam iste qui reiciendis dolore,
                        necessitatibus pariatur,
                        mollitia tempore ipsa optio ipsam sapiente. Sint quod molestiae error.</p>
                </div>


                <form onSubmit={submitForm} className='col-11 col-md-6 col-lg-6 shadow rounded-4 p-3'>
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
                    <button  type='submit' className='btn btn-primary w-100 my-2' >Post Product</button>
                </form>
            </div>
    </div>
  )
}

export default Admin