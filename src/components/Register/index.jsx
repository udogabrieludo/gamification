
import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import VerifyOtp from "../VerifyOtp";
import styles from "./style.module.css";
import mailicon from "../../assets/svg/mailicon.svg";
import phoneicon from "../../assets/svg/phoneicon.svg";
import passwordicon from "../../assets/svg/passwordicon.svg";
import nameicon from "../../assets/svg/nameicon.svg";
import success from "../../assets/svg/success.svg";
import { message } from 'antd';
import Spinner from "../../components/Spinner"

const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
};

const headers = {
  "Content-Type": "application/json",
  "client-id": "local_0bd7bb6cbe99ef6e37f5",
};

const validate = (values) => {
  // values.name values.email, values.password
  // errors errors.name errors.email errors.password
  let errors = {};
  if (!values.name) {
    errors.name = "Required!";
  }
  if (!values.email) {
    errors.email = "Required!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }
  if (!values.password) {
    errors.password = "Required!";
  }else if(values.password.lenght < 6){
    errors.password = "Password must be longer than 5 characters"
  } else {
    return
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Required!";
  }
  // else if(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.phoneNumber)) {
  //   errors.phoneNumber = "Invalid phone format"
  // }
  return errors;
};
export const Error = ({ children }) => {
  return (
    <div style={{ color: "red", fontSize: "12px", marginRight: "315px" }}>
      {children}
    </div>
  );
};

const Register = (props) => {
  const { firsttimer, setSetup } = props;
  const history = useHistory()
  const [onboard, setOnboard] = useState(1);
  const [loading, setLoading] = useState(false)
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    phoneNumber: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email format").required("Required!"),
    password: Yup.string().min(4, 'too short').max(12, 'too long').required("Required!")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // ),
  });

  const handleRegister = async (values) => {
    try {
      setLoading(true)
    const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/register`, {
            name: values.name,
            email: values.email,
            password: values.password,
            phone: values.phoneNumber,
          })
          
          if(response.data.status === 1){
            message.error(  `${response?.data?.desc || 'connection error'}  ` )
          }
          if(response.data.statusCode === 400){
            message.error(  `${response?.data?.message} || 'connection error' ` )
          }
          if (response.data.status === 0 && response.data.desc === 'OK'){
            message.success(  { content: `${response?.data?.desc}, succefully registered`, duration: 5} )
            setOnboard(2)
          }
          setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error(`${error?.response?.data?.error} connection error`);
    }
  }
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleRegister(values)
      
    },
    validationSchema,
  });
  
  return (
    <div>
      {onboard === 1 && (
        <div style={{ textAlign: "center" }}>
        {firsttimer ? <h3 style={{color: 'blue', fontWeight: 'bold', padding: '10px 20px'}}> </h3> : 
          
          <h2><strong>Sign Up</strong></h2>
        }
          <form onSubmit={formik.handleSubmit}>
            <div style={{ margin: "0 auto", width: "80%" }}>
              {formik.touched.name && formik.errors.name ? (
                <Error>{formik.errors.name}</Error>
              ) : null}

              
              <div className={`input-group ${styles.input_group}`}>
                
                <input
                  type="text"
                  className={`form-control ${styles.input_style}`}
                  placeholder="Name"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>

             

             
              <div className={`input-group ${styles.input_group}`}>
                
                <input
                  type="email"
                  className={`form-control ${styles.input_style}`}
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <Error>{formik.errors.phoneNumber}</Error>
              ) : null}
                
                
              <div className={`input-group ${styles.input_group}`}>
                {/* <i className={` fas fa-mobile-alt ${styles.inputicon}`}></i> */}
               
                <input
                  type="text"
                  className={`form-control ${styles.input_style}`}
                  placeholder="Phone Number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              
             
             
              
              
              <div className={`input-group ${styles.input_group}`}>
                {/* <i className={` fas fa-unlock ${styles.inputicon}`}></i> */}
                <input
                  type="password"
                  className={`form-control ${styles.input_style}`}
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                
                <Error>{formik.errors.password}  </Error>
              ) : null}
              
              {
                formik.touched.password && formik.errors.password ? (
                  <div style={{ marginLeft: '-194px'}}>Minimum of 5 characters</div> 
                ) : null
              }
             
              

              <button type="submit" className={styles.myBtn}>
              {loading && <Spinner />}
                Sign Up
              </button>
                <p style={{fontSize: '15px'}}>Already a member ? <span type="button" onClick={setSetup}  style={{color: 'blue'}}>Login</span> </p>
            </div>
          </form>
        </div>
      )}
      {onboard === 2 && (
        <VerifyOtp
          name={formik.values.name}
          email={formik.values.email}
          password={formik.values.password}
          phoneNumber={formik.values.phoneNumber}
          setter={setOnboard}
        />
      )}

      {onboard === 3 && (
        <div style={{ textAlign: "center" }}>
        <img style={{marginTop: '50px'}} src={success} alt="success" />
          <h4 style={{color: '#123873', marginTop: '40px'}}>Succesfully verified!</h4>
        </div>
      )}
    </div>
  );
};

export default Register;
