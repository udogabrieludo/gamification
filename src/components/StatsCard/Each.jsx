import React from "react";

const Each = ({points, myname, icon}) => {

  return (
    <div
    // key={each.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 0 10px 0",
        minWidth: "200px",
      }}
    >
      <div style={{ display: "flex" }}>
        <img src={icon} alt="avatarred" />
        <div style={{textTransform: 'capitalize', color: "#A3A3A3", fontSize: "16px", marginLeft: "15px" }}>
          {myname}lop
        </div>
      </div>
      <div>{points}pts</div>
    </div>
  );
};

export default Each;
