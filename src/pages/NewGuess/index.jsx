import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import GuessHeader, { GuessCategoryList } from "./GuessHeader";
import newguess from "./newguess.module.css";
import questionmark from "../../assets/gulder_assets/guess_logo.png";


import diary from "../../assets/svg/diary.svg";
import eviction from "../../assets/svg/eviction.svg";
import hoh from "../../assets/svg/hoh.svg";

import party from "../../assets/svg/party.svg";
import Countdown from "antd/es/statistic/Countdown";

import { message } from "antd";
import Spinner from "../../components/Spinner";
import Payments from "../../components/Payments";


import Modal from "../../components/Modal";
import Spinner2 from "react-bootstrap/Spinner";

import { isAuthenticated } from "../../utils/authdata";
import successcheck from "../../assets/svg/successcheck.svg";

import FeatherIcon from "feather-icons-react";
import Activities from "../../components/Activities/activities";
import { StatsContext } from "../../context/";
import PaymentSuccess from "../../components/PaymentSucess/success";


// spinner for answer submittion
const Bspinner = () => {
  return (
    <Spinner2 animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner2>
  );
};

function onFinish() {
 
}


const NewGuess = () => {
  const [mymyToken, setMymyToken] = useState(null);
 
  const tokenObj = JSON.parse(localStorage.getItem("user")) || "";

  const { token } = isAuthenticated();

  const fetchUserStat = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PAYMENT_URL}/api/points/user-stat`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMymyToken(response?.data?.TOKEN);
     
    } catch (error) {
     
    }
  };
  useEffect(() => {
    fetchUserStat();
   
  }, []);


  const ourTokenToken = tokenObj.token;
  const CatGegories = ({ guessCategoryId, guess, catIcons, id }) => {
    
    // console.log(guess, 'uchech' )
    return (
      <div
        className={newguess.card}
        onClick={() => handleShowGuess(guess.id, guess)}
      >
        {guessCategoryId?.name === "all" ? (
          ""
        ) : (
          <img src={guess ? guess?.imgUrl : catIcons[id]} alt="icons" />
        )}
        <div className={newguess?.description}>
          <div className={newguess?.h3}>{guess?.name}</div>

          <div style={{ color: "var(--humber-link)" }}>
            Click to Play <FeatherIcon icon="chevron-right" />
          </div>
        </div>
      </div>
    );
  };

  const history = useHistory();

  const [guessgames, setGuessGames] = useState({});
 
  const [sessionData, setSessionData] = useState();

  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);

  const [response, setReponse] = useState(0);

 
  const [pickoption, setPickOption] = useState(false);
  const [showguesscategory, setShowGuessCategory] = useState(true);
  const [random, setRandom] = useState(getRandomInt(7));

  const [optionId, setOptionId] = useState("");
  const [guessId, setGuessId] = useState("");
  const [optionAnswer, setoptionAnswer] = useState("");
  const [success, setSuccessModal] = useState(false);
  const [freeText, setFreeText] = useState({
    guessId: "",
    userAnswerText: "",
  });

  const [eachGuess, setEachGuess] = useState([]);
  const [feedBackText, setFeedBackText] = useState("");
  const [feedBackCoin, setFeedBackCoin] = useState("");
  const [pickedSelection, setPickedSelection] = useState();
  const [topUp, setTopUp] = useState(false);
  const [submitAnswser, setSubmitAnswer] = useState(false);
  const [amountAdded, setAmmountAdded] = useState("");
  const [key, setKey] = useState(1);

  const {
    state: { stat },
  } = useContext(StatsContext);

  const [timer, SetTimer] = useState(null);

  const againtext = random > 3 ? "Avatar" : "Trivia";


  const headers = {
    Authorization: token,
  };

  const fetchGameSession = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_GUESS_GAME_URL}/guess-game-category`,
        { headers }
      );
         setSessionData(data?.obj?.guessCategory);
    
      setLoading(false);
      // return data
    } catch (error) {
      console.log(error);
      // return error
      setLoading(false);
      if (error instanceof Error) {
        if (error.message == "Network Error") {
          message.error("Network error, please check your network");
        }
      }
      if (error.response) {
        message.error(error.response.desc);
      }
    }
  };

  const fetchGuessGameById = async (gameId) => {
    
    setLoading1(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_GUESS_GAME_URL}/guess-game/random/${gameId}`,
        { headers }
      );
         setGuessGames(data?.obj);
      setLoading1(false);
      if (data.status == 0) {
        if (data.desc === "Unauthorized access") {
          message.error(data.desc + ", You need to login again");
        }
      }
    } catch (error) {
      setLoading1(false);
      if (error instanceof Error) {
        if (error.message == "Network Error") {
          message.error("Network error, please check your network");
        }
      }
      if (error.response) {
        message.error(error.response.desc);
      }
       }
  };

  useEffect(() => {
    fetchGameSession();
  }, []);

  const handleShowGuess = (id, guess) => {
    // SetTimer(guess.endDateTime)
    // setShowGuessCategory(false);
    // setShowGuess(true);
    fetchGuessGameById(id);
    // setShowGuess(false);
    setShowGuessCategory(false);
    setPickOption(true);
  };

  const handleSubmitGuess = () => {
    setPickOption(false);
    setReponse(1);
  };
  const playagain = () => {
    setReponse(0);
    setShowGuessCategory(true);
  };
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const freeTextSubmit = async (each) => {
    const { guessId, userAnswerText } = freeText;
    setLoading(true);
    if (!userAnswerText) {
      message.error({
        content: "Please fill in the answer input",
        duration: 5,
      });
      setLoading(false);
    } else if (mymyToken  < 10) {
      // setSubmitAnswer2(false)
      message.error({
        content: "You need to have tokens to play Guess Game",
        duration: 5,
      });
      setTopUp(true);
      setLoading(false);
    }
    // alert(`${guessId} for free text`)
    else {
      try {
        // setSubmitAnswer2(false)
        let payload = {
          guessId: guessId,
          userAnswerText: userAnswerText,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_GUESS_GAME_URL}/guess-game-answer`,
          payload,
          // {...freeText},
          { headers }
        );
        message.success(`${response?.data?.desc} recorded succesfully`);
        setFeedBackText(response?.data?.obj.userAnswerText);
        setFeedBackCoin(response?.data?.obj.coinAward);
        
        setLoading(false);
        handleSubmitGuess();
        setKey((key) => key + 1);
      } catch (error) {
        setLoading(false);
     
        if (error?.message == "Network Error") {
          message.error({ content: "Network error", duration: 5 });
        } else if (error?.response?.status == 500) {
          message.error({ content: "Internal server error", duration: 5 });
        } else if (error?.response?.status == 404) {
          message.error({
            content: "Error occured while playing games, please try again",
            duration: 5,
          });
        } else {
          message.error({ content: error.response.data.desc, duration: 5 });
        }

        // message.error(error?.response?.data || 'connection error')
      }
    }
  };

  const optionsSubmit = async () => {
    setSubmitAnswer(true);
    if (mymyToken < 20) {
      setSubmitAnswer(false);
      message.error({
        content: "You need to have tokens to play Guess Game",
        duration: 5,
      });
      setTopUp(true);
      return;
    }
    if (guessId && optionId && optionAnswer) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_GUESS_GAME_URL}/guess-game-answer`,
          {
            guessId: guessId,
            optionId: optionId,
            userAnswerText: optionAnswer,
          },
          { headers }
        );
        // message.success(response.data)
        setSubmitAnswer(false);
            handleSubmitGuess();
        setKey((key) => key + 1);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Network Error") {
            message.error("connection error, Please try again later");
          }
        }
        if (error?.response) {
          if (error?.response?.status === 404) {
            message.error("An error occured, please try again");
          } else {
            message.error(`${error?.response?.data?.desc}`);
          }
        }
        setSubmitAnswer(false);
      }
    } else {
      message.error({ content: "you have to make a selection", duration: 5 });
      setSubmitAnswer(false);
      // alert('you have to make a selection')
    }
  };

  const handleOptionsPicked = (optionId, guessId, optionText) => {
  
    setoptionAnswer(optionText);
    // alert(`${optionId}`)
    setOptionId(optionId);
    setGuessId(guessId);
    setPickedSelection(optionId);
  };

  return (
    <div
      style={{
        width: "90%",
        paddingBottom: "50px",
        minHeight: "100vh",
        margin: "50px auto",
      }}
      className="zoom"
    >
      {showguesscategory && (
        <div className="page-title">
          <a type="button" onClick={() => history.goBack()}>
            <FeatherIcon icon="arrow-left" />
          </a>{" "}
          Guess Game
        </div>
      )}
      <div className={newguess?.hide}>
        <Activities key={key} stat={stat} />
      </div>
      <GuessHeader
        setGuessGames={setGuessGames}
        setShowGuessCategory={setShowGuessCategory}
        setPickOption={setPickOption}
        pickoption={pickoption}
      >
        {false && <GuessCategoryList />}{" "}
        {pickoption && guessgames?.endDateTime && (
          <Countdown
            value={guessgames?.endDateTime ? guessgames?.endDateTime  : undefined}
            onFinish={onFinish}
            valueStyle={{ color: "#cf1322" }}
          />
        )}
      </GuessHeader>

      {showguesscategory && (
        <div
          className={newguess.guesscategory_wrapper}
          style={{ padding: "20px 23px" }}
        >
          <div className={newguess.imgholder}>
            <img
              style={{ width: "80px" }}
              src={questionmark}
              alt="questionmark"
            />
          </div>

          {sessionData && (
            <div className={newguess.select}>
              Select a category to start your game now
            </div>
          )}

          <div className={newguess.categorywrapper}>
            {loading ? (
              <div
                style={{
                  justifyContent: "center",
                  marginTop: "100px",
                  width: "100%",
                  display: "flex",
                }}
              >
                <Spinner />
              </div>
            ) : sessionData ? (
              sessionData.map((guess, id) => {
                return (
                  <CatGegories
                    key={guess?.id}
                    
                    id={id}
                    guess={guess}
                    // guessCategoryId={guessCategoryId}
                  />
                );
              })
            ) : (
              <div
                style={{
                  justifyContent: "center",

                  width: "100%",
                  display: "flex",
                }}
              >
                {/* <Spinner /> */}
                <h3 style={{ fontSize: "1rem" }}>NO GUESS GAME</h3>
              </div>
            )}
          </div>
        </div>
      )}

      {pickoption && (
        <div className={newguess.answerbox}>
          <img src={questionmark} alt="questionmark" />
          {loading1 ? (
            <div className="d-flex mt-4 mb-3 justify-content-center">
              <Bspinner />
            </div>
          ) : !guessgames ? (
            <div
              style={{ color: "var(--humber-primary)" }}
              className="mb-4 mt-3"
            >
              
              QUESTIONS NOT AVAILABLE FOR THIS CATEGORY
            </div>
          ) : (
            <>
              <div className={`${newguess.answertext} mb-5 mt-4`}>
                {guessgames?.questionText}
              </div>
              {guessgames?.answerType === "FREE_TEXT" && (
                <>
                  <input
                    type="text"
                    name="answer"
                    placeholder=""
                    className={newguess.answerinput}
                    onChange={(e) =>
                      setFreeText({
                        guessId: guessgames?.id,
                        userAnswerText: e.target.value,
                      })
                    }
                  />
                  <p className={newguess.highlight}>(Type in your Guess)</p>
                  <div
                    className={`${newguess.button_wrapper} d-flex`}
                    style={{}}
                  >
                    <button
                      className={newguess.btn}
                      onClick={() => freeTextSubmit(guessgames)}
                    >
                      {loading ? <Bspinner /> : "SUBMIT GUESS"}
                    </button>
                  </div>
                </>
              )}
              {/* {JSON.stringify(guessgames)} */}
              {guessgames?.answerType === "OPTIONS" && (
                <>
                  <div className={newguess.optionswrapper}>
                    {guessgames?.guessOptionList?.map((options) => (
                      <div
                        key={options?.id}
                        style={{ cursor: "pointer" }}
                        className={`${newguess.options} ${
                          options.id === pickedSelection
                            ? newguess.activeoptions
                            : ""
                        } `}
                        onClick={() =>
                          handleOptionsPicked(
                            options?.id,
                            guessgames?.id,
                            options?.optionText
                          )
                        }
                      >
                        {options.optionText}
                      </div>
                    ))}
                  </div>
                  <div className={`${newguess.button_wrapper} d-flex`}>
                    <button
                      className={newguess.btn}
                      onClick={() => optionsSubmit()}
                      // style={{ marginLeft: "auto" }}
                    >
                      {submitAnswser ? <Bspinner /> : "SUBMIT GUESS"}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      <div
        style={{ padding: "20px 0", display: "flex", justifyContent: "center" }}
      >
        {response === 2 && (
          <div className={newguess.alreadyguessed}>
            <div className={newguess.guesserror}>
              You already made a Guess, mind trying other guesses?
            </div>
            <button className={newguess.btn}>New Guess</button>
          </div>
        )}
        {/* response === 1 */}
        {response === 1 && (
          <>
            <Modal
              dialogClassName="guessGame"
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={true}
              closeButton = {false}
            >
              <div className={newguess.alreadyguessed}>
                <img
                  src={successcheck}
                  style={{ width: "65px" }}
                  alt="successcheck"
                />
                <div className={newguess.guessmade}>Guess Recorded</div>
                <div className={newguess.guessdesc}>
                  Count down to view result{" "}
                  <Countdown
                    // timer
                    // title="Countdown"
                    value={new Date(guessgames?.endDateTime)}
                    onFinish={onFinish}
                    //  format="H 时 m 分 s 秒"
                    valueStyle={{ color: "#cf1322" }}
                  />
                </div>

                <div className={`${newguess.btnwrapper} mb-3`}>
                  <button className={newguess.smallbtn} onClick={playagain}>
                    {" "}
                    Play Again{" "}
                  </button>
                  <button
                    onClick={() => history.push("/dashboard")}
                    // onClick={() => history.push(againurl)}
                    className={`${newguess.smallbtn} ${newguess.nobtn}`}
                  >
                    {/* Play {againtext}{" "} */}
                    Quit
                  </button>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
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
    </div>
  );
};

export default NewGuess;
