import React from "react";
import { Link } from "react-router-dom"
import "./each-game.css";

const EachGame = ({ each }) => {
  return (
    <div key={each.id} className="eacher">
      <img
        src={each.image}
        alt={each.name}
        style={{ width: "20px", height: "20px" }}
      />
      <Link to={each.link} style={{ color: each.color, marginLeft: "20px", fontSize: '16px', fontWeight: '500'}}>{each.name}</Link>
    </div>
  );
};

export default EachGame;