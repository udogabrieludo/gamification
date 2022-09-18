import React, { useState } from "react";
import axios from "axios";
import correctrightarrow from "../../assets/svg/correctrightarrow.svg";
// import tokens from "../../assets/Asset 1.png";
import Payments from "../../components/Payments";
import Modal from "../../components/Modal";
import tokens from "../../assets/images/token.svg"
import checkMark from "../../assets/images/checkmark.png";
import {Link, useHistory } from 'react-router-dom'

import Spinner from "../../components/Spinner";
import { useQuery } from "react-query";
import EventMitter from "../../utils/emitter.js";

import wallet from "./wallet.module.css";
import { useEffect } from "react";

import {isAuthenticated} from '../../utils/authdata'
import FeatherIcon from "feather-icons-react"
import { useMyFetchStuffs } from "../../utils/taofikFetch"



const Wallet = () => {
  const {data, status} = useMyFetchStuffs()

  const [topUp, setTopUp] = useState(false);
  const [dataBalance, SetData] = useState();
  const [successModal, setSuccessModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [amountAdded, setAmmountAdded] = useState("");
  const history = useHistory()

  const {token} = isAuthenticated();

  const closeModal = () => {
    setTopUp(false);
  };

  const formatNumber = (x) => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x;
  };

  return (
    <>
      <div
        className={`${wallet.stackcard} ${wallet.wallet}`}
        style={{ width: "100%", height: "100%" }}
      >
        <div className={wallet.wallettop}>
          <Link to="/transactions?type=token" className={wallet.wallettitle}>Tokens</Link>
          <img
            src={tokens}
            style={{ width: "34px" }}
            alt="wallet icon"
          />
        </div>
        <div type="button" onClick={()=>history.push("/transactions?type=token")} className={wallet.walletbalance}>
          {/* {status === "loading" && <Spinner cz="20px" />} */}
          {/* {status === "success" && (formatNumber(data) || "0")} */}
          {/* {data} */}
          {status === "loading" && <Spinner cz="20px" />}
          {status === "success" && formatNumber(data?.mytoken)}
        </div>
        <div
          className={`${wallet.viewleaderboard} ${wallet.topup}`}
          onClick={() => setTopUp(true)}
        >
          Fund Your Wallet &nbsp; &nbsp; &nbsp;
          <img src={correctrightarrow} alt="correct right arrow" />
        </div>
      </div>

      {topUp && (
        <Modal modalClass={"topup_modal_content"}
        dialogClassName={"topUpclass"}
          closeModal={() => setTopUp(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <Payments
            setAmmountAdded={setAmmountAdded}
            setTopUp={setTopUp}
            setSuccessModal={setSuccessModal}
            successModal={successModal}
          />
        </Modal>
      )}

      {successModal && (
        <Modal
          modalClass={"sss"}
          dialogClassName={"topUpsuccess"}
          closeModal={() => setSuccessModal(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <div className="text-center mb-4">
            
            <FeatherIcon icon='check-circle' size="50px" color="#198754"/>
          </div>
          <div className={wallet.tokenAdded}> 
              
              {formatNumber(amountAdded ? amountAdded / 10 : "")} Token(s)
          </div>
          <div
            style={{
              color: "#000",
              fontFamily: "Poppins",
              fontSize: "20px",
              fontWeight: "bolder",
            }}
            className={`${wallet.text} mt-4 mb-4 text-center` } style={{fontSize:'1rem', fontWeight:'400'}}
          >
             has been added to your wallet
          </div>

          <div className=" d-flex mt-4 mb-4 justify-content-center">
            <button onClick={()=>{
              setSuccessModal(false)
            }}  className={wallet.topupsuccess}>Play Game</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Wallet;
