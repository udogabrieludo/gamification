import newtrivia from "./newtrivia.module.css";
import coins from "../../assets/gifs/coins.gif";
import { useHistory } from "react-router-dom";


const RightAnswer = ({ playagain, quit }) => {
  return (
    <div>
      <div className={newtrivia.response}>
        <div>
          <img
            style={{ width: "120px" }}
            className=""
            src={coins}
            alt="diamond"
          />
          <div>
            {/* You scored 10 out of 15 questions correctly, */}
            <strong className={newtrivia.response_text}  style={{ fontSize: "1rem" }}>
              {" "}
              YOU GOT IT CORRECT, YOU JUST EARNED A COIN !!!!!{" "}
            </strong>
          </div>
          <div
            style={{ gap: "42px" }}
            className="d-flex justify-content-center mt-3"
          >
            <button
              className={`${newtrivia.btn_response} btn `}
              onClick={() => {
                playagain();
              }}
            >
              next trivia
            </button>
            <button
              onClick={() => {
                quit();
              }}
              style={{
                background: "none",
                border: "1px solid var(--humber-primary)",
                color: "#000",
              }}
              className={`${newtrivia.btn_response} btn  btn-outline-primary`}
            >
              quit trivia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WrongAnswer = ({OpenSetUp,setShowModal1, playagain, quit, error, rightAnswer, }) => {
  const history = useHistory();
 
  const BuyToken = () => {
   
   
    OpenSetUp()
    setShowModal1(false);
    
  
  }
  return (
    <div className={newtrivia.response}>
      <div>
        <i
          style={{ color: "red", fontSize: "3rem" }}
          className="far mb-3 fa-times-circle"
        ></i>
        <div>
          {/* You scored 10 out of 15 questions correctly, */}

          {(error && (
            <strong
              style={{ fontSize: "1rem" }}
          
              className="text-center"
            >
             
              <span >{error}</span>
              {error === "Max Play!!" && (
                <div className={newtrivia.response_text}>You have exhausted Your TRIVIA for today.</div>
              )}
              {/* {error == "Insufficient Token(s)" && <div> {error}</div>} */}
            </strong>
          )) || (
            <strong
              style={{ fontSize: "1rem" }}
              
               className={` text-center ${newtrivia.response_text}`}
            >
              {" "}
              WRONG<br />
              Lets hope you get the next question right.
              <div>
                {" "}
                Answer :{" "}
                <span className={newtrivia.correctAnswer}>{rightAnswer}</span>
              </div>
            </strong>
          )}
        </div>
        <div
          style={{ gap: "42px" }}
          className="d-flex justify-content-center mt-4"
        >
          <button
            className={`${newtrivia.btn_response} btn `}  
            onClick={() => {
              error === "Max Play!!" ? history.push("/guess-game") : error === 'Insufficient Token(s)' ? BuyToken() : playagain();
            }}
          >
            {error === "Max Play!!" ? "Play Guess" :  error === 'Insufficient Token(s)' ? 'Buy Token' :  "Next trivia" }
          </button>

          {error !== "Insufficient Token(s)" && (
            <button
              type="button"
              onClick={() => {
                quit();
              }}
             
              style={{
                background: "none",
                border: "1px solid var(--humber-primary)",
                color: "#000",
              }}
              className={`${newtrivia.btn_response} btn  btn-outline-primary`}
            >
              quit trivia
            </button>
          )}
        </div>
      </div>
   
    </div>
  );
};

const AnserTimeOut = ({ submited = "", rightAnswer = "", playagain, quit }) => {
  
  return (
    <div className={newtrivia.response}>
      <div>
        {/* <img className="mb-3"  src={timeout} alt="diamond" /> */}
        {submited === false && (
          <i
            style={{ color: "red", fontSize: "3rem" }}
            className="far fa-times-circle"
          ></i>
        )}
        <div>
          {/* You scored 10 out of 15 questions correctly, */}
          <div
            style={{
              fontSize: "1rem",
              marginTop: ".8rem",
              fontWeight: "600",
            }}
            className={` text-center ${newtrivia.response_text}`}
            
          >
            {!submited ? "Time out " : "You lost"}
          </div>
          {/* <div>Answer : <span className={newtrivia.correctAnswer}>{rightAnswer}</span></div> */}
        </div>
        <div
          style={{ gap: "42px" }}
          className="d-flex justify-content-center mt-3"
        >
          <button
            className={`${newtrivia.btn_response} btn `}
            onClick={() => {
              playagain();
            }}
          >
            next trivia
          </button>
          <button
            onClick={() => {
              quit();
            }}
            style={{
                background: "none",
                border: "1px solid var(--humber-primary)",
                color: "#000"
              }}
            className={`${newtrivia.btn_response} btn  btn-outline-primary`}
          >
            quit trivia
          </button>
        </div>
      </div>
    </div>
  );
};

export { AnserTimeOut, WrongAnswer, RightAnswer };
