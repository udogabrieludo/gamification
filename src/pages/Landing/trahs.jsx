import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Tabs } from "@feuer/react-tabs";
import UseProduct from "../../utils/UseProduct";
import styles from "./style.module.css";
import bbnaija from "../../assets/bbnaija.png";
import landscape from "../../assets/images/landscape.png";
import ellipse from "../../assets/ellipse.png";
import arrowwhite from "../../assets/svg/arrowwhite.svg";
import arrowblack from "../../assets/svg/arrowblack.svg";
import HeaderNav from "../../components/HeaderNav";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Register from "../../components/Register";
import Payments from "../../components/Payments";
import VerifyOtp from "../../components/VerifyOtp";
import Login from "../../components/Login";
import questionmark from "../../assets/svg/question-mark.svg";
import avataricon from "../../assets/svg/avataricon.svg";
import triviaicon from "../../assets/svg/triviaicon.svg";
import halfcircle from "../../assets/svg/halfcircle.svg";
import cash from "../../assets/images/cash.png";
import allstars from "../../assets/images/allstars.png";
import camry from "../../assets/images/camry.png";
import generator from "../../assets/images/generator.png";
import iphone from "../../assets/images/iphone.png";
import microwave from "../../assets/images/microwave.png";
import GuessGameModal from "../../components/GuessGameModal";
import TriviCategory from "../../components/TriviaCategory";
import AvatarPopUp from "../../components/AvatarPopUp";
import GuessGameCategory from "../../components/GuessGameCategory";
import RedeemPopUp from "../../components/RedeemPopUp";
import Picks from "../../components/Picks";
import ForgotPassword from "../../components/ForgotPassword";

