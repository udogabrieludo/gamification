import React, { useState, useEffect, useContext } from "react";
import newtrivia from "./newtrivia.module.css";

import Stack from "../../components/Stack";
import TriviaCategory from "../../components/TriviaCategory";

import TriviaHeader, { TriviaTimer } from "../../components/TriviaHeader";

// import triviaicon from "../../assets/svg/triviaicon1.png";
import triviaicon from "../../assets/gulder_assets/trivia.png";
import TopModal from "../../components/Modal";

import diamond from "../../assets/svg/diamond.svg";
import axios from "axios";
import { Modal, Spinner } from "react-bootstrap";
import Countdown from "antd/es/statistic/Countdown";
import { useHistory } from "react-router-dom";
import "./trivia.css";
import coins from "../../assets/sound/coinSound.mp3";
import lostSound from "../../assets/sound/lostSound.wav";
import { isAuthenticated } from "../../utils/authdata";
import Payments from "../../components/Payments";
import { useFetchStat } from "../../utils/useFetchStat";
import Activities from "../../components/Activities/activities";
import { StatsContext } from "../../context/";
import FeatherIcon from "feather-icons-react";
import Modalb from "../../components/Modal";

import { AnserTimeOut, WrongAnswer, RightAnswer } from "./responses.jsx";

