import React from "react";
import guessheader from "./guessheader.module.css";
import FeatherIcon from "feather-icons-react"

export const GuessCategoryList = () => {
  return (
    <div className={guessheader.wrapper}>
      <ul>
        <li className={guessheader.activelist}>All</li>
        <li>Outfit</li>
        <li>Activities</li>
        <li>HOH</li>
        <li>Sunday Parties</li>
        <li>Survival</li>
      </ul>
    </div>
  );
};

const GuessHeader = ({ children, pickoption,setShowGuessCategory, setPickOption, setGuessGames }) => {
  return (
    <div className={guessheader.header}>
      <div className={`${guessheader.title}`}>
        
      <div style={{gap:'6px'}} className="d-flex align-items-center" >
      {
        pickoption && (
         <FeatherIcon onClick={()=>{
           setShowGuessCategory(true);
           setPickOption(false);
           setGuessGames({})
         }} icon="arrow-left"/>
        )
      }
      <div> Guess</div> 
      
     
      </div>
      </div>
      
      <div>{children}</div>
    </div>
  );
};

export default GuessHeader;
