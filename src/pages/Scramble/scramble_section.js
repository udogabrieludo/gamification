import React from "react";
import styles from "./triviacategory.module.css";

import triviaicon from "../../assets/gulder_assets/scramble.svg";

import timericon from "../../assets/images/timericon.png";
// import Cost from "../Cost";

import { useState} from "react";
import Payments from "../../components/Payments";
import axios from "axios";
import { isAuthenticated } from "../../utils/authdata";
import Modal from "../../components/Modal";

import PaymentSuccess from "../../components/PaymentSucess/success";

const Scramble = ({
  setShowScramble,
  timeVal,
  getUplayScramble,
}) => {
  const [topUp, setTopUp] = useState(false);
  const [ userToken, setUserToken] = useState('');
  const { token } = isAuthenticated();
  const [success, setSuccessModal] = useState(false);
  const [amountAdded, setAmmountAdded] = useState("");
  const [confirm, setConfirm] = useState(false)
  const fetchUserStat = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PAYMENT_URL}/api/points/user-stat`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserToken(response?.data?.TOKEN);
      
    } catch (error) {
      
    }
  };
  React.useEffect(()=>{
    fetchUserStat() 
  }, [])
  const playNow = () => {

    if(userToken == 0){
      setTopUp(true)
    }else {
      setShowScramble((scramble) => !scramble);
      getUplayScramble();
    }
    
  };

  return (
    <div>
      <div className={styles.topwrapper}>
        <img
          className={`${styles.image_cat}`}
          src={triviaicon}
          alt="triviaicon"
        />
        <div className={styles.title}>Scramble games</div>
        <div>
        How Fast can you think ? 
        
        </div><br />
        {/* <span style={{fontSize: '16px',
    padding: '15px', marginBottom: '14px'
}} className={`text-danger`}>Cost 5 tokens  per game</span> */}
     
      </div>
      <div className={styles.catstory}>
        <img
          src={timericon}
          alt="timericon"
          className={`${styles.trivia_timer}`}
          style={{ marginTop: "20px" }}
        />
        <div className={styles.readme}>
          You have {timeVal/1000} secs to unscramble word and game costs 5 Tokens
        </div>
        <button disabled={confirm} onClick={playNow} className={styles.btn}>
          play now
        </button>
      </div>
      {/* {topUp && (
        <TopModal
          modalClass={"topup_modal_content"}
          dialogClassName={"topUpclass"}
          closeModal={() => setTopUp(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <Payments
            GetTrivias={GetTrivias}
            setAmmountAdded={setAmmountAdded}
            setTopUp={setTopUp}
            setSuccessModal={setSuccessModal}
            successModal={successModal}
          />
        </TopModal>
      )} */}
      {/* {successModal && (
        <TopModal
          modalClass={"sss"}
          dialogClassName={"topUpsuccess"}
          closeModal={() => setSuccessModal(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <div className="text-center mb-4">
            
            <FeatherIcon icon='check-circle' size="50px" color="#198754"/>
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
            className={`${styles.text} mt-4 mb-4 text-center` } style={{fontSize:'1rem', fontWeight:'400'}}
          >
             has been added to your wallet
          </div>

          <div className=" d-flex mt-4 mb-4 justify-content-center">
            <button onClick={()=>{
              setSuccessModal(false)
              showTriviabox(true);
              GetTrivias();
              
            }}  className={styles.topupsuccess}>Play Game</button>
          </div>
        </TopModal>

      )} */}
      {topUp && (
        <Modal
          setTopUp={setTopUp}
          modalClass={"sss"}
          dialogClassName={"topUpsuccess"}
          closeModal={() => setTopUp(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <Payments
            setAmmountAdded={setAmmountAdded}
            setSuccessModal={setSuccessModal}
            setTopUp={setTopUp}
            fetchUserStat={fetchUserStat}
            setConfirm={setConfirm}
          />
        </Modal>
      )}
      {success && (
        <Modal
          modalClass={"sss"}
          dialogClassName={"topUpsuccess"}
          closeModal={() => setSuccessModal(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <PaymentSuccess setSuccessModal={setSuccessModal} amountAdded={amountAdded} />
        </Modal>
      )}
      {/* {topUp && (
        <Modalb
          setTopUp={setTopUp}
          closeModal={() => setTopUp(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <Payments setTopUp={setTopUp} />
        </Modalb>
      )} */}
    </div>
  );
};

export default Scramble;
//