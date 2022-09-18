import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import styles from "./style.module.css";
import passwordicon from "../../assets/svg/passwordicon.svg";
import { Error } from "../Register";
import Spinner from "../../components/Spinner"
import { message } from 'antd';


const headers = {
  "Content-Type": "application/json",
  "client-id": "local_0bd7bb6cbe99ef6e37f5",
};

const validate = (values) => {
  // values.name values.email, values.password
  // errors errors.name errors.email errors.password
  let errors = {};

  if (!values.otp) {
    errors.otp = "Required!";
  }

  return errors;
};
const VerifyOtp = (props) => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [otpVerify, setOtpVerify] = useState(null)
  const { name, email, password, phoneNumber, setter, optl } = props;
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: (values) => {
      setLoading(true)
      setOtpVerify(null)
      axios.post(
        `${process.env.REACT_APP_AUTH_URL}/auth/email/verify`,
        {
          email: email,
          otp: values.otp,
        }
      ).then(response => {
        setLoading(false)
  
       
        if (response.data.status === 0 && response.data.desc === 'OK'){
          message.success({content: `${response.data.desc}, verification succesful`, duration: 5 })
        localStorage.setItem('user', JSON.stringify(response.data.obj))
        // history.push('/dashboard')
        setter(3)
        window.location = "/dashboard";
        
        }
        if(response.data.status == 1 && response.data.desc !== 'OK'){
          setOtpVerify(response?.data?.desc)
          message.error(response?.data?.desc || 'Token Invalid')
          return
        }
      }).catch(err => {
        setLoading(false)

        message.error(err?.response?.data?.error || 'unable to make request')
        // console.log('error from otp >>>', err)
      })
    },
    validate,
  });

  const resendOtp = async (myEmail) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_URL}/auth/reset`, // auth/regenerate/otp
        {
          email: myEmail
        }
      );
     
      if (response?.data.status === 0) {
        setOtpVerify(null)
        message.success({
          content: `${response?.data.desc}, check your email for the otp`,
          duration: 5,
        });
        // response?.data.desc, 'check your email for the otp'
      }
      if (response?.data.status === 1) {
        setOtpVerify(null)
        message.error(`Six digit OTP has been resent ${response?.data?.desc}`);
      }
    } catch (error) {
      // message.erorr(error?.response?.data || '');
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
    <div style={{fontSize: "20px", color: 'blue', padding: '10px 70px 0 70px'}}>
    Your registration is successful
    <p style={{fontSize: '14px',}}>A six digit code was sent to your email please enter it here</p>
    
    {
      otpVerify && (
        <p className="alert alert-danger">{otpVerify}</p>
      )
    }
    </div>
      <h3 style={{color: '#123873', marginTop: '40px'}}>Verify OTP</h3>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ margin: "0 auto", width: "80%" }}>
          {formik.touched.otp && formik.errors.otp && (
            <Error>{formik.errors.otp}</Error>
          )}
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formik.values.otp}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Six digit OTP"
              className={styles.input}
            />
            <img
              src={passwordicon}
              alt="password icon"
              className={styles.inputImg}
            />
          </div>
            <div>Your email is {email || ' '}</div>
          <button
            className={styles.myBtn}
            type="submit"
          >
          {loading && <Spinner />}
            Verify Otp
          </button>
          
        </div>
      </form>
      <div style={{width: '40%', margin: '20px auto'}}>
      <button className={styles.myRBtn} type="button" onClick={()=>resendOtp(email)}>Resend Otp</button>
      </div>
    </div>
  );
};

export default VerifyOtp;
