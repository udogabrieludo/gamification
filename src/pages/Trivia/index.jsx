import React from "react";

import "./style.css";

// import Wrapper, { SubWrapper } from "../../components/Wrapper";

const Trivia = () => {
  return (
    // <Wrapper>
    //   <SubWrapper>

    //   </SubWrapper>
    // </Wrapper>
    <div
      style={{
        minHeight: "100vh",
        marginBottom: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "blue",
          fontSize: "80px",
          fontStyle: "italic",
          marginTop: "-150px",
        }}
      >
        Trivia Games Coming Soon
      </div>
    </div>
  );
};

export default Trivia;
