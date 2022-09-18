import React, { useState, useEffect } from "react";
import editprofile from "./editprofile.module.css";
import axios from "axios";
import { message } from "antd";
import { updateLocalStorage } from "../../utils/authdata";
import "react-datepicker/dist/react-datepicker.css";
import { UseMessage } from "../../utils/utils";

const styles = {
  alert: (error) => ({
    color: error ? "#842029" : "#0f5132",
    backgroundColor: error ? "#f8d7da" : "#d1e7dd",
    borderColor: "#badbcc",
    position: "relative",
    padding: "0.4rem 0.4rem",
    marginBottom: "1rem",
    border: "1px solid transparent",
    borderRadius: "0.25rem",
  }),
};

const getToken = () => {
  const token = JSON.parse(localStorage?.getItem("user"))?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
const PasswordChange = ({ email, setProfileSettings }) => {
  const [step1, setStep1] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [resMessage, setResMessage] = useState({
    message: "",
    type: "",
  });

  const [updatePassword, setUpdatePassword] = useState({
    password: "",
    email: "",
    otp: "",
    error: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUpdatePassword({ ...updatePassword, error: "", [name]: value });
  };
  const { Response, setResponse } = UseMessage();
  const HandlePaswwordreset = () => {
    if (!updatePassword.otp) {
      setUpdatePassword({
        ...updatePassword,
        error: "Otp field is required",
      });
    } else if (!updatePassword.password) {
      setUpdatePassword({ ...updatePassword, error: "Password field is required" });
    } else {
      setLoading(true);
      const config = getToken();
      axios
        .post(
          `${process.env.REACT_APP_AUTH_URL}/auth/reset-password`,
          { ...updatePassword },
          config
        )
        .then((res) => {
          
          setLoading(false);
          if (res.data.status === 1) {
            setResMessage({ message: res?.data?.desc, type: "error" });
            setTimeout(() => {
              setResMessage({ message: '', type: "error" });
            },4000)
          } else if (res.data.status === 0) {
            setResMessage({ message: 'Password updated success', type: "success" });

            setTimeout(() => {
              setProfileSettings()
            },4000)

          } else {
            // message.success({
            //   content: `${res?.data?.desc}, ${res?.data?.obj}`,
            //   duration: 3,
            // });
            setResMessage(res?.data?.desc);
          }
        })
        .catch((err) => {
          console.log(err.response);
          // setResMessage(err.response);
          setResMessage({ message: err?.reponse?.desc, type: "error" });
          setLoading(false);

        });
    }
  };

  const requestOtp = () => {
    setLoading1(true);

    const config = getToken();
    const email = {
      email: updatePassword.email,
    };
    axios
      .post(
        `${process.env.REACT_APP_AUTH_URL}/auth/reset`,
        { ...email },
        config
      )
      .then((res) => {
        
        setLoading1(false);
        if (res.data.desc == "OK" && res.data.status == 0) {
          setStep1(1);
          setResMessage({ message: 'Six digit reset pin has been sent to your email', type: "success" });
          setTimeout(()=>{
            setResMessage({ message: '', type: "" });
          },5000)
        }else if (res.data.status == 1){
          setResMessage({ message: 'Error occured while processing your request, Please try again', type: "error" });
          setTimeout(()=>{
            setResMessage({ message: '', type: "" });
          },4000)
        }
        
       
        // setTimeout(()=>{
        //   setResponse({ message:'', type: "" });
        // }, 3000)

       
      })
      .catch((err) => {
        
        setLoading1(false);
      });
   
  };

  useEffect(() => {
    let payload = {
      email: email,
    };
    setUpdatePassword({ ...updatePassword, ...payload });
  }, []);

  return (
    <div className="row">
      {step1 == 1 && (
        <>
         {
           resMessage.message && (
            <div
            className={`text-center mb-4 ${
              resMessage.type == "error"
                ? "alert alert-danger"
                : "reset-password-notification"
            }`}
          >
            {resMessage.message}
          </div>
           )
         }
          {updatePassword.error && (
            <div className="text-center text-danger">
              {updatePassword.error}
            </div>
          )}

          <div className="col-md-12">
            <div className="form-group">
              <label
                className={`${editprofile.label}`}
                htmlFor="exampleFormControlInput1"
              >
                OTP
              </label>
              <input
                onChange={handleChange}
                name="otp"
                value={updatePassword.otp}
                type="text"
                className={`${editprofile.form_control}`}
                id="exampleFormControlInput1"
                placeholder="Enter OTP"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label
                className={`${editprofile.label}`}
                htmlFor="exampleFormControlInput1"
              >
                New Password
              </label>
              <input
                onChange={handleChange}
                name="password"
                value={updatePassword.password}
                type="text"
                className={`${editprofile.form_control}`}
                id="exampleFormControlInput1"
                placeholder="Enter New Password"
              />
            </div>
          </div>
          <div className="col-md-12 ">
            <button
              onClick={HandlePaswwordreset}
              className={editprofile.form_button}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </>
      )}

      {step1 == 0 && (
        <>
          <div className="col-md-12 ">
            <button onClick={requestOtp} className={editprofile.form_button}>
              {loading1 ? "Requesting..." : "Request OTP"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Profile = ({
  name,
  phone,
  email = "",
  dob = "",
  setProfileSettings,
  getUserProfile,
}) => {
  const [updateProfile, setUpdateProfile] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    error:''
  });

  const [gender, setGender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(true);
  const [error, setError] = useState("");
  const { Response, setResponse } = UseMessage();
  const selecteGender = (e) => {
  
    const { name, value } = e.target;
    if (e.target.value == "male") {
      setGender("male");
      setUpdateProfile({ ...updateProfile, [name]: value });
    }
    if (e.target.value == "female") {
      setGender("female");
      setUpdateProfile({ ...updateProfile, [name]: value });
    }
  };

  useEffect(() => {
    UpdateUser();
  }, []);

  const UpdateUser = () => {
    const user = {
      name: name,
      phone: phone,
      dob: dob,
      
    };

    setUpdateProfile({ ...updateProfile, ...user });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateProfile({ ...updateProfile,error:'', [name]: value });
  };

  const getToken = () => {
    const token = JSON.parse(localStorage?.getItem("user"))?.token;
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  const submitChange = async (e) => {
    e.preventDefault();

    if(!updateProfile.name){
     
      setUpdateProfile({...updateProfile, error:'Name field is required'})
    }else if(!updateProfile.phone){
      setUpdateProfile({...updateProfile, error:'Phone field is required'})
    }else{
      setLoading(true);

    try {
      const config = getToken();

      const { data } = await axios.post(
        `${process.env.REACT_APP_AUTH_URL}/update-user-profile`,
        { ...updateProfile },
        config
      );
      if (data) {
        setLoading(false);

        updateLocalStorage(data?.obj);
        // message.success({
        //   content: `${data?.desc},`,
        //   duration: 3,
        // });
        getUserProfile();

        setResponse({ message: data?.desc, type: "error" });
        setTimeout(() => {
          setResponse({ message: "", type: "" });
        }, 3000);
      }
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.error || "connection error");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    }
    
  };

  return (
    <div className="container position-relative">
      {error && (
        <div
          style={{ height: "29px", padding: "0", width: "86%", top: "-47px" }}
          className="text-center alert alert-danger  "
        >
          {error}
        </div>
      )}

      <div className="d-flex justify-content-start">
        <div className={`${editprofile.edit_profile} `}>
          {step ? "Update Profile" : "Update Password"}
        </div>{" "}
      </div>
      {Response.message.length > 0 && (
        <div style={{ ...styles?.alert() }}>{Response.message}</div>
      )}
      {
        updateProfile.error && (
          <div style={{ ...styles?.alert(true) }}>{updateProfile.error}</div>
        )
      }

      <div className="d-flex justify-content-end">
        <button
          onClick={() => setStep(!step)}
          style={{
            maxWidth: "113px",
            fontSize: "14px",
            height: "38px",
            color: "var(--humber-link)",
            background: "none",
          }}
          className={editprofile.form_button}
        >
          {step ? "Edit Password" : "Edit Profile"}
        </button>
      </div>
      {step == true && (
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label
                className={`${editprofile.label}`}
                htmlFor="exampleFormControlInput1"
              >
                Full Name
              </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="name"
                value={updateProfile.name}
                type="email"
                className={`${editprofile.form_control}`}
                id="exampleFormControlInput1"
                placeholder="Enter full name"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label
                className={`${editprofile.label}`}
                htmlFor="exampleFormControlInput1"
              >
                Phone
              </label>
              <input
                onChange={handleChange}
                name="phone"
                value={updateProfile.phone}
                type="text"
                className={`${editprofile.form_control}`}
                id="exampleFormControlInput1"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="col-md-12 ">
            <button onClick={submitChange} className={editprofile.form_button}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {step == false && (
        <PasswordChange setProfileSettings={setProfileSettings} email={email} />
      )}
    </div>
  );
};

export default Profile;
// export default EditProfile;
