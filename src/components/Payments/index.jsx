import React, { useState, useEffect, useCallback } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Tabs } from "@feuer/react-tabs";
import styles from "./payments.module.css";
import { PaystackButton, usePaystackPayment } from "react-paystack";
import axios from "axios";
import { message } from "antd";
import EventMitter from "../../utils/emitter.js";
import { Modal } from 'react-bootstrap'
import Activities from "../../components/Activities/activities";


const Payments = ({setKey,setConfirm, GetTrivias,setTopUp,successful, setSuccessModal, successModal, setAmmountAdded, fetchUserStat}) => {
 
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user"));
    const myName = userObj?.name;
    const token = userObj?.token;
    const myEmail = userObj?.email;
    setEmail(myEmail);
    setToken(token);
    setName(myName);
   
  }, []);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const publicKey = `${process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}`;
  const [amount, setAmount] = useState("");
  const [amountToSend, setAmountToSend] = useState(); // Remember, set in kobo!
  const [email, setEmail] = useState();
  const [modulus, setModulus] = useState(false);
  const [LastTwo, setLastTwo] = useState(false);
  const [mine, setMine] = useState("");
  const [showModal, setShowModal] = useState('')
  const [convert, setConvert] = useState('')
  
  // const [closeModal, setCloseModal ] = useState(Boolean)

  //   const [name, setName] = useState(myName);
  //   const [phone, setPhone] = useState("");

  // const closeModal = () => {
  //   return true;
  // };

  const confirmPayment = async (ref) => {
      
    // if(LastTwo){
    //   message.success({content: 'Amount must be in multiples of two'})
    // }
    
    if(setConfirm){
      setConfirm(true)
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PAYMENT_URL}/api/wallet-top/confirm-payment`,
        // `${process.env.REACT_APP_AUTH_URL}/api/v1/payment/confirm-payment`,
        {
          processor: "paystack",
          reference: `${ref.reference}`,
        },
        {
          headers,
        }
      );
      // console.log("confirming payment", res?.data?.description);
     
      
      setSuccessModal(true)
      if(fetchUserStat){
        fetchUserStat()
      }
      if(setConfirm){
        setConfirm(false)
      }
      
      if(setKey){
        setKey(key=>key + 1)
      }
      setAmmountAdded(Number(amountToSend))
      
      if(res?.data?.description == 'Successful'){
       
       return  message.success({
            content:'Tokens Purchase Successful',
            duration:3
          })
      }
      message.success({
        content: `Payment! ${res?.data?.description}`,
        duration: 3,
      });
      
      // EventMitter.emit('hello')
      
      // console.log('>>>>>>>>', successModal)
      window.location.reload()
    } catch (err) {
      // console.log(err.response)
      if(setConfirm){
        setConfirm(false)
      }
      if(err instanceof Error) {
        if(err.message == 'Network Error') {
          message.error({
            content: `Network error , Please try again later`,
            duration: 10,
          });
        }
      }
     if(err.response){
      if(err.response.status == 400){
        message.error({
          content: `Could not Your Complete your payment request, please contact the administrator`,
          duration: 10,
        });
      }else{
        message.error({
          content: err?.response?.message,
          duration: 10,
        });
      }
     }
     
    }
  };

  
  

  const componentProps = {
    email,
    amount,
    // metadata: {
    //   name,
    //   phone,
    // },
    publicKey,
    text: "Pay Now",
    onSuccess: (reference) => {
      
      confirmPayment(reference);
    },
    //   alert("Thanks for doing business with us! Come back soon!!", `${reference}`),
    onClose: () =>
      message.error({
        content: "Wait! Payment process terminated",
        duration: 3,
      }),
    // alert("Wait! You need this oil, don't go!!!!"),
  };

  const handleAmount = (damount) => {
  
    setConvert(damount / 10)
    setAmountToSend(damount);
    setAmount(damount * 100);
    var lastTwo = amountToSend?.substr(amountToSend?.length - 2);
    setMine(amountToSend?.substr(amountToSend?.length - 2));
  
    if (lastTwo !== "00") {
      setLastTwo(true);
      // message.error({content: "Amount must be in multiples of 100"})
    }
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount,
    publicKey: `${process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}`,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    confirmPayment(reference);
  
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    
  };


  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    const handlePay = () => {
      if (amountToSend?.substr(amountToSend?.length - 2) !== "00") {
        message.error({ content: "Amount must be in hundreds" });
      } else {
        initializePayment(onSuccess, onClose);
        setTopUp(false)
       
      }
    };
    return (
      <div>
        <button
          className={styles.btn}
          style={{ padding: "10px 25px" }}
          onClick={()=>{
            handlePay();      
          }}
        >
          Pay Now
        </button>
      </div>
    );
  };

  const formatNumber = (x) => {
    if(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x
  };

  

  return (
    <div className={styles.paymentswrapper}>
      <div className={styles.title}>Fund Your Wallet</div>
      <p>Buy tokens now to get started</p>
      {/* <Tabs
        tabsProps={{
          style: { textAlign: "center" },
        }}
        activeTab={{
          id: "paystack",
        }}
      > */}
        {/* <Tabs.Tab id="paystack" title="Paystack"> */}
          <div style={{ width: "90%", margin: "0 auto", textAlign: "center" }}>
            <div className={styles.depositamount}>
              Deposit Amount (<span>&#8358;</span>)
            </div>

            <div className={`row ${styles.form}`}>
                <div className="col-md-6 col-sm-12 col-xs-12">
               
                <input className={styles.input}
                  type="number"
                  id="amount"
                  placeholder='₦100'
                  value={amountToSend}
                  onChange={(e) => handleAmount(e.target.value)}
                  // style={{ padding: "23px" }}
                />
                {convert > 0 && <div className={styles.desc} style={{textAlign: 'start', color: '#808080', width:'584px'}}>You get {convert} tokens to for crediting &#x20A6;{formatNumber(amountToSend)}</div>}
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                <PaystackHookExample />
                </div>
            </div>
            
            <div className={styles.description}>
             
            </div>
   
          </div>
          
        
          
        
    </div>
  );
};

export default Payments;
