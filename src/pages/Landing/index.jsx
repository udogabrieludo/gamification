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
// import Button from "../../components/Button";
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
import { Carousel } from 'react-bootstrap';
import EventMitter from "../../utils/emitter.js";

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
  
  useEffect(()=>{
    EventMitter.addListener('closeLandingCard' , ()=>{
      
      setShowCard(false)
    })
  })

  const [showtriviabtn, setShowTriviaBtn] = useState(false);
  const [showguessbtn, setShowGuessBtn] = useState(false);
  const [avatarBtn, setShowAvatarBtn] = useState(false);
  const [gameguess, setGameGuess] = useState(false);
  const [gametrivia, setGameTrivia] = useState(false);
  const [gameavatar, setGameAvatar] = useState(false);
  const [guessgamecategory, setGuessGameCategory] = useState(false);
  // const [ triviaBtn, setTrivialbtn] = useState(false);

  const [modal, setModal] = useState(false);
  const [showforgotpassword, setShowForgotPassword] = useState(false);
  const [firsttimer, setFirstTimer] = useState(false);
  const [ ShowCards, setShowCard ] = useState(true);
  const [ step, setStep] = useState('login');
  // const [ ] = useState(false);

  /// handles pop ups of the games
  const showGuessGamePopUp = () => {
    // setGameGuess(true);
    const user = localStorage.getItem('user')
    if(user){
    return history.push('/guess-game')
    }
    setShowCard(false)
    setModal(true)
  };
  const noShowGuessGamePopUp = () => {
    setGameGuess(false);

    setShowCard(true)
  };
  const showTriviGamePopUp = () => {
    setShowCard(false)
    setGameTrivia(true);
  };
  const noshowTriviGamePopUp = () => {
    setGameTrivia(false);
    setFirstTimer(false);
    setShowCard(true)
  };
  const showAvatarGamePopUp = () => {
    setGameAvatar(true);
    setShowCard(false)
  };
  const noshowAvatarGamePopUp = () => {
    setGameAvatar(false);
    setFirstTimer(false);
    setShowCard(true)
  };
  const showGuessGameCategoryPopUp = () => {
    setGameGuess(false);
    setGuessGameCategory(true);
    setShowCard(false)
  };
  const noshowGuessGameCategoryPopUp = () => {
    // setGameGuess(false)
    setGuessGameCategory(false);
    setFirstTimer(false);
    setShowCard(true)
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
    setShowCard(true)
  };
  const openModal = () => {
    setModal(true);
    setShowCard(false)
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
  const showAvatarButton = () => {
    setShowAvatarBtn(true);
  };
  const unshowAvatarbtn = () => {
    setShowAvatarBtn(false);
  };

  const ShowButton = ({ btnText, handleShow, disabled }) => {
    return (
      <button disabled={disabled} className={styles.btn} onClick={handleShow}>
        {btnText}
      </button>
    );
  };
  const HoverDesc = ({desc}) => {
    return <div style={{textAlign: 'center', padding: '0 20px 10px 20px', marginTop: '-15px'}}>{desc}</div>
  }

  return (
    <div className={`${styles.landingWrapper} `}>
    
      <HeaderNav  closeModal={closeModal} landing={true} openModal={openModal} />
      <div className={styles.header}>
        <div className={styles.h1}>
        Choose your Favorite Biggie's Gamemate and win Amazing Prizes. WIN BIG!!!
        </div>
      </div>

      {/* card for home page */}
      {
        ShowCards &&  (
          <div
        style={{ gap: "20px" }}
        className={`${styles.mobileCard} d-flex justify-content-center align-items-center wrapper container mt-3`}
      >
        <div
          onMouseOver={showGuessBtn}
          onMouseLeave={unshowGuessBtn}
          className={`card ${styles.customeCard}`}
        >
          <div className="d-flex justify-content-center">
            <img className="cardImage" src={questionmark} alt="questionmark" />
          </div>

          <div className="card-body">
            <h5 className="text-center">Guess Game</h5>

            {showguessbtn && (
              <div className="d-flex justify-content-center">
                <p className="card-text text-center">
                Make a guess on a specific event per category and win up to N50,000 in coins if the prediction is correct. Each guess cost 10 tokens to play.
                </p>
               
              </div>
            )}
            {showguessbtn && (
              <div className="d-flex justify-content-center mt-2">
                <ShowButton
                  btnText="Play Guess "
                  handleShow={showGuessGamePopUp}
                />
              </div>
            )}
            {
              !showguessbtn && (
                <h5 className ="text-center">Guess correctly and win up to N50,000 tonight
 <br/>  <span className="text-danger font-weight-bold">Play</span> </h5>
              )
            }
          </div>
        </div>
        <div
          onMouseOver={showAvatarButton}
          onMouseLeave={unshowAvatarbtn}
          className={`card ${styles.customeCard}`}
        >
          <div className="d-flex justify-content-center">
            <img
              className="cardImage"
              src={avataricon}
              alt="avataricon"
              style={{ height: "78px" }}
            />
          </div>
          <div className="card-body">
            <h5 className="text-center">Avatar</h5>
            <h6 className="text-center">Get lucky with your Avatar and win up to N100,000 tonight. 
</h6>

            {avatarBtn && (
              <p className="card-text text-center">
              Select any 3 Avatar of your choice to represent you. Your Avatars will earn you points and prizes based on daily activities and performances. You can win the Grand Prize of N5 million by choosing correctly.
              </p>
            )}
            <div className="d-flex justify-content-center">
              {avatarBtn && (
                <div className="d-flex justify-content-center">
                  <ShowButton
                    onClick={showAvatarGamePopUp}
                    btnText="Coming Soon"
                    disabled={true}
                  />
                </div>
              )}

            </div>
            {
              !avatarBtn && (
                <h5 className ="text-center">Instant Reward <br/> <span className="text-danger font-weight-bold">Play</span> </h5>
              )
            }
          </div>
        </div>
        <div
          onMouseOver={showTriviaBtn}
          onMouseLeave={unshowTriviaBtn}
          className={`card ${styles.customeCard}`}
        >
          <div className="d-flex justify-content-center">
            <img
              className="cardImage"
              src={triviaicon}
              alt="triviaicon"
              style={{ maxHeight: "74px" }}
            />
          </div>

          <div className="card-body">
            <h5 className="text-center">Trivia</h5>

            {showtriviabtn && (
              <p className="card-text text-center">
              Trivia are multiple choice quiz games based on the activities of the contestants in the house and entertainment shows in Nigeria. Coins and points are awarded for every correct answer. Winners are eligible to win up to <strong className="text-danger">100,000</strong> Naira <strong className="text-danger">INSTATNTLY</strong>
              </p>
            )}
            <div className="d-flex justify-content-center">
              {showtriviabtn && (
                <ShowButton
                  disabled={true}
                  btnText="Coming Soon"
                  handleShow={showTriviGamePopUp}
                />
              )}
            </div>
            {
              !showtriviabtn && (
                <h5 className ="text-center">Win 10,000 <br/> <span > <span className="text-danger font-weight-bold">Play</span> </span> </h5>
              )
            }
          </div>
        </div>
      </div>

    
        )
      }
       <div
        className={`${styles.gift_rapper} position-absolute `}
        style={{ backgroundImage: `url(${halfcircle})` }}
      >
        <div
          className="position-relative"
          style={{ height: "150px", width: " 800px", margin: "auto" }}
        >
         <div className={styles.rolltext} style={{ marginBottom: "20px" }}>
        lots of great
        <br /> prizes to be won
      </div>
          <img
            className={` ${styles.giftMicroVave } ${styles.gift_images} position-absolute`}
            src={microwave}
            alt="microwave"
          />
          <img
            className={`${styles.iphone} position-absolute ${styles.gift_images}`}
            src={iphone}
            alt="iphone"
          />
          <img
            className={`${styles.cash } position-absolute ${styles.gift_images}`}
            src={cash}
            alt="cash"
          />
          <img
            className={`${styles.camry} position-absolute ${styles.gift_images}`}
            src={camry}
            alt="camry"
          />
          <img
            className={`${styles.generator} position-absolute ${styles.gift_images}`}
            src={generator}
            alt="generator"
          />
        </div>
      </div>

      {/* <div className={`${styles.cards} mt-4`}>
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
      </div> */}

      {/* <img src={halfcircle} alt="halfcircle" className={styles.halfshape} /> */}
      {/* <div className={styles.gifts}>
        <img src={microwave} alt="microwave" />
        <img src={iphone} alt="iphone" />
        <img src={cash} alt="cash" />
        <img src={camry} alt="camry" />
        <img src={generator} alt="generator" />
      </div> */}
      {/* <div className={styles.rolltext} style={{ marginBottom: "20px" }}>
        lots of great
        <br /> prizes to be won
      </div> */}
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
          
          {/* <Tabs
            tabsProps={{
              style: {
                textAlign: "center",
              },
            }}
            activeTab={{
              id: "login",
            }}
          >
            <Tabs.Tab id="login" title="Login">
             
            </Tabs.Tab>
            <Tabs.Tab id="register" title="Sign Up">
              <Register firsttimer={firsttimer} />
            </Tabs.Tab>
          </Tabs> */}
          {
            step == 'login' && (
               <Login setSetup={()=>{
                 setStep('signup')
               }} handleShowForgotPassword={handleShowForgotPassword} /> 
            )
          }
          {
              step == 'signup' && (
                <Register setSetup={()=>{
                    setStep('login')
                }}  firsttimer={firsttimer} />
              )
          }
          

          {/* <Login handleShowForgotPassword={handleShowForgotPassword} /> */}
        </Modal>
      )}
      {showforgotpassword && (
        <Modal
          cancelIcon={true}
          closeModal={() => {setShowForgotPassword(false); setShowCard(true);}}
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
