import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { message } from 'antd'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import GameListing from "../../components/GameListing";
import StatsCard from "../../components/StatsCard";
import rightarrow from "../../assets/images/rightarrow.svg";
import happyman from "../../assets/images/happyman.png";
import happyman1 from "../../assets/images/happyman.svg";
import leaderboardbonusone from "../../assets/images/leaderboardbonusone.png";
import leaderboardbonustwo from "../../assets/images/leaderboardbonustwo.png";
// import questionmark from "../../assets/svg/question-mark.svg";
// import avataricon from "../../assets/svg/avataricon.svg";
// import triviaicon from "../../assets/svg/triviaicon1.png";
import questionmark from "../../assets/gulder_assets/guess_logo.png";
import avataricon from "../../assets/gulder_assets/avatar.png";
import triviaicon from "../../assets/gulder_assets/trivia.png";
import scramble from "../../assets/gulder_assets/scramble.svg";

import pinkbg from "../../assets/svg/pinkbg.svg";
import bluebg from "../../assets/svg/bluebg.svg";
import each from "./each.module.css";
import "./style.css";
import Each from "./Each";
import { tablelist } from "./list";
import Wrapper, { SectOne, SectTwo } from "../../components/Wrapper";
import ListGames from "../../components/ListGames";
import { eachgame } from "../each-game";
import EachGame from "../EachGame";
import Modal from "../../components/Modal";
import FeatherIcon from "feather-icons-react";

import ProductCard from "../../components/ProductCard";
import MyPoints from "../../components/Stack/MyPoints";
import MyMyPoints from "../../components/Stack/MyMyPoints";
import Position from "../../components/Stack/Position";
import { useQuery } from "react-query";
import { useFetchStat } from "../../utils/useFetchStat";
import { Carousel } from "antd";
import MultiCarousel from "../../components/MultiCarousel";
import Slider from "react-slick";
import redeemright from "../../assets/svg/redeem-right.svg";
import redeemleft from "../../assets/svg/redeem-left.svg";
import { isAuthenticated } from "../../utils/authdata";
import { Spinner } from "react-bootstrap";
import Activities from "../../components/Activities/activities";
import { StatsContext } from "../../context/";
import Nodata from '../../components/NoData'

const anchor = window.innerWidth <= 540 ? "mine" : "";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "transaparent",
        marginTop: "-30px",
      }}
      onClick={onClick}
    >
      <img src={redeemright} alt="right" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "transaparent",
        marginTop: "-30px",
      }}
      onClick={onClick}
    >
      <img src={redeemleft} alt="left" />
    </div>
  );
}

