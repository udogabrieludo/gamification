import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import avatarred from '../../assets/images/avatarred.svg'
import rightarrow from '../../assets/images/rightarrow.svg'
import downarrow from '../../assets/images/downarrow.svg'
import coin from '../../assets/images/coin.svg'
import coinbank from '../../assets/images/coinbank.svg'
import './style.css'
import Each from './Each'
import { items } from './list'
// import avatarred from '../../assets/images/avatarred.svg'
import triviagreen from '../../assets/images/triviagreen.svg'
import predictionbox from '../../assets/images/predictionbox.svg'
import { useSelector } from 'react-redux'
import { getPositionInWords } from '../../utils/utils'

const StatsCard = (props) => {
    const { leaderboard } = props
    const balance = useSelector((state) => state.balance)
    const {points} = useSelector((state) => state.points)
    const {avatar} = useSelector((state) => state.avatar)
    const {prediction} = useSelector((state) => state.prediction)
    const {trivia} = useSelector((state) => state.trivia)
    const {rank} = useSelector((state) => state.rank)
    
 
    return (
        <div className={`${leaderboard ? 'max-w': null} statscardwrapper  `}>
            <div className="my-pts">
            {
                leaderboard && <div  style={{fontFamily: 'Poppins', margin: '0 0 10px 0', fontSize: '12px', fontWeight: 'bold'}}>My Points</div>
            }
                <div style={{display: 'flex'}}>
                <div>
                    <div className="my-points-circle">
                        <div style={{textAlign: 'center'}}>
                            <div style={{fontSize: '35px', fontWeight: 'bold',}}>{points || 0}</div>
                            <div style={{fontSize: '18px', fontWeight: 'bold'}}>Pts</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`my-pts-head ${leaderboard ? 'not-display' : null}`}>My Points</div>
                    {/* {
                        items.map(item => (
                            <Each each={item} />
                        ))
                    }
                    <Each myname="avatar" points="12" icon={avatarred} />
                    <Each myname="trivia" points="12" icon={triviagreen} />
                    <Each myname="prediction" points="12" icon={predictionbox} /> */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 0 10px 0",
                            minWidth: "200px",
                        }}
                        >
                        <div style={{ display: "flex" }}>
                            <img src={avatarred} alt="avatarred" />
                            <div style={{textTransform: 'capitalize', color: "#A3A3A3", fontSize: "16px", marginLeft: "15px" }}>
                            avatar
                            </div>
                        </div>
                        <div>{avatar?.total_score} pts</div>
                        </div>
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 0 10px 0",
                            minWidth: "200px",
                        }}
                        >
                        <div style={{ display: "flex" }}>
                            <img src={triviagreen} alt="triviagreen" />
                            <div style={{textTransform: 'capitalize', color: "#A3A3A3", fontSize: "16px", marginLeft: "15px" }}>
                            trivia
                            </div>
                        </div>
                        <div>{trivia?.total_score} pts</div>
                        </div>
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0 0 10px 0",
                            minWidth: "200px",
                        }}
                        >
                        <div style={{ display: "flex" }}>
                            <img src={predictionbox} alt="predictionbox" />
                            <div style={{textTransform: 'capitalize', color: "#A3A3A3", fontSize: "16px", marginLeft: "15px" }}>
                            prediction
                            </div>
                        </div>
                        <div>{prediction?.total_score} pts</div>
                        </div>
                </div>
                </div>
            </div>
            <div className="pos-wallet">
                <div className={`no-one-col ${leaderboard ? 'max-m': null}`}>
                    <div style={{fontFamily: 'Poppins', fontSize: '16px', fontWeight: '500'}}>Position</div>
                    <div className={`holder ${leaderboard ? 'holder-leaderboard' : ''}`}>
                        <div style={{fontSize: '40px', fontWeight: 'bold', color: '#123873'}}>
                        <span>{rank._embedded?.points[0]?.rank || '1'} </span><span style={{fontSize: '13px'}}>
                            {getPositionInWords(rank._embedded?.points[0]?.rank) || 'st'}
                        </span>
                        <img style={{top: '40%', left: '45%', position: 'absolute'}} src={downarrow} alt="down arrow" />
                        </div>
                        {
                        leaderboard && <div>Overall</div>
                    }
                    </div>
                    
                    <div style={{display: 'flex', marginTop: '5px'}}>
                    
                        <HashLink to="/leaderboard" style={{fontWeight: 'bold', fontSize: '13px', textDecoration: "none"}}>View Leaderboard</HashLink>
                        <img style={{marginLeft: '10px'}} src={rightarrow} alt="arrow" />
                    </div>
                </div>
                <div className={`no-one-col ${leaderboard ? 'max-m': null}`} >
                    {leaderboard ? 
                    <div>
                    <img src={coinbank} alt="coinbank" />
                        <div style={{fontSize: '14px'}}>Coins Balance</div>
                    </div> : 
                    <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: 'Poppins', fontSize: '16px', fontWeight: '500'}}>
                        <div style={{fontFamily: 'Poppins', fontSize: '16px', fontWeight: '500'}}>Wallet</div>
                        <img src={coin} alt="coin" />
                    </div>}
                    <div style={{fontSize: '30px', fontWeight: 'bold', color: '#123873'}}>{balance.state.balance || 0}</div>
                    <div style={{display: 'flex', marginTop: '5px'}}>
                        <div style={{fontWeight: 'bold', fontSize: '13px'}}>
                            Top up
                        </div>
                        <img style={{marginLeft: '10px'}} src={rightarrow} alt="rightarrow" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsCard
