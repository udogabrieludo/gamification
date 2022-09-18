import React from "react";
import { eachgame } from "./list";
import "./style.css";
import EachGame from "../../pages/EachGame";

const index = ({ children }) => {
  return (
    <>
      <div className="dom-wrap">
        {children}
        <div style={{ marginTop: "10px" }}>Games</div>
        <div
          style={{
            display: "flex",
            margin: "28px 0 28px 0",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {eachgame.map((each) => (
            <EachGame each={each} />
          ))}
        </div>
      </div>
    </>
  );
};

export default index;
