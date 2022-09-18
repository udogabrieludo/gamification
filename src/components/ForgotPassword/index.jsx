import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Error } from "../Register";
import ChangePassword from "../ChangePassword"
import forgot from "./forgotpassword.module.css";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(true);
  const [resetform, setResetForm] = useState(false);
  const initialValues = {
    email: "",
  };

  const ShowResetPasswordForm =()=> {
    setEmailSent(false)
    setResetForm(true)
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("Required!"),
  });

  const handleGetOtpForPassword = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_URL}/auth/reset`,
        {
          email: values.email,
        }
      );
    
      if (response?.data.status === 0) {
        message.success({
          content: `${response?.data.desc}, check your email for the otp`,
          duration: 3,
        });
        ShowResetPasswordForm()
        // response?.data.desc, 'check your email for the otp'
      } else if (response?.data.status === 1) {
        message.error(response?.data.desc);
      } else {
        return;
      }
    } catch (error) {
      message.erorr(error?.response?.data);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleGetOtpForPassword(values);
    },
    validationSchema,
  });

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >{
      emailSent && <form onSubmit={formik.handleSubmit}>
        <h4>Request for OTP</h4>
        {formik.touched.email && formik.errors.email ? (
          <Error>{formik.errors.email}</Error>
        ) : null}
        <div className={forgot.inputContainer} style={{ width: "330px" }}>
          <input
            type="email"
            id="eamil"
            placeholder="Email"
            name="email"
            className={forgot.input}
            value={formik.values.eamil}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div style={{ margin: "20px auto" }}>
          <button className={forgot.btn} type="submit">
            Request OTP
          </button>
        </div>
        <button type="submit" className={forgot.reset_otp}>resend otp</button>
      </form>
    }
    {resetform && 
    <div>
    <ChangePassword />
    </div>
    }
      
    </div>
  );
};

export default ForgotPassword;
