import React from 'react'
import triviaheader from './triviaheader.module.css'

export const TriviaTimer = () => {
    return (
        <div className={triviaheader.wrapper}>
            <div style={{color: 'red'}}>
            <div style={{fontSize: '28px', color: 'gray'}}>Time Left</div>
            <div style={{fontSize: '22px'}}>0: 10: 00</div>
            </div>
        </div>
    )
}
const TriviaHeader = ({children ,question}) => {
    return (
        <div className={triviaheader.header}>
                <div className={triviaheader.title}>Trivia</div>
                    <div>{children}</div>
                </div>
    )
}

export default TriviaHeader
