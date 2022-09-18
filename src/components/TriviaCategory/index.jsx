import React from "react";
import styles from "./triviacategory.module.css";

import triviaicon from "../../assets/gulder_assets/trivia.png";

import timericon from "../../assets/images/timericon.png";
import Cost from "../Cost";
import Modal from "../../components/Modal";
import { useState, useEffect } from "react";
import Payments from "../../components/Payments";
import axios from "axios";
import { isAuthenticated } from "../../utils/authdata";
import Activities from "../../components/Activities/activities";
import FeatherIcon from "feather-icons-react";

const TriviCategory = ({
  GetTrivias,
  noshowTriviGamePopUp,
  openModal,
  showFisrtTimer,
  ps,
  showTriviabox,
  fetchTrivial,
 
}) => {
  const handleShowLogin = () => {
    noshowTriviGamePopUp();
    openModal();
    showFisrtTimer();
  };

  const [amountAdded, setAmmountAdded] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [topUp, setTopUp] = useState(false);
  const [myToken, SetMyToken] = useState();
  const { token } = isAuthenticated();
  const [key, setKey] = useState(1);
  const [openTopup, setopenTopup] = useState(false);
  const [confirm, setConfirm ] = useState(false);
  const fetchUserStat = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PAYMENT_URL}/api/points/user-stat`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      SetMyToken(response?.data?.TOKEN);
     
    } catch (error) {
  
    }
  };

  // const playNow = () =>{
  //   showTriviabox(true);
  //    fetchTrivial();
  // }
  
  const playNow = () => {
    if (myToken === 0) {
      setTopUp(true)
      // setopenTopup(true);
    } else if (myToken < 2) {
      // setTopUp(top => top + 1)
      setTopUp(true);
      // setopenTopup(true)
    } else {
      showTriviabox(true);
      fetchTrivial();
    }
  };

  useEffect(() => {
    fetchUserStat();
    
  }, []);

  const formatNumber = (x) => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x;
  };

  return (
    <div className="position-relative">
      
      
      {/* {
        confirm && (
          <Indicator />
        )
      } */}
      <div className={styles.topwrapper}>
        <img
          className={`${styles.image_cat}`}
          src={triviaicon}
          alt="triviaicon"
        />
        <div className={styles.title}>trivia category</div>
        <div className={styles.description}>
          Heard you"re are genius, prove it.
        </div>
        <Cost />
      </div>
      <div className={styles.catstory}>
        <img
          src={timericon}
          alt="timericon"
          className={`${styles.trivia_timer}`}
        />
        <div className={styles.readme}>
          You have 20 seconds for each Question?
        </div>
        <button disabled={confirm} onClick={playNow} className={styles.btn}>
          play now
        </button>
      </div>
      
      {/* <div style={{ display: "none" }}>
        <Activities openTopup={openTopup}  key={key} />
      </div> */}
      {topUp && (
        <Modal
          modalClass={"topup_modal_content"}
          dialogClassName={"topUpclass"}
          closeModal={() => setTopUp(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <Payments
            setTopUp={setTopUp}
            setConfirm={setConfirm}
            fetchUserStat={fetchUserStat}
            setAmmountAdded={setAmmountAdded}
            setSuccessModal={setSuccessModal}
            successModal={successModal}
            setKey={setKey}
          />
        </Modal>
      )}
      {successModal  && (
        <Modal
          modalClass={"sss"}
          dialogClassName={"topUpsuccess"}
          closeModal={() => setSuccessModal(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <div className="text-center mb-4">
            <FeatherIcon icon="check-circle" size="50px" color="#198754" />
          </div>
          <div className={styles.tokenAdded}>
            {formatNumber(amountAdded ? amountAdded / 10 : "")} Token(s)
          </div>
          <div
            style={{
              color: "#000",
              fontFamily: "Poppins",
              fontSize: "20px",
              fontWeight: "bolder",
            }}
            className={`${styles.text} mt-4 mb-4 text-center`}
            style={{ fontSize: "1rem", fontWeight: "400" }}
          >
            has been added to your wallet
          </div>

          <div className=" d-flex mt-4 mb-4 justify-content-center">
            <button
              onClick={() => {
                setSuccessModal(false);
              }}
              className={styles.topupsuccess}
            >
              Play Game
            </button>
          </div>
         
        </Modal>
      )}
    </div>
  );
};


export const Indicator = () => {
  return (
    <div className={styles.indicator}>
    <div className={styles.indicator_content}>
      
      <p className="text-center">Wait while we confirm your transaction....</p>
    </div>
  </div>
  )
}

export default TriviCategory;




















// {topUp && (
//   <TopModal
//     modalClass={"topup_modal_content"}
//     dialogClassName={"topUpclass"}
//     closeModal={() => setTopUp(false)}
//     space={{ maxWidth: "776px" }}
//     cancelIcon={true}
//   >
//     <Payments
//       setKey={setKey}
//       GetTrivias={GetTrivias}
//       setAmmountAdded={setAmmountAdded}
//       setTopUp={setTopUp}
//       setSuccessModal={setSuccessModal}
//       successModal={successModal}
//       setConfirm={setConfirm}
//     />
//   </TopModal>
// )}
// {successModal && (
//   <TopModal
//     modalClass={"sss"}
//     dialogClassName={"topUpsuccess"}
//     closeModal={() => setSuccessModal(false)}
//     space={{ maxWidth: "776px" }}
//     cancelIcon={true}
//   >
//     <div className="text-center mb-4">
//       <FeatherIcon icon="check-circle" size="50px" color="#198754" />
//     </div>
//     <div className={styles.tokenAdded}>
//       {formatNumber(amountAdded ? amountAdded / 10 : "")} Token(s)
//     </div>
//     <div
//       style={{
//         color: "#000",
//         fontFamily: "Poppins",
//         fontSize: "20px",
//         fontWeight: "bolder",
//       }}
//       className={`${styles.text} mt-4 mb-4 text-center`}
//       style={{ fontSize: "1rem", fontWeight: "400" }}
//     >
//       has been added to your wallet
//     </div>

//     <div className=" d-flex mt-4 mb-4 justify-content-center">
//       <button
//         onClick={() => {
//           setSuccessModal(false);
//           showTriviabox(true);
//           GetTrivias();
//         }}
//         className={styles.topupsuccess}
//       >
//         Play Game
//       </button>
//     </div>
//   </TopModal>
// )}