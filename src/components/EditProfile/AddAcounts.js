import React, { useState, useEffect } from "react";
import editprofile from "./editprofile.module.css";
import axios from "axios";
import { message } from "antd";
import { updateLocalStorage } from "../../utils/authdata";
import "react-datepicker/dist/react-datepicker.css";
import { UseMessage } from "../../utils/utils";
import { isAuthenticated } from "../../utils/authdata";

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

const Account = ({ name, phone, bankCodes, dob = "" , setProfileSettings, BankAcount,bankAccount, bankAccounts}) => {
  const [Account, setAccount] = useState({
    accountNumber: "",
    bankCode: "",
    accountName:'',
    error:''
  });

  const [loading, setLoading] = useState(false);
  const [isValidated, setisValidated] = useState(false);
  

  const { Response, setResponse } = UseMessage({

  });
  const [resolved, setResolved ] = useState({});

  const { token } = isAuthenticated();

  useEffect(() => {}, []);

  const handleChange = (event) => {
    setisValidated(false)
    const { name, value } = event.target;
    
    setAccount({ ...Account, error: "", [name]: value });
    
  };

  const ValidateAccount = () => {
    setLoading(true)
    if (!Account.accountNumber) {
      setLoading(false)
      setAccount({...Account, error:'Accout number is required'})
    } else if (!Account.bankCode) {
      setLoading(false)
      setAccount({...Account, error:'Bank name is required'})
    } else {
      const payload = {

        accountNumber: Account.accountNumber,
        bankCode: Account.bankCode,
      };

     
      
      axios
        .post(
          `${process.env.REACT_APP_PAYMENT_URL}/api/bank-accounts/validate`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
         
          setResolved(res.data.data)
          console.log(res?.data?.data?.account_name)
          setAccount({...Account, accountName:res?.data?.data?.account_name})
          setisValidated(true)
          setLoading(false)
        })
        .catch((err) => {
          
          setLoading(false)
            if(err instanceof Error){
              if(err.message == 'Network Error'){
                message.error('Network error, please check your network configuration')
              }
            }

           


            if(err.response){
              if(err.response.status == 404){
                setAccount({...Account, error:'Account not found please check your account'})
                message.error('Account not found, please check your account')
              }else if(err.response.status == 401){
                message.error('Not authorized, Please login again')
              }else {
                message.error('An error occurred, please try again')
              }
            }
          setLoading(false)
        });
    }
  };
  const AddAccount = () => {
    setLoading(true)
    
    const payload = {
      accountNumber: Account.accountNumber,
      bankCode: Account.bankCode,
      accountName: Account.accountName
    };
  
    axios
      .post(
        `${process.env.REACT_APP_PAYMENT_URL}/api/bank-accounts/add`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false)
        message.success('Account added successfully')
        BankAcount()
        setProfileSettings(false)
      })
      .catch((err) => {
        setLoading(false)
        setProfileSettings(false)
        if(err instanceof Error){
          if(err.message == 'Network Error'){
            message.error('Network error, please check your network configuration')
          }
        }

       


        if(err.response){
          if(err.response.status == 404){
            setAccount({...Account, error:'Account not found please check your account'})
            message.error('Account not found, please check your account')
          }else if(err.response.status == 401){
            message.error('Not authorized, Please login again')
          }else {
            message.error('An error occurred, please try again')
          }
        }
   
      });
  
     
  };
  

  

  

  return (
    <div className="container position-relative">
      <div className="d-flex justify-content-start">
        <div className={`${editprofile.edit_profile} `}>Add acount</div>
      </div>
      {Response.message.length > 0 && (
        <div style={{ ...styles?.alert() }}>{Response.message}</div>
      )}
      {Account.error && (
        <div style={{ ...styles?.alert(true) }}>{Account.error}</div>
      )}

     
       
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label
              className={`${editprofile.label}`}
              htmlFor="exampleFormControlInput1"
            >
              Account Number
            </label>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              name="accountNumber"
              type="number"
              className={`${editprofile.form_control}`}
              id="exampleFormControlInput1"
              placeholder="Account number"
            />
          </div>
        </div>
        {
        resolved?.account_name && (<div className="col-md-12">
          <div className="form-group">
            <label
              className={`${editprofile.label}`}
              htmlFor="exampleFormControlInput1"
            >
              Account Name
            </label>
            <input
              value={Account?.accountName}
              disabled
              name="accountNumber"
              type="text"
              className={`${editprofile.form_control}`}
              id="exampleFormControlInput1"
              placeholder=""
            />
          </div>
        </div>)
      }
        <div className="col-md-12">
          <div className="form-group">
            <label
              className={`${editprofile.label}`}
              htmlFor="exampleFormControlInput1"
            >
              Bank Name
            </label>
            <select
              style={{ width: "100%" }}
              onChange={handleChange}
              name="bankCode"
              className={`${editprofile.form_control}`}
              id="exampleFormControlInput1"
            >
              <option selected disabled>
                Select Bank
              </option>
              {bankAccounts.map((code) => (
                <option value={code.bankCode}>{code.bankName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-12 ">
          <button onClick={ !isValidated ? ValidateAccount : AddAccount } className={editprofile.form_button}>
            {!isValidated ? loading ? "Saving..." : "Add Account" : loading ? "Comfirming..." : "Confirm Your account" }
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
// export default EditProfile;
