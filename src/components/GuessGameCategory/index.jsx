import React from "react";
import questionmark from "../../assets/svg/question-mark.svg";
import hoh from "../../assets/guesscategory/hoh.svg";
import classes from "./guessgamecategory.module.css";
import Cost from '../Cost'


const GuessGameCategory = (props) => {
  const {showFisrtTimer, openModal, noshowGuessGameCategoryPopUp} = props
  const handleShowLogin = () => {
    noshowGuessGameCategoryPopUp()
    openModal()
    showFisrtTimer()
  }
  return (
    <div className={classes.categorywrapper}>
      <div className={classes.top}>
        <img src={questionmark} alt={questionmark} />
        <div className={classes.title}>Guess Game</div>
        <Cost />
      </div>
      <div className={classes.cardwrapper}>
        <div className={classes.card} onClick={handleShowLogin}>
          <img src={hoh} alt="hoh" />
          <div className={classes.cardtext}>Who will win H.O.H this week?</div>
        </div>
        <div className={`${classes.card} ${classes.activecard}`}  onClick={handleShowLogin}>
          <img src={hoh} alt="hoh" />
          <div className={classes.cardtext}>Who will be selected as Deputy H.O.H this week?</div>
        </div>
        <div className={classes.card}  onClick={handleShowLogin}>
          <img src={hoh} alt="hoh" />
          <div className={classes.cardtext}>Who will get the highest Nomination Vote?</div>
        </div>
        <div className={classes.card}  onClick={handleShowLogin}>
          <img src={hoh} alt="hoh" />
          <div className={classes.cardtext}>How many ladies will wear a blonde wig at the party tonight?</div>
        </div>
        <div className={classes.card}  onClick={handleShowLogin}>
          <img src={hoh} alt="hoh" />
          <div className={classes.cardtext}>Who will win the BBNaija <strong style={{color: '#2B9FDD', fontStyle: 'italic'}}>Abeg</strong> competition?</div>
        </div>
        <div className={classes.card}  onClick={handleShowLogin}>
          <img src={hoh} alt="hoh" />
          <div className={classes.cardtext}>Which Housemate will wear a black long sleeve top today?</div>
        </div>
      </div>
    </div>
  );
};

export default GuessGameCategory;
