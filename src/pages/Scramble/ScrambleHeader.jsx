import React from "react";
import FeatherIcon from "feather-icons-react";
import { useHistory } from "react-router";
import { Rowwrapper } from "./scramble_style";

const Header = ({ children }) => {
  const history = useHistory();
  return (
    <Rowwrapper justify={"space-between"}>
      <div className={`scramble_title`}>
        <Rowwrapper style={{ gap: "6px" }}>
          {/* <FeatherIcon
            color="var(--humber-light)"
            onClick={() => {
              history.goBack();
            }}
            icon="arrow-left"
          /> */}
          <FeatherIcon style={{cursor:'pointer'}} icon="arrow-left" color="#000" onClick={()=>history.goBack()}/>
          <div className="d-block" style={{color:'gray'}}> Scramble</div>
          
        </Rowwrapper>
      </div>
      <div>{children}</div>
    </Rowwrapper>
  );
};

export default Header;
