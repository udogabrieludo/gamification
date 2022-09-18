import React from "react";
import { Link } from "react-router-dom";
import eachhistory from "./eachhistory.module.css";
import onestyle from "./one.module.css";
import loner from "./loner.module.css";
import mercy from "../../assets/images/mercy.svg";
import avatarratings from "../../assets/svg/avatarratings.svg";
import { getPositionInWords } from "../../utils/utils";

function Loner({ title, pts, bg }) {
  return (
    <div className={loner.loner} style={{ backgroundColor: bg }}>
      {title} ({pts})
      <div className={eachhistory.upperballone}>
        <div>+{pts}</div>
      </div>
    </div>
  );
}
function One({ position }) {
  return (
    <div
      className={onestyle.one}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontWeight: 500,
          fontSize: "32px",
        }}
      >
        {position}
        <span>{getPositionInWords(position)}</span>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginTop: "-20px" }}
      >
        <img src={mercy} alt="timidakolo" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "20px",
          }}
        >
          <div style={{ fontSize: "19px", fontWeight: "500" }}>
            Yerins
            <img src={avatarratings} alt="avatar-ratings" title="rating" />
            <img src={avatarratings} alt="avatar-ratings" title="rating" />
            <img src={avatarratings} alt="avatar-ratings" title="rating" />
          </div>
          <div style={{ color: "#A3A3A3" }}>Contestant 22</div>
        </div>
      </div>
      <div style={{ margin: "20px 0 10px 0", fontSize: "14px" }}>
        <Loner title="Socials" pts="10" bg="#E6F2E8" />
        <Loner title="Creativity" pts="12" bg="#e6bcbc" />
        <Loner title="Tasks" pts="12" bg="#e6bcbc" />
        <Loner title="Survival" pts="12" bg="#E6F2E8" />
      </div>
    </div>
  );
}

const AvatarHistory = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: "20px",
        marginBottom: "100px",
        width: "85%",
        margin: "100px auto",

      }}
      className="zoom"
    >
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          margin: "30px 0",
        }}
      >
        <div className={eachhistory.yesterday} >
          Yesterday's Avatar Result
        </div>
        <Link
          to="/rewards-prizes"
          className={eachhistory.seeprizes}
        >
          See Prizes
        </Link>
      </section>
      <section
        className={eachhistory.eachWrap}
      >
        <One position={1} />
        <One position={2} />
        <One position={3} />
        <One position={4} />
        <One position={5} />
        <One position={6} />
      </section>
    </div>
  );
};


const CommingSoon = () => {
  return(
    <div className="container">
        
    </div>
  )
}


export default AvatarHistory;
