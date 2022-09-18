import React, { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import Stack from "../../components/Stack";
import dashboard from "./dashboard.module.css";
// import questionmark from '../../assets/gulder_assets/guess_logo.png'
import avataricon from '../../assets/gulder_assets/avatar.png'
import triviaicon from '../../assets/gulder_assets/trivia.png'
import avataricon from "../../assets/images/avatar.svg";
import triviaicon from "../../assets/images/triviaicon1.png";
import questionmark from "../../assets/images/guess-1.svg";
import scramble from "../../assets/gulder_assets/scramble.svg";
import {
  Card,
  CardBody,
  RowContent,
  PositionWrapper,
} from "../../components/Activities/activities_styles";
import FeatherIcon from "feather-icons-react";

import Layout from "../../components/Layout";
import IdleTimer from "react-idle-timer";
import ReactTooltip from "react-tooltip";

import Activities from "../../components/Activities/activities";
import { signout } from "../../utils/authdata";
import { StatsContext } from "../../context/";
import { useFetchStat } from "../../utils/useFetchStat";
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const {
    state: { stat, account, loading },
  } = useContext(StatsContext);



  // React.useEffect(()=>{
  //   throw new Error()
  // })
 
  const history = useHistory();
  const idleTimerRef = useRef();
  const logout = () => {
    signout(() => {
      history.push("/");
    });
  };
  useFetchStat();

  return (
    <IdleTimer ref={idleTimerRef} timeout={1000 * 60 * 15} onIdle={logout}>
      <Layout>

      {
        loading ? (
          null
        ) : (
          <>
          { account?.length == 0 && (
        <div className="alert alert-warning text-center text-bold">
          {" "}
          <FeatherIcon icon="alert-circle" /> You need to update your bank
          account click  <Link style={{color: '#40a9ff'}} to="/profile" > here</Link>
        </div>
      )}
          </>
        )
      }
      
        
        <div
          className="zoom"
          style={{
            width: "90%",
            paddingBottom: "50px",
            minHeight: "100vh",
            margin: "50px auto",
          }}
        >
          <div className="page-title">Dashboard</div>
          <Activities stat={stat} />
          {/* <Stack /> */}
          {/* <div classNamw="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">

            </div>
          </div>
        </div>
      </div> */}
          <div className={dashboard.cardwrapper}>
          <div className={dashboard.card}>
          <img src={avataricon} className={`${dashboard.cardimg}`}  alt="questionmark" />
          <div className={` ${dashboard.text} ${dashboard.avatartext}`}>
            Raffle
          </div>
         
           {/* <div className={`${dashboard.description }`}>
           Select Avatars of your choice to represent you
             </div>  */}
          <button  className={dashboard.btn}  
          // onClick={() => history.push("/avatars")}
          >
            Coming Soon
          </button>
        </div>

            <div className={dashboard.card}>
              <img
                type="button"
                data-tip
                data-for="guess"
                className={`${dashboard.cardimg}`}
                src={questionmark}
                alt="questionmark"
              />
              <div className={`${dashboard.text} ${dashboard.guesstext} `}>
                Guess Game
              </div>
              <div className={dashboard.description}>
                {/* Put a stake on your favourite Events. */}
                
              </div>
              {/* onClick={() => history.push("/guess-game")} */}
              <button
                className={dashboard.btn}
               
              >
                Coming soon!
              </button>

              <ReactTooltip id="guess" type="warning" effect="solid">
                <p style={{ width: 250, marginTop: 15 }}>
                  Make a Guess on a specific event per category and win up to{" "}
                  <strong>N500,000 </strong> naira if your guess is correct.
                </p>
              </ReactTooltip>
            </div>
            <div className={dashboard.card}>
              <img
                src={triviaicon}
                className={`${dashboard.cardimg}`}
                alt="questionmark"
                type="button"
                data-tip
                data-for="trivia"
              />
              <div className={`${dashboard.text} ${dashboard.triviatext} `}>
                Trivia
              </div>
              <div className={dashboard.description}>
                Prove you are a Genius
              </div>
              <button
                onClick={() => history.push("/trivia-game")}
                className={dashboard.btn}
              >
                Play Now
              </button>
              <ReactTooltip id="trivia" type="warning" effect="solid">
                <p style={{ width: 250, marginTop: 15 }}>
                  This game tests your ability to respond quickly. Coins and
                  Points are awarded for every correct answer. Players are
                  eligible to win up to <strong>N100,000</strong> naira.
                </p>
              </ReactTooltip>
            </div>
            <div className={dashboard.card}>
              <img
                style={{ width: "50px" }}
                src={scramble}
                className={`${dashboard.cardimg}`}
                alt="questionmark"
                type="button"
                data-tip
                data-for="scramble"
              />
              <div className={`${dashboard.text} ${dashboard.triviatext} `}>
                Scramble
              </div>
              <div className={dashboard.description}>Test your Speed!</div>
              <button
                onClick={() => history.push("/scramble")}
                className={dashboard.btn}
              >
                Play Now
              </button>
              <ReactTooltip id="scramble" type="warning" effect="solid">
                <p style={{ width: 250, marginTop: 15 }}>
                  Unscramble words as fast as possible and grab up to{" "}
                  <strong>N50,000</strong> naira
                </p>
              </ReactTooltip>
            </div>
          </div>
        </div>
      </Layout>
    </IdleTimer>
  );
};

export default Dashboard;
