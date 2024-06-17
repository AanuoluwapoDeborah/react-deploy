import React, {useState} from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {useFormik} from "formik";
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [showPass, setshowPass] = useState(false);
    const [showPass2, setshowPass2] = useState(false);

    const navigate = useNavigate();

    const {handleChange, handleBlur, handleSubmit, touched, errors, values} =
    useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: yup.object({
            firstname: yup.string().required("Firstname is required").min(3, "Fistname should not be less that 3").max(15, "Firstname should not be more than 15"),
            lastname: yup.string().required("Lastname is required").min(3, "Lastname should not be less than 3").max(15, "Lastname should not be more than 15"),
            email: yup.string().email("Must be a valid email").required("Email is required").matches(/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
            , "Invalid email"),
            password: yup
            .string()
            .required("Enter a password")
            .min(8, "Password must be at least 8 characters long")
            .max(16, "Password must not be more than 16 characters long")
            .matches(
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long"
            ),
            confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: (values) => {
            console.log("Form values", values);
            navigate("/log-in");
        }
    });
  return (
    <div className='mt-4'>
        <form onSubmit={handleSubmit} action="" className='mx-auto col-11 col-md-6 col-lg-5 shadow rounded-4 p-4 mt-3'>
            <h2 className='text-center text-info fs-1'>Sign Up</h2>
            <div className='grid gap-2 my-2 mt-3'>
                <label htmlFor="firstname" className='fw-bold'>First Name</label>
                <input onChange={handleChange} onBlur={handleBlur} value={values.firstname} name="firstname" type="text" placeholder='Enter Your First Name' className={`${touched.firstname && errors.firstname ? "is-invalid form-control" : "form-control"}`} />
                {touched.firstname && errors.firstname ? (
                    <small className='text-danger'>{errors.firstname}</small>
                ) : null}
            </div>
            <div className='grid gap-2 my-2'>
                <label htmlFor="lastname" className='fw-bold'>Last Name</label>
                <input onChange={handleChange} onBlur={handleBlur} value={values.lastname} name="lastname" type="text" placeholder='Enter Your Last Name' className={`${touched.lastname && errors.lastname ? "is-invalid form-control" : "form-control"}`} />
                {touched.lastname && errors.lastname?(
                    <small className='text-danger'>{errors.lastname}</small>
                ) : null}
            </div>
            <div className='grid gap-2 my-2'>
                <label htmlFor="email" className='fw-bold'>Email</label>
                <input onChange={handleChange} onBlur={handleBlur} value={values.email} name="email" type="email" placeholder='Enter Your Email' className={`${touched.email && errors.email ? "is-invalid form-control" : "form-control"}`} />
                {touched.email && errors.email ? (
                    <small className='text-danger'>{errors.email}</small>
                ) : null}
            </div>
            <div className='grid gap-2 my-2'>
                <label htmlFor="password" className='fw-bold'>Password</label>
                <div className='passInp'>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.password} name="password" type={showPass ? "text" : "password"} placeholder='Enter Your Password' className={`${touched.password && errors.password ? "is-invalid form-control" : "form-control"}`} />
                    <span onClick={() => setshowPass(!showPass)} className='showAndHide'>{showPass ? <FaEye /> : <FaEyeSlash />}</span>
                    {touched.password && errors.password ? (
                        <small className='text-danger'>{errors.password}</small>
                    ) : null}
                </div>
            </div>
            <div className='grid gap-2 my-2'>
                <label htmlFor="confirmPassword" className='fw-bold'>Confirm Password</label>
                <div className='passInp'>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} name="confirmPassword" type={showPass2 ? "text" : "password"} placeholder='Comfirm Your Password' className={`${touched.confirmPassword && errors.confirmPassword ? "is-invalid form-control" : "form-control"}`} />
                    <span onClick={() => setshowPass2(!showPass2)} className='showAndHide'>{showPass2 ? <FaEye /> : <FaEyeSlash />}</span>
                    {touched.confirmPassword && errors.confirmPassword ? (
                        <small className='text-danger'>{errors.confirmPassword}</small>
                    ) : null}
                </div>
            </div>
            <button className='btn btn-info w-100 mt-4 text-secondary fw-bold' type="submit">Sign Up</button>
        </form>
        <div className='d-flex justify-content-center mt-3 gap-2'>
            <p>Already have an account?</p>
            <Link className='link-info' to="/log-in">Log In</Link>
        </div>
    </div>
  )
}

export default SignUp