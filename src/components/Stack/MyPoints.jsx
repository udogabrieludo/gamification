import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import points from "./points.module.css";

import avatarred from "../../assets/images/avatarred.svg";
import triviagreen from "../../assets/images/triviagreen.svg";
import predictionbox from "../../assets/images/predictionbox.svg";

import positiondown from "../../assets/svg/positiondown.svg";
import correctrightarrow from "../../assets/svg/correctrightarrow.svg";
import coin from "../../assets/images/coin.svg";
import { useFetchStat } from "../../utils/useFetchStat";
import { useMyFetchStuffs } from "../../utils/taofikFetch"
import Spinner from "../../components/Spinner";
import './mycoins.css'

const MyPoints = () => {
  const {data, status} = useMyFetchStuffs()
  const { userCoins ,  guessStats,
    triviaStats } = useFetchStat();
    const history = useHistory()
    
  // console.log('on the points component', userCoins)


  return (
    <>
      <div
        className={`${points.stackcard} ${points.mypoints}`}
        style={{ width: "100%", height: "100%" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "5px 0",
          }}
        >
          <Link to="/transactions?type=coins" className={points.pointstitle}>My Coins</Link>
          <img src={coin}  alt="coin" className="coinright" />
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginLeft: "18px", gap: "5px" }}
        >
          <div type="button" onClick={()=>{
            history.push("/transactions?type=coins")
          }} style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{ fontSize: "46px", color: "var(--humber-primary)", fontWeight: "bold" }}
            >
              {/* {(userCoins && userCoins) || 0} */}
              {status === 'success' ?  data?.mycoins : <Spinner cz="20px" />}
            </div>
            <div
              style={{ fontSize: "12px", color: "var(--humber-primary)", marginTop: "-10px" }}
            >
              coins
            </div>
          </div>
          <div
            className="mt-2"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontSize: "16px",
            }}
          >
            <div>
             
              <div className="dot bg-danger"></div>{" "} &nbsp;
              <Link style={{ color: "var(--humber-primary)"}} to="/avatars">
               
              Avatar
              </Link>
            </div>
            <div>
              <div className="dot bg-success"></div>{" "} &nbsp;
              <Link style={{ color: "var(--humber-primary)"}} to="/trivia-game">
                Trivia
              </Link>
            </div>
            <div>
             
              <div className="dot bg-info"></div>{" "} &nbsp;
              <Link style={{ color: "var(--humber-primary)"}} to="/guess-game">
                Guess
              </Link>
            </div>
          </div>
          <div
            className="mt-2"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontSize: "16px",
              marginRight:'-69px'
            }}
          >
            <div>
            <small className={points.small}>Wins: </small>0
            </div>
            <div>
            <small className={points.small} type="button" onClick={()=>{history.push('/history')}}>Wins: </small><span className={points.small}>{triviaStats ? triviaStats.win :0}</span> 
            </div>
            <div>
            <small className={points.small} type="button" onClick={()=>{history.push('/history')}}>Wins: </small><span className={points.small}> {guessStats ? guessStats.win : 0}</span>
            </div>
          </div>

          <div style={{ color: "#000", fontSize: "16px", fontWeight: 500 }}>
            {/* Buy coins <img src={correctrightarrow} alt="right-arrow" /> */}
          </div>
        </div>
        <div>
          {/* <div 
                    className={points.pointstitle}
                    >My Points</div> */}
          {/* <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 0 10px 0",
                            minWidth: "200px",
                        }}
                        >
                        <div style={{ display: "flex" }}>
                            <img src={avatarred} alt="avatarred" />
                            <div style={{textTransform: 'capitalize', color: "#A3A3A3", fontSize: "16px", marginLeft: "15px" }}>
                            avatar
                            </div>
                        </div>
                        <div>0 pts</div>
                        </div> */}
          {/* <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 0 10px 0",
                            minWidth: "200px",
                        }}
                        >
                        <div style={{ display: "flex" }}>
                            <img src={triviagreen} alt="triviagreen" />
                            <div style={{textTransform: 'capitalize', color: "#A3A3A3", fontSize: "16px", marginLeft: "15px" }}>
                            trivia
                            </div>
                        </div>
                        <div>0 pts</div>
                        </div> */}
          {/* <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 0 10px 0",
                            minWidth: "200px",
                        }}
                        >
                        <div style={{ display: "flex" }}>
                            <img src={predictionbox} alt="predictionbox" />
                            <div style={{textTransform: 'capitalize', color: "#A3A3A3", fontSize: "16px", marginLeft: "15px" }}>
                            prediction
                            </div>
                        </div>
                        <div>0 pts</div>
                        </div> */}
        </div>
      </div>
    </>
  );
};

export default MyPoints;
