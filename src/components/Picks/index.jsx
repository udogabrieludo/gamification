import React from 'react'
import picks from './picks.module.css'

const Picks = (props) => {
    const {btnText, children, avart, guess} = props
    return (
        <div className={`${picks.picks} ${avart ? picks.avatarpicks : guess ? picks.guesspicks : ''}`}>
            {children}
            <button type="button" className={picks.btn}>{btnText}</button>
        </div>
    )
}

export default Picks
