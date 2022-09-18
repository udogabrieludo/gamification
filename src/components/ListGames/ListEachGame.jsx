import React from "react";
import "./each-game.css";

const ListEachGame = ({ each }) => {
  return (
    <div key={each.id} className="eacher">
      <img
        src={each.image}
        alt={each.name}
        style={{ width: "50px", height: "50px" }}
      />
      <div style={{ color: each.color, marginLeft: "20px", fontSize: '16px', fontWeight: '500'}}>{each.name}</div>
    </div>
  );
};

export default ListEachGame;
