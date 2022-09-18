import React from 'react'
// import { Link } from 'react-router-dom'
// import rightarrow from '../../assets/images/rightarrow.svg'
import eachavatar from './eachavatar.module.css'
import mercy from '../../assets/images/mercy.svg'


const Each = (props) => {
    const { ownavatar, opid } = props 
    // console.log('the opid is >>>', opid)
    return (
        <div className={eachavatar.okay} >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={mercy} alt='timidakolo' />
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <div style={{fontSize: '19px', fontWeight: '500'}}>
                        {/* {ownavatar?.label} */}my name
                        </div>
                        <div style={{color: '#A3A3A3'}}>Contestant 
                        22
                        {/* {ownavatar?.contestantId} */}
                        </div>
                    </div>
                </div>
                <div style={{margin: '20px 0 10px 0', fontSize: '12px'}}>
                    <div style={{background: '#E6F2E8', position: 'relative', margin: '7px 0', borderRadius: '15px', padding: '3px 10px', maxWidth: '80px'}}>
                    Vocal 09
                    {/* ({ownavatar?.vocals}) */}
                    <div className={eachavatar.upperballone}>
                        <div>+10</div>
                    </div>
                    </div>
                    <div style={{background: '#F20000', position: 'relative', margin: '7px 0',  borderRadius: '15px',  maxWidth: '80px', padding: '3px 10px'}}>
                    Social 02 
                    {/* ({ownavatar?.socials}) */}
                    <div className={eachavatar.upperballone}>
                        <div>+12</div>
                    </div>
                    </div>
                    <div style={{background: '#E6F2E8', position: 'relative', margin: '7px 0', borderRadius: '15px',  maxWidth: '125px', padding: '3px 10px'}}>
                    Performance 11
                    {/* ({ownavatar?.performance || 0}) */}
                    <div className={eachavatar.upperballone}>
                        <div>+12</div>
                    </div>
                    </div>
                </div>
                <div style={{position: 'relative', marginTop: '15px', marginRight: '60px', display: 'flex', justifyContent: 'flex-end'}}>
                    <div style={{fontSize: '32px', fontWeight: 'bold'}}>
                        {ownavatar?.points || 22}
                        <span style={{fontSize: '11px'}}>nd</span>
                    </div>
                    {/* <div className="upperball">
                        <div>+32</div>
                    </div> */}
                </div>
                {/* <div className="last-row" style={{display: 'flex', fontWeight: 'bold', fontSize: '13px', padding: '10px 0'}}>
                    <div onClick={displayBoostModal} style={{textDecoration: 'none', display: 'flex', cursor: 'pointer'}}>
                        <div style={{color: '#0A7815'}}>Boost Points</div> 
                        <img style={{marginLeft: '10px'}} src={rightarrow} alt="rightarrow" />
                    </div>
                    <Link onClick={displaySwitchModal} style={{textDecoration: 'none', color: '#FF2200', marginLeft: '70px'}}>Switch</Link>
                </div> */}
            </div>
    )
}

export default Each
