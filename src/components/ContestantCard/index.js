import React from "react";
import plusicon from "../../assets/images/plus-icon.png"
import './style.css'

const index = ({ empty, onAdd, children }) => {
  return (
    <div className="wawu">
      {empty ? (
        <div style={{height: '100%', display: 'flex', alignItems: 'center', marginLeft: '-50px', justifyContent: 'center'}}>
        <div  onClick={()=>onAdd()} style={{textAlign: 'center', cursor: 'pointer'}}>
        <img style={{width: '50px', height: '50px'}} src={plusicon} alt="plus" />
        <div style={{marginTop: '10px'}}>buy avatar</div>
        </div>
        {/* <p>{children}</p> */}
        </div>
      ) : (
        <div>
          <p>{children}</p>
        </div>
      )}
    </div>
  );
};

export default index;