const NewTrivia = () => {
  const {
    state: { stat },
  } = useContext(StatsContext);
  const tokenObj = JSON.parse(localStorage.getItem("user")) || "";
  const [questions, setQuestions] = useState({});
  const [selected, setSelected] = useState(false);
  const [optionSelected, setSelectedOption] = useState();
  const [correctAnswer, setCorrect] = useState();
  // this hooks checkes wedaa use submitted an answer or not
  const [submited, setSubmitted] = useState(false);
  const history = useHistory();

  //
  const [random, setRandom] = useState();
  const [response, setReponse] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showTrivia, setshowTrivia] = useState(false);
  const [loading, SetshowLoading] = useState(false);
  const [loading2, SetshowLoading2] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const [error, setError] = useState(null);
  const [correctOptionText, setOptionText] = useState("");
  const [correct, setCorrectAnser] = useState("");
  const [amountAdded, setAmmountAdded] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [topUp, setTopUp] = useState(false);


  // set timer for count down
  const [timer, setTimer] = useState(10000);
  const sound = new Audio(coins);
  const LostSSound = new Audio(lostSound);
  const { token } = isAuthenticated();

  const [resonseModal, setResponseModal] = useState(false);
  const [myToken, SetMyToken] = useState("");
  // const useFetchStat = useFetchStat()
  /// this sets the qeustion box tru or false
  const [question, showQuestions] = useState(false);
  const [key, setKeyvalue] = useState(1);

  const fetchUserStat = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_AUTH_URL}/api/v1/user-stat`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      SetMyToken(response?.data?.TOKEN);
      
    } catch (error) {
     
    }
  };

  const headers = {
    Authorization: token,
  };
  const OpenSetUp = (event) => {
   
    setTopUp(true);
  };
  const onFinish = () => {
    // this pops up to show that the user did not submit any answer
    if (submited == false) {
      setShowModal1(true);
    }
    // SetshowLoading2(false);
    
  };

  const submitTrivia = () => {
    const { token } = isAuthenticated();
    const headers = {
      Authorization: token,
    };

    setCorrectAnser("");
    SetshowLoading2(true);
  
    const options = questions.triviaOptionList;

    const correctAnswer = options.find(
      (anser) => anser.isCorrectAnswer == "YES"
    );

    if (optionSelected) {
      const payload = {
        triviaId: questions.id,
        userAnswerText: optionSelected.optionText,
        optionId: optionSelected.id,
      };
     
      setSubmitted(true);
      setTimer(0);
      axios
        .post(
          `${process.env.REACT_APP_GUESS_GAME_URL}/trivia-game-answer`,
          { ...payload },
          { headers }
        )
        .then((res) => {
          // // set submitted to true
          // setSubmitted(true);
          // const istrue = res?.data?.obj?.wasCorrectAnswer;
          // console.log(res)
          // setCorrectAnser(istrue)
          // setShowModal1(true)
          // // set timer for the question
          // SetshowLoading2(false);
          // setReponse();
          // console.log(res);
          // setCorrect(true);

          setSelectedOption("");
          setShowModal1(true);
          setCorrect(true);
          SetshowLoading2(false);
          setSubmitted(true);
          const isTrue = res?.data?.obj.wasCorrectAnswer;
          if (isTrue == "YES") {
            sound.play();
            setKeyvalue((key) => key + 1);

            setCorrectAnser("YES");
          } else if (isTrue == "NO") {
            LostSSound.play();
            setCorrectAnser("NO");
            setKeyvalue((key) => key + 1);
          }
        })
        .catch((error) => {
          setSelectedOption("");
          SetshowLoading2(false);
          
          if (error.response) {
            if (error.response.status == 413) {
              setSubmitted(true);
              setError("Max Play!!");
              setShowModal1(true);
              setTimer(0);
            }
            if (error.response.status == 400) {
              setSubmitted(true);
              setError("Insufficient Token(s)");
              setShowModal1(true);
              setTimer(0);
            }
            if (error.response.status == 500) {
              setSubmitted(true);
              setError(
                "Internal server error occured, While trying to submitted your answer"
              );
              setShowModal1(true);
              setTimer(0);
            }
          }
        });
    } else {
      SetshowLoading2(false);
      setShowModal(true);
      return;
    }
  };

  const playagain = () => {
    GetTrivias();
   
    setShowModal1(false);
    showQuestions(false);
    // setSubmitted(false);
    setCorrect(false);
    setSelected(false);
    setKeyvalue((key) => key + 1);
  };
  const quit = () => {
    history.push("/dashboard");
    setKeyvalue((key) => key + 1);
  };

  const GetTrivias = async () => {
    const { token } = isAuthenticated();

    const headers = {
      Authorization: token,
    };

    setError(null);
    SetshowLoading(true);
    setCorrectAnser("");
    setOptionText("");

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_GUESS_GAME_URL}/trivia-game/unplayed-random`,
        { headers }
      );

      const trivia = data?.obj?.triviaGame;
        //const trivia = ''
      setQuestions(trivia);
      SetshowLoading(false);
      showQuestions(true);
      setSubmitted(false);

      const options = trivia?.triviaOptionList;
    
      const correctAnswer = options?.find(
        (anser) => anser.isCorrectAnswer == "YES"
      );
    
      setOptionText(correctAnswer?.optionText);
      if (!trivia) {
        setTimer(0);
        return;
      }
      setTimer(Date.now());
    } catch (error) {
      SetshowLoading(false);
      showQuestions(false);
      if (error.message) {
        if (error.message == "Network Error") {
          setError("Connect Error Please Try restart Your Browser");
        }
      }
      
      if(error.response) {
        if(error.response.status === 400){
        
          setError("Insufficient Token(s)");
          
          setShowModal1(true);
          setSubmitted(true);
        }
      }

    }
  };
  //kkkk
  useEffect(() => {
    // GetTrivias();
    fetchUserStat();
  }, []);

  const SelectOption = (option) => {
    
    setSelected(option.id);
  };
  return (
    <div
      style={{
        width: "90%",
        paddingBottom: "50px",
        minHeight: "100vh",
        margin: "50px auto",
        position: "relative",
      }}
      className="zoom"
    >
      {" "}
      <div className="page-title">
        <a type="button" onClick={() => history.goBack()}>
          <FeatherIcon icon="arrow-left" />
        </a>{" "}
        Trivia Game
      </div>
      <div className={newtrivia.hide}>
        <Activities key={key} stat={stat} />
      </div>
      {/* time section starts */}
      <div className={!question ? newtrivia.wrapper : ""}>
        <TriviaHeader question={question}>
          {question && (
            <div style={{ position: "fixed", right: "58px" }}>
              <Countdown
                value={timer + 20000}
                onFinish={onFinish}
                valueStyle={{ color: "#cf1322" }}
              />
            </div>
          )}
        </TriviaHeader>
        {/* time section ends */}
        {!showTrivia && (
          <div style={{ marginTop: "5px" }}>
            <TriviaCategory
            
              myToken={myToken}
              GetTrivias={GetTrivias}
              showTriviabox={setshowTrivia}
              fetchTrivial={GetTrivias}
              ps={true}
            />
          </div>
        )}
      </div>
      {/* modals section  */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert mb-4">
            <div className="d-flex justify-content-center">
              <div style={{ color: "#000" }}>PLEASE SELECT AN OPTION</div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* showModal1 */}
      <Modal
        show={showModal1}
        backdrop="static"
        onHide={() => setShowModal1(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {error == "Insufficient Token(s)" && (
          <Modal.Header closeButton></Modal.Header>
        )}
        <Modal.Body>
          {error && (
            <WrongAnswer
              OpenSetUp={OpenSetUp}
              setShowModal1={setShowModal1}
              error={error}
              playagain={playagain}
              quit={quit}
            />
          )}
          {correct == "NO" && (
            <WrongAnswer
              rightAnswer={correctOptionText}
              error={error}
              playagain={playagain}
              quit={quit}
            />
          )}
          {!submited && (
            <AnserTimeOut
              submited={submited}
              rightAnswer={correctOptionText}
              playagain={playagain}
              quit={quit}
            />
          )}
          {correct == "YES" && (
            <RightAnswer playagain={playagain} quit={quit} />
          )}
        </Modal.Body>
      </Modal>
      {/* modal end */}
      {question && (
        <div className={newtrivia.answerbox}>
          <img
            style={{ height: "44px", imageRendering: "pixelated" }}
            src={triviaicon}
            alt="questionmark"
          />
          {
            questions?.questionText && (
              <div className={`${newtrivia.answertext} mb-5 mt-5`}>
            {questions?.questionText}
          </div>
            )
          }
         
          <div className={newtrivia.optionswrapper}>
            {questions?.triviaOptionList?.map((option) => {
              return (
                <div
                  type="button"
                  disabled
                  onClick={() => {
                    setSelected(option.id);
                    setSelectedOption(option);
                    
                  }}
                  key={option.id + "option"}
                  className={` ${
                    option.isCorrectAnswer == "YES" && correctAnswer
                      ? "trivia_success"
                      : `${
                          selected == option.id &&
                          option.isCorrectAnswer == "NO" &&
                          correctAnswer
                            ? "trivia_failed"
                            : ""
                        }`
                  }   ${newtrivia.options} ${
                    selected == option.id ? "bg_selected" : " "
                  }`}
                >
                  {option.optionText}
                </div>
              );
            })}
          </div>
          {questions ? (
            <div
              style={{
                display: "flex",
              }}
            >
              <button
                onClick={submitTrivia}
                className={newtrivia.btn}
                style={{ margin: "auto", width: "50%" }}
              >
                {loading2 ? <Spinner animation="grow" /> : "SUBMIT"}
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
              }}
            >
              <button
                className={`${newtrivia.btn} ${newtrivia.btn1}`}
                style={{ margin: "auto", width: "50%" }}
              >
                NO QUESTION FOUND
                {/* <span className="win_more">Win More</span> */}
              </button>
            </div>
          )}
        </div>
      )}
      {error == "Connect Error Please Try restart Your Browser" || error == 'Insufficient Token(s)' && (
        <>
          <div className="mt-4  d-flex justify-content-center  alert alert-danger">
            {error}
          </div>
          {/* <div className="mt-3 d-flex justify-content-center">
            <button onClick={GetTrivias} className="btn btn-primary">
              Refresh
            </button>
            
          </div> */}
        </>
      )}
      {loading && (
        <div className="d-flex justify-content-center" style={{ gap: "3px" }}>
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      )}
      {topUp && (
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
      )}
    </div>
  );
};

export default NewTrivia;
