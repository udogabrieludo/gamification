import React from 'react'
import axios from "axios";
import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Error } from "../Register";
import changepassword from './changepassword.module.css'
import  { isAuthenticated } from '../../utils/authdata'


const ChangePassword = () => {
    const initialValues = {
        email: "",
        password: "",
        otp: ""
    }
    const validationSchema = Yup.object({
        email: Yup.string().required("Required!"),
        password: Yup.string().min(4, 'too short').max(12, 'too long').required("Required!"),
        otp: Yup.string().min(6, 'must not be less than 6 digit').max(6, 'must not be more than 6 didgits').required("Required!"),
    })

    const resetPassword = async (values)=> {
      try{
          const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/reset-password`,{
              email: values.email,
              password: values.password,
              otp: values.otp,
          })
         
          if(response.data.status === 1){
              message.error({content: response?.data?.desc, duration: 3})
          }
          if(response.data.status === 0){
              message.success({content: response?.data?.obj, duration: 3})
          }
      }catch(err){
          console.log(err)
      }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
          resetPassword(values);
        },
        validationSchema,
      })

    return (
        <div>
        <h3>Change your password</h3>
        <form onSubmit={formik.handleSubmit}>
        {formik.touched.email && formik.errors.email ? (
            <Error>{formik.errors.email}</Error>
          ) : null}
            <div className={changepassword.inputContainer}>
            <div style={{marginLeft: '38px',
    textAlign: 'start'}}>
            <label  htmlFor="email">Email</label>
            </div>
            <input  
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="phone" 
            placeholder="email" 
            id="email"
            className={changepassword.input}
             />
            </div>
            {formik.touched.password && formik.errors.password ? (
            <Error>{formik.errors.password}</Error>
          ) : null}
            <div className={changepassword.inputContainer}>
            <div style={{marginLeft: '38px',
    textAlign: 'start'}}><label htmlFor="password">New Password</label></div>
            <input 
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
                type="password" 
                placeholder="new password" 
                id="password" 
            className={changepassword.input}
                />
            </div>
            {formik.touched.otp && formik.errors.otp ? (
            <Error>{formik.errors.otp}</Error>
          ) : null}
            <div className={changepassword.inputContainer}>
            <div style={{marginLeft: '38px',
    textAlign: 'start'}}><label htmlFor="otp">OTP</label></div>
            <input 
            value={formik.values.otp}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
                type="otp" 
                placeholder="OTP" 
                id="otp" 
            className={changepassword.input}
                />
            </div>
            <button type="submit" className={changepassword.btn}>
            <span>reset password</span>
          </button>
        </form>
        </div>
    )
}

export default ChangePassword
