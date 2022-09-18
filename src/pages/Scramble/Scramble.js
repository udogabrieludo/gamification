import React, { useState} from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import Scrambleheader from "./ScrambleHeader";

import scramble from "./scramble.module.css";

import scramble_logo from "../../assets/gulder_assets/scramble.svg";

import Countdown from "antd/es/statistic/Countdown";
import Spinner2 from "react-bootstrap/Spinner";

import { isAuthenticated } from "../../utils/authdata";
import TriviaSection from "./scramble_section";
// import Activities from "../../components/Activities/activities";

import { Modal } from "react-bootstrap";
import { message } from "antd";
import Spinner from "../../components/Spinner";
import coins from "../../assets/gifs/coins.gif";
import coinsSound from "../../assets/sound/coinSound.mp3";
import lostSound from "../../assets/sound/lostSound.wav";


import {
  Wrapper,
  QuestionBox,
  Rowwrapper,
  Letterbox,
  SelectedBox,
} from "./scramble_style";

// spinner for answer submittion
const Bspinner = () => {
  return (
    <Spinner2 animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner2>
  );
};


const WordSramble = () => {
  const { token } = isAuthenticated();
  const history = useHistory();
  const [showScramble, setShowScramble] = useState(true);

  const headers = {
    Authorization: token,
  };
  const [word, setWord] = useState("");
  const [ wordCheck, setWordCheck] = useState("")
  const [unscramble, setUnscramble] = useState("");
  const [timer, setTimeout] = useState(1000);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [answered, setAnswered] = useState(false);
  const timeVal = 30000
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    type: "",
  });
  const [id, setId] = useState();
  const sound = new Audio(coinsSound);
  const LostSSound = new Audio(lostSound);


  const removeLetter = (word, index) => {
    setWord((textWord) => textWord + word);
    let array = unscramble.split("");

    if (index > -1) {
      array.splice(index, 1);
    }
    
    setUnscramble(array.join(""));
    // setUnscramble((scramble) => scramble + word);
  };
  const AddLetter = (words, index) => {
    setWord("");
    let array = word.split("");

    if (index > -1) {
      array.splice(index, 1);
    }

    setWord(array.join(""));
    setUnscramble((scramble) => scramble + words);
  };


  const onFinish = (bol) => {
    if (!answered) {
      let message = {
        type: "failed",
        message: "Timeout",
      };
      setResponseMessage({ ...message });
      setShowModal(true);
    }
  
  };
  const PlayScramble = async () => {
    setAnswered(true);
    setTimeout(0);
    setLoading1(true);
    const payload = {
      userAnswerText: unscramble,
      crosswordId: id,
    };
    

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_GUESS_GAME_URL}/crossword-game-answer`,
        payload,
        { headers }
      );

      setLoading1(false);
      setShowModal(true);
      
      if (data?.obj?.wasCorrectAnswer === "YES") {
        sound.play();
        
        let message = {
          type: "success",
          message: `<strong>Correct</strong>  <br />  ${data?.obj?.coinAward} coin(s) Awarded`,
        };
        setResponseMessage({ ...message });
      }
    } catch (error) {
   
      setLoading1(false);
      if (error instanceof Error) {
        if (error.message === "Network Error") {
          message.error("Network error, please check your network");
        }
      }

      if (error.response) {
        if (error.response.status === 400) {
          LostSSound.play();
         
          let message = {
            type: "failed",
            message: error.response.data.obj[0].message,
          };
          setResponseMessage({ ...message });
          setShowModal(true);
        } else if (error.response.status === 401) {
          message.error(error.response.data.desc);
        } else if(error.response.status === 413) {
          
          let message = {
            type: "failed",
            message: error.response.data.obj[0].message,
          };
          setResponseMessage({ ...message });
          setShowModal(true);
          
        } else {
          message.error(error.response.data.desc);
        }
      }
    }
  };

  const playNext = () => {
    if(responseMessage?.message === 'Not Enough Token'){
      history.push('/dashboard')
    }else{
      getUplayScramble();
    setShowModal(false);
    setAnswered(false);
    }
    
  };
  const getUplayScramble = async () => {
    setUnscramble("");
   
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_GUESS_GAME_URL}/crossword-game/unplayed-random`,
        { headers }
      );
      setLoading(false);
        
      const scramble = data?.obj;
        
      if (scramble?.crossWordGame?.scrambledText.length > 0) {
        setWord(scramble?.crossWordGame?.scrambledText);
        setWordCheck(scramble?.crossWordGame?.scrambledText)
        setId(scramble?.crossWordGame?.crosswordId);
        setTimeout(Date.now());
      }else{
        setWord(null)
        setWordCheck(null)
      }
    } catch (error) {
      setLoading(false);
      if (error.message) {
        if (error.message === "Network Error") {
          message.error("Network error, please try again");
        }
      }

      console.log(error.response.response)
      if(error.response){
        if(error.response.status === 400) {
           
            let message = {
              type: "failed",
              message: error.response.data.obj[0].message,
              variant:'Not Enough'
            };
            setResponseMessage({ ...message });
            setShowModal(true);
        }
      }

     
    }
  };

  const styles = {
    background:
      "radial-gradient(76.04% 76.04% at 42.16% 75%, rgb(255 226 181) 28.13%, rgb(208 119 1) 99.97%)",
  };

  const cancel = {
    position: "absolute",
    fontSize: "19px",
    height: "22px",
    color: "red",
    top: "-11px",
    right: "-5px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "20px",
    borderRadius: "10px",
    backgroundColor: "red",
  };

  return (
    <Wrapper>
      <Modal
      // showModal
        show={showModal}
        backdrop="static"
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className={scramble.response}>
            <div>
              <div>
                {responseMessage?.type === "success" && (
                  <img
                    style={{ width: "120px", marginTop: "-49px" }}
                    className=""
                    src={coins}
                    alt="diamond"
                  />
                )}

                {responseMessage?.type === "failed" && (
                  <i
                    style={{ color: "red", fontSize: "3rem" }}
                    className="far fa-times-circle"
                  ></i>
                )}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  marginTop: ".8rem",
                  marginBottom: ".8rem",
                  fontWeight: responseMessage?.type !== "success" ? 600 : null,
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: responseMessage?.message }}
                ></div>
              </div>
              <Rowwrapper className={scramble.buttonRow} style={{ gap: "29px" }}>
                <button
                  onClick={playNext}
                  className={`btn  ${scramble.btn_response}`}
                >
                  {responseMessage?.message === 'Not Enough Token' ? 'Quit' :' Next scramble' }
                </button>
                
                {
                  responseMessage?.message !== 'Not Enough Token' && (
                    <button
                  onClick={() => history.push("/dashboard")}
                  className={`btn ${scramble.btn_quit} ${scramble.btn_response}`}
                >
                  Quit scramble
                </button>
                  )
                }
              </Rowwrapper>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Scrambleheader>
        {!showScramble && (
          <div style={{ position: "sticky", top: "0px" }}>
            <Countdown
              value={timer + timeVal}
              onFinish={() => onFinish(true)}
              valueStyle={{ color: "#cf1322" }}
            />
          </div>
        )}
      </Scrambleheader>
      {showScramble && (
        <div className="mt-3 scrable-game-box">
          <TriviaSection
          timeVal={timeVal}
            setShowScramble={setShowScramble}
            getUplayScramble={getUplayScramble}
          />
        </div>
      )}

      {!showScramble && (
        <QuestionBox>
          <img src={scramble_logo} alt="questionmark" />
          {false ? (
            <div className="d-flex mt-4 mb-3 justify-content-center">
              <Bspinner />
            </div>
          ) : false ? (
            <div className="mb-4 mt-3">
              Questions not available for this category
            </div>
          ) : (
            <>
              {(unscramble.length > 0 && (
                <div
                  style={{
                    color: "#c86a02",
                    fontWeight: 900,
                    fontSize: "28px",
                  }}
                  className={`${scramble.answertext} mb-2 mt-4`}
                >
                  {unscramble}
                </div>
              )) || (
                wordCheck?.length > 0 && (
                  <div className={`${scramble.answertext} mb-2 mt-4`}>
                  Unscrambe the Word:
                </div>
                )
              )}

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
              ) : (
                <>
                  {wordCheck?.length > 0 ? (
                    <>
                      <Rowwrapper style={{ flexWrap: "wrap" }}>
                        {word?.split("")?.map((character, i) => (
                          <Letterbox
                            role="button"
                            onClick={() => AddLetter(character, i)}
                            key={i}
                          >
                            <span>{character}</span>
                          </Letterbox>
                        ))}
                      </Rowwrapper>
                      {unscramble.length > 0 && (
                        <SelectedBox className="mb-4">
                          {unscramble?.split("")?.map((word, i) => (
                            <Letterbox
                              key={i}
                              role="button"
                              onClick={() => removeLetter(word, i)}
                              height={"45px"}
                              width={"45px"}
                              style={{ margin: 0, ...styles }}
                            >
                              <span
                                style={{ fontSize: "1rem",color: "#653906"  }}
                             
                              >
                                {word}
                              </span>
                              <div style={{ ...cancel }}>
                                <span style={{ fontSize: "1rem" }}>x</span>
                              </div>
                            </Letterbox>
                          ))}
                        </SelectedBox>
                      )}
                      <Rowwrapper>
                        <button
                          style={{
                            backgroundColor: !unscramble ? "#f4680082" : null,
                          }}
                          disabled={!unscramble}
                          onClick={PlayScramble}
                          className={scramble.btn}
                        >
                          {loading1 ? <Bspinner /> : "SUBMIT "}
                        </button>
                      </Rowwrapper>
                    </>
                  ) : (
                    <div
                      style={{
                        margin:'17px 0 0',
                        
                        padding: "12px",
                      }}
                    >
                      <div style={{color:'#3d3d3d'}} className={scramble.nodata} >
                        NO SCRAMBLE WORD
                        <br /> 
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </QuestionBox>
      )}
    </Wrapper>
  );
};

export default WordSramble;
