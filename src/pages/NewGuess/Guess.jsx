import React from 'react'
import hoh from '../../assets/svg/hoh.svg'
import classes from './guess.module.css'


const Guess = (props) => {
  const { handleOptions, questionText } = props
    return (
        // <div className={classes.cardwrapper}>
        <div className={classes.card} onClick={handleOptions}>
          <img src={hoh} alt="hoh" />
          <div className={classes.cardtext}>{questionText}</div>
        </div>
      // </div>
    )
}

export default Guess
