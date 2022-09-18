import React from "react";
import { Link } from "react-router-dom"
import "./style.css";
import crown from "../../assets/images/crown.svg";
import exclaim from "../../assets/images/exclaim.svg";
import umbrella from "../../assets/images/umbrella.svg";
import funnel from "../../assets/images/funnel.svg";
import trophy from "../../assets/images/trophy.svg";
import diamond from "../../assets/images/diamond.svg";

const GameListing = (props) => {
  const { leaderboard } = props;
  return (
    <div className={`${leaderboard ? "game-w" : null} gameslisting`}>
      <div style={{ marginBottom: "20px", marginTop: "10px" }}>Games</div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "22px",
              alignItems: "center",
              color: "#06B4C7",
              padding: "10px",
            }}
          >
            <img src={crown} alt="crown" />{" "}
            <Link to="guess-game" style={{ marginLeft: "25px" }}>Play Guess Game</Link>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              alignItems: "center",
              color: "#06B4C7",
              padding: "10px",
            }}
          >
            <img src={trophy} alt="trophy" />{" "}
            <Link to="/trivia" style={{ marginLeft: "25px" }}>Play Trivia</Link>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              alignItems: "center",
              color: "#06B4C7",
              padding: "10px",
            }}
          >
            <img src={funnel} alt="funnel" />{" "}
            <Link to="play-scratch" style={{ marginLeft: "25px" }}>Play Scratch</Link>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "22px",
              alignItems: "center",
              color: "#06B4C7",
              padding: "10px",
            }}
          >
            <img src={exclaim} alt="exclaim" />{" "}
            <Link to="/word-puzzle" style={{ marginLeft: "25px" }}>Play Word Puzzle</Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "22px",
              alignItems: "center",
              color: "#06B4C7",
              padding: "10px",
            }}
          >
            <img src={umbrella} alt="umbrella" />{" "}
            <Link to="/word-puzzle" style={{ marginLeft: "25px" }}>Play Word Puzzle</Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "22px",
              alignItems: "center",
              color: "#06B4C7",
              padding: "10px",
            }}
          >
            <img src={diamond} alt="diamond" />{" "}
            <Link to="/word-puzzle" style={{ marginLeft: "25px" }}>Play Word Puzzle</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameListing;