const Landing = (props) => {
  const history = useHistory();
  // useEffect(()=>{
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     history.replace("/");
  //   }else {
  //     history.replace('/home')
  //   }
  // }, [])

  // useLayoutEffect(()=>{
  //   const loggedIn = localStorage.getItem('token')
  //   loggedIn &&  history.push('/home')
  // }, [])

  const [showtriviabtn, setShowTriviaBtn] = useState(false);
  const [showguessbtn, setShowGuessBtn] = useState(false);
  const [gameguess, setGameGuess] = useState(false);
  const [gametrivia, setGameTrivia] = useState(false);
  const [gameavatar, setGameAvatar] = useState(false);
  const [guessgamecategory, setGuessGameCategory] = useState(false);

  const [modal, setModal] = useState(false);
  const [showforgotpassword, setShowForgotPassword] = useState(false);
  const [firsttimer, setFirstTimer] = useState(false);
  // const [ ] = useState(false);

  /// handles pop ups of the games
  const showGuessGamePopUp = () => {
    setGameGuess(true);
  };
  const noShowGuessGamePopUp = () => {
    setGameGuess(false);
  };
  const showTriviGamePopUp = () => {
    setGameTrivia(true);
  };
  const noshowTriviGamePopUp = () => {
    setGameTrivia(false);
    setFirstTimer(false);
  };
  const showAvatarGamePopUp = () => {
    setGameAvatar(true);
  };
  const noshowAvatarGamePopUp = () => {
    setGameAvatar(false);
    setFirstTimer(false);
  };
  const showGuessGameCategoryPopUp = () => {
    setGameGuess(false);
    setGuessGameCategory(true);
  };
  const noshowGuessGameCategoryPopUp = () => {
    // setGameGuess(false)
    setGuessGameCategory(false);
    setFirstTimer(false);
  };

  const handleGameTrivia = () => {
    setGameTrivia(true);
  };

  const handleShowForgotPassword = () => {
    setModal(false);
    setShowForgotPassword(true);
  };
  const closeModal = () => {
    setModal(!modal);
  };
  const openModal = () => {
    setModal(true);
  };

  const pushToprizePage = () => {
    history.push("/prizes");
  };

  const showGuessBtn = () => {
    setShowGuessBtn(true);
  };
  const showTriviaBtn = () => {
    setShowTriviaBtn(true);
  };

  const unshowGuessBtn = () => {
    setShowGuessBtn(false);
  };
  const unshowTriviaBtn = () => {
    setShowTriviaBtn(false);
  };

  const ShowButton = ({ btnText, handleShow, disabled }) => {
    return (
      <button disabled={disabled} className={styles.btn} onClick={handleShow}>
        {btnText}
      </button>
    );
  };

  return (
    <div className={styles.landingWrapper}>
      {/* <img style={{position: 'absolute', height: '590px', right: '90px', bottom: 0}} src={ellipse} alt="ellipse" /> */}
      {/* <img style={{position: 'absolute', filter: 'drop-shadow(0px 0px 17px rgba(0, 0, 0, 0.25))',  right: 0, bottom: 0, left:0,  objectFit: 'contain'}} src={allstars} alt="bbnaija" /> */}
      <HeaderNav landing={true} openModal={openModal} />

      {/* <div className={styles.myslide}> */}
      <div className={styles.header}>
        <div className={styles.h1}>
          Support your favorite housemate and win amazing rewards.
        </div>
        {/* <p>play to prove your loyalty!</p> */}
      </div>
      <div className={`${styles.cards} mt-4`}>
        <div onMouseOver={showGuessBtn} onMouseLeave={unshowGuessBtn}>
          <img src={questionmark} alt="questionmark" />
          
          <p clhassName="text-center" style={{ color: "#06B4C7", fontSize: "22px" }}>Guess Game</p>
          {showguessbtn && (
            <ShowButton btnText="Play Guess" handleShow={showGuessGamePopUp} />
          )}
        </div>
        <div>
          <img src={avataricon} alt="avataricon" />
          <p className="text-center" style={{ color: "#000", fontSize: "22px" }}>Avatar</p>
          {/* <div>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris
          </div> */}
          <button
            className={styles.btn}
            disabled={true}
            onClick={showAvatarGamePopUp}
          >
            Coming Soon
          </button>
        </div>
        <div onMouseOver={showTriviaBtn} onMouseLeave={unshowTriviaBtn}>
          <img
            src={triviaicon}
            alt="triviaicon"
            style={{ maxHeight: "74px" }}
          />
          <p className="text-center" style={{ color: "#B14BE1", fontSize: "22px" }}>Trivia</p>
          {showtriviabtn && (
            <ShowButton
              disabled={true}
              btnText="Coming Soon"
              handleShow={showTriviGamePopUp}
            />
          )}
        </div>
      </div>
    
      {/* <div style={{
        backgroundImage:`url(${halfcircle})`,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        
      }}>
        ssssss
      </div> */}
      <img src={halfcircle} alt="halfcircle" className={styles.halfshape} />
      <div className={styles.gifts}>
        <img src={microwave} alt="microwave" />
        <img src={iphone} alt="iphone" />
        <img src={cash} alt="cash" />
        <img src={camry} alt="camry" />
        <img src={generator} alt="generator" />
      </div>
      <div className={styles.rolltext} style={{ marginBottom: "20px" }}>
        lots of great
        <br /> prizes to be won
      </div>
      <div className={styles.bottomblack}></div>
      {/* <div className={styles.content}>
      <div style={{color: 'white'}}>
      <div style={{textTransform: 'capitalize', fontWeight: 500, fontSize: '39px'}}>prove your loyalty!</div>
      <div style={{marginTop: '5px', fontWeight: 500, fontSize: '18px'}}>Support your favorite housemate and win amazing rewards.</div>
      </div>
      <div className={styles.btns}>
          <Button icon={arrowblack} onClick={openModal}  noOutline title="Get Started" />
          <Button icon={arrowwhite} onClick={pushToprizePage} outline title="See prizes" />
      </div>
      </div> */}
      {modal && (
        <Modal closeModal={closeModal} cancelIcon={true}>
          <Tabs
            tabsProps={{
              style: {
                textAlign: "center",
              },
            }}
            activeTab={{
              id: "register",
            }}
          >
            <Tabs.Tab id="login" title="Login">
              <Login handleShowForgotPassword={handleShowForgotPassword} />
            </Tabs.Tab>
            <Tabs.Tab id="register" title="Sign Up">
              <Register firsttimer={firsttimer} />
            </Tabs.Tab>
          </Tabs>
        </Modal>
      )}
      {showforgotpassword && (
        <Modal
          cancelIcon={true}
          closeModal={() => setShowForgotPassword(false)}
        >
          <ForgotPassword />
        </Modal>
      )}

      {gameguess && (
        <Modal
          cancelIcon={true}
          closeModal={noShowGuessGamePopUp}
          space={{ maxWidth: "776px" }}
        >
          <GuessGameModal
            showGuessGameCategoryPopUp={showGuessGameCategoryPopUp}
          />
        </Modal>
      )}
      {gametrivia && (
        <Modal
          closeModal={noshowTriviGamePopUp}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <TriviCategory
            noshowTriviGamePopUp={noshowTriviGamePopUp}
            openModal={openModal}
            showFisrtTimer={() => setFirstTimer(true)}
          />
        </Modal>
      )}
      {gameavatar && (
        <Modal
          closeModal={noshowAvatarGamePopUp}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <AvatarPopUp
            noshowAvatarGamePopUp={noshowAvatarGamePopUp}
            openModal={openModal}
            showFisrtTimer={() => setFirstTimer(true)}
          />
        </Modal>
      )}
      {guessgamecategory && (
        <Modal
          closeModal={noshowGuessGameCategoryPopUp}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <GuessGameCategory
            noshowGuessGameCategoryPopUp={noshowGuessGameCategoryPopUp}
            openModal={openModal}
            showFisrtTimer={() => setFirstTimer(true)}
          />
        </Modal>
      )}
      {/* <Modal closeModal={closeModal} space={{'maxWidth': '776px'}}>
<RedeemPopUp />
        </Modal> */}
      {/* <Picks btnText="See your results" guess={true}>
        <div style={{fontWeight: "bold", fontSize: "72px"}}>4</div>
          <div style={{fontWeight: "bold", fontSize: "14px", padding: '10px 0'}}>4 events you guessed on were decided while you were away</div>
        </Picks> */}
      {/* <Picks btnText="See your results" avart={true}>
          <div style={{color: '#1B1E1D', padding: '20px 30px'}}>
          <div style={{fontWeight: 'bold', fontSize: '13px'}}>One of your Avatar picks finished in the Top 3</div>
          <div style={{fontSize: '38px', fontWeight: 'bold'}}>Top 3</div>
          </div>
        </Picks> */}
    </div>
  );
};

export default Landing;
