import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./style.module.css";
import mailicon from "../../assets/svg/mailicon.svg";
import phoneicon from "../../assets/svg/phoneicon.svg";
import passwordicon from "../../assets/svg/passwordicon.svg";
import { Error } from "../Register";
import success from "../../assets/svg/success.svg";
import { message } from "antd";
import Spinner from "../../components/Spinner";
import EventMitter from "../../utils/emitter.js";

const headers = {
  "Content-Type": "application/json",
  "client-id": "local_0bd7bb6cbe99ef6e37f5",
};
const initialValues = {
  email: "",
  phoneNumber: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required!"),
  password: Yup.string()
    .min(4, "too short")
    .max(12, "too long")
    .required("Required!"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // ),
});
const Login = (props) => {
  const { handleShowForgotPassword, setSetup } = props;
  const [onlogin, setOnLogin] = useState(1);
  const [forgotpasswprd, setForgotPassword] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_URL}/auth/login`,
        {
          email: values.email,
          password: values.password,
        },
        headers
      );
      // console.log('the >>>', response)
      if (response?.data?.status === 1) {
        message.error(response.data.desc);
      }
      else{
        if (response?.data?.status === 0) {
          message.success({
            content: `${response.data.desc}, login successful`,
            duration: 3,
          });
          localStorage.setItem("user", JSON.stringify(response.data.obj));
          // history.push('/dashboard')
          window.location = "/dashboard";
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
     
      message.error(error?.response?.data?.error || "connection error");
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleLogin(values);
    },
    validationSchema,
  });

  return (
    <>
      {onlogin === 1 && (
        <div style={{ textAlign: "center" }}>
          {/* <p className={styles.myP}>
            Welcome back! <br /> Time to cheer and support your favorite!
          </p> */}
          <h2>Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <div style={{ margin: "0 auto", width: "80%" }}>
              {formik.touched.email && formik.errors.email ? (
                <Error>{formik.errors.email}</Error>
              ) : null}

              <div className={`input-group ${styles.input_group}`}>
                {/* <i className={` far fa-user ${styles.inputicon}`}></i> */}
                <input
                  type="text"
                  className={`form-control ${styles.input_style}`}
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>

              {formik.touched.password && formik.errors.password && (
                <Error>{formik.errors.password}</Error>
              )}
              <div className={`input-group ${styles.input_group}`}>
                {/* <i className={` fas fa-unlock ${styles.inputicon}`}></i> */}
                <input
                  className={`form-control ${styles.input_style}`}
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Password"
                />
              </div>

              <p 
                className={styles.forgotPassword}
                style={{ cursor: "pointer", }}
                onClick={handleShowForgotPassword}
              >
                forgot password?
              </p>
              <button type="submit" className={styles.myBtn}>
                {loading && <Spinner />}
                <span>login</span>
              </button>
              <p
                // className={}
                style={{ cursor: "pointer", fontSize: '15px'}}
                
              >
                Not yet Registered ? <span onClick={setSetup} type="button" style={{color:'#0775e3'}}>Register</span>
              </p>
            </div>
          </form>
        </div>
      )}

      {onlogin === 2 && (
        <>
          <div style={{ textAlign: "center" }}>
            <img style={{ marginTop: "50px" }} src={success} alt="success" />
            <h4 style={{ color: "#123873", marginTop: "40px" }}>
              Login Succesfull!
            </h4>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