const settings = {
  dots: false,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const contentStyle = {
  height: "220px",
  width: "100%",
  display: "flex",
  color: "#fff",
  backgroundColor: "#364d79",
  padding: "25px",
  borderRadius: "20px",
  justifyContent: "space-between",
  alignItems: "center",
};

// const myUserId = JSON.parse(localStorage?.getItem("user"));
// const username = myUserId?.name;
// const token = myUserId?.token;
const { token, name } = isAuthenticated();
let num = 19;
var number = num.toString().split("");

const prefix = (i) => {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};
// const prefix = (x) => {
//   var number = x.toString().split("");
//   var lastIndex = number.pop();
//   if (lastIndex == 1) {
//     return `${x}st`;
//   }
//   if (lastIndex == 2) {
//     return `${x}nd`;
//   }
//   if (lastIndex == 3) {
//     return `${x}rd`;
//   } else {
//     return `${x}th`;
//   }
// };

const fetchMyPosition = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_PAYMENT_URL}/api/v1/position`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    // console.log('error from getting points: ', error)
  }
};

const LSubWrapper = ({ children }) => {
  return (
    <div
      className="leaderboard-sub-wrapper"
      style={{ minHeight: "100vh", marginBottom: "100px" }}
    >
      {children}
    </div>
  );
};

const GameCard = ({ title, img, link }) => {
  const history = useHistory();

  return (
    <div className="gamecard">
      <img
        style={{
          height: "57%",
          objectFit: "contain",
          imageRendering: "-webkit-optimize-contrast",
        }}
        src={img}
        alt={title}
      />
      <div>
        {
          title === 'Guess' ? (
            <>
            <div className="lunk" >
          {title}
        </div>
        <button className="plbtn" >
         Coming soon!
        </button>
            </>
          ) : (
            <>
            <Link className="lunk" to={link}>
          {title}
        </Link>
        <button className="plbtn" onClick={() => history.push(link)}>
          Play Now
        </button>
            </>
          )
        }
        
      </div>
    </div>
  );
};

const Leaderboard = (props) => {
  const { token, name } = isAuthenticated();
  const [loading, setLoading] = useState(false);
  const {
    state: { stat },
  } = useContext(StatsContext);

  const { userCoins, guessStats, triviaStats, userPoints } = useFetchStat();
  const [leaderBoardList, setLeaderBoardList] = useState([]);
  const { data, status } = useQuery("myPoints", fetchMyPosition, {
    staleTime: 20000,
  });
  const history = useHistory();
  //const { token } = isAuthenticated()

  const formatNumber = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
  };
  // process.env.REACT_APP_PAYMENT}/points/view-leaderboard
// process.env.REACT_APP_AUTH_URL}/api/v1/view-leaderboard`

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_PAYMENT_URL}/api/points/view-leaderboard`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);

        setLeaderBoardList(response.data.obj.content);
      })
      .catch((err) => {
        setLoading(false);
        if(err instanceof Error){
          if(err.message == "Network Error"){
            message.error('Network error, Please check your network and try again.');
          }
        }

      });
  }, []);
  return (
    <Wrapper>
      <div
        style={{
          width: "90%",
          paddingBottom: "50px",
          minHeight: "100vh",
          margin: "50px auto",
        }}
      >
        <div className="page-title">
          {" "}
          <FeatherIcon
            type="button"
            size="20px"
            onClick={() => history.goBack()}
            icon="arrow-left"
          />{" "}
          Leaderboard
        </div>

        <LSubWrapper>
          <SectOne>
            <div className="cup-holder">
              {/* <div style={{ width: "100%" }}>
              <MyPoints />
            </div> */}
              <div
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  columnGap: "2%",
                  display: "flex",
                  flexWrap: "wrap",
                }}
                // className="zoom"
              >
                <div className="game-card-wrap">
                  <h3>Games</h3>
                  <div className="wrap-games">
                    <GameCard
                      title="Guess"
                      img={questionmark}
                      link="/guess-game"
                    />
                    <GameCard
                      title="Scramble"
                      img={scramble}
                      link="/scramble"
                    />
                    <GameCard
                      title="Trivia"
                      img={triviaicon}
                      link="/trivia-game"
                    />
                  </div>
                </div>

                {/* <div style={{ width: "48%", maxHeight: "200px" }}>
                <MyMyPoints />
              </div>
              <div style={{ width: "48%" }}>
                <Position />
              </div> */}
              </div>
            </div>
            <div style={{ margin: "30px 0 10px 0" }}>
              <div
                style={{ fontSize: "19px", fontWeight: "bold", color: "#000" }}
              >
                Redeem Prizes
              </div>
              <p style={{ color: "#000" }}>
                The following prizes can be redeemed with your coin or point
              </p>
              <Link to="/rewards-prizes" style={{ color: "#000" }}>
                View All Prizes
                {/* <FeatherIcon color="var(--humber-light)" icon="cheveron-right" /> */}
                <img
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                  src={rightarrow}
                  alt="rightarrow"
                />
              </Link>
            </div>
            <MultiCarousel />
            <div className="leader-bonus">
              <Slider {...settings}>
                <div>
                  <img src={pinkbg} alt="pink bg" loading="lazy" />
                </div>
                <div>
                  <img src={bluebg} alt="blue bg" loading="lazy" />
                </div>
              </Slider>
            </div>

            <Activities pagename={"profile"} stat={stat} />
            {/* <div className="game-card-wrap">
            <h3>Games</h3>
            <div className="wrap-games">
              <GameCard title="Guess" img={questionmark} link="/guess-game" />
              <GameCard title="Avatar" img={avataricon} link="/avatars" />
              <GameCard title="Trivia" img={triviaicon} link="/trivia-game" />
            </div>
          </div> */}
          </SectOne>
          <SectTwo>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
              id={anchor}
            >
              <div
                style={{
                  fontSize: "20px",
                  padding: "0px 10px",
                  fontWeight: "600",
                  // color:'var(--humber-light)'
                }}
                id="mine"
              >
                Leaderboard
              </div>
              <div style={{ display: "flex", color: "#0A7815" }}>
                <Link to="/rewards-prizes" style={{ color: "#000" }}>
                  See Prizes
                </Link>{" "}
                {/* <img
                style={{ marginLeft: "10px", marginRight: "10px" }}
                src={rightarrow}
                alt="rightarrow"
              /> */}
                <FeatherIcon icon="chevron-right" color="#000" />
              </div>
            </div>
            <div className="sec-two table-responsive">
              {loading ?  (
                <div
                  className="leaderSpinner d-flex justify-content-center mt-5 mb-5"
                  style={{ gap: "4px", width: "100%", position: "relative" }}
                >
                  <Spinner animation="grow" size="sm" />
                  <Spinner animation="grow" size="sm" />
                  <Spinner animation="grow" size="sm" />
                </div>
              ) : (
                leaderBoardList.length > 0 ? (
                  <table className="content-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Points</th>
                  </tr>
                </thead>

                <tbody>
                  {leaderBoardList.map((list, id) => {
                    return (
                      <Each
                        each={list}
                        key={list.id}
                        username={name}
                        rank={id + 1}
                      />
                    );
                  })}
                 
                  {data?.obj > 10 && (
                    <tr
                      id="divid"
                      style={{
                        background: "#12387345",
                        color: "#fff",
                      }}
                    >
                      <>
                        <td>{prefix(data?.obj)}</td>
                        <td
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "15px",
                            textTransform: "capitalize",
                          }}
                        >
                          <div className="avatarCircle">
                            <div
                              className="init"
                              style={{ fontFamily: "Poppins" }}
                            >
                              {name?.split(" ")[0].charAt(0)}
                            </div>
                          </div>{" "}
                          &nbsp;&nbsp;{name?.split(" ")[0]}
                        </td>
                        <td style={{ fontSize: "16px" }}>
                          {formatNumber(userPoints)} pts
                        </td>
                      </>
                    </tr>
                  )}
                </tbody>
              </table>
                ) : (
                  <div>
                    <Nodata text="No data found for leaderboard" />
                  </div>
                )

              
              )}
              
            </div>
          </SectTwo>
        </LSubWrapper>
      </div>
    </Wrapper>
  );
};

export default Leaderboard;
//