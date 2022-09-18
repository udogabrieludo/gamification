import React from 'react'
import redeem from './redeem.module.css'
import camryhybrid from '../../assets/images/camryhybrid.png'

const RedeemPopUp = () => {
    return (
        <div>
            <div className={redeem.highlight}>
            <div>You have <strong className={redeem.coin}>1500</strong> points already will you like to redeem any of the prices with it?</div>
            <div className={redeem.reward}>
                <img src={camryhybrid} alt="camryhybrid" />
                <div className={redeem.prize}>2,800 <span>points</span></div>
            </div>
            <div>
                <button className={redeem.btn}>redeem</button>
                <button className={`${redeem.btn} ${redeem.nobtn}`}>No, thanks</button>
            </div>
            </div>
            
        </div>
    )
}

export default RedeemPopUp
