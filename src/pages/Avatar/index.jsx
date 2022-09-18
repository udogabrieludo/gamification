import React, { useState } from "react";
import {Link , useHistory} from 'react-router-dom'
import avatarcss from './avatar.module.css'

import arin from '../../assets/images/arin.png'
import avatarpage from '../../assets/svg/avatar-page.svg'

import EachAvatar from "../../components/EachAvatar";
import Modal from "../../components/Modal";
import commingsoon from './commingsoon.module.css'
import questionmark from "../../assets/svg/question-mark.svg";
import avataricon from "../../assets/svg/avataricon.svg";
import Layout from '../../components/Layout'

import triviaicon from "../../assets/svg/triviaicon1.png";



import check from '../../assets/svg/check.svg';

import mary from '../../assets/images/mary.svg';
import plus from '../../assets/images/plus.png';


const Empty = ({setShowFleets, showFleets})=> {
  return (
    <div className={avatarcss.emptycard}>
            <img src={plus} alt={plus} className={avatarcss.plus} onClick={()=> setShowFleets(!showFleets)} />
                </div>
  )
}
const Show = () => {
  return (
    <div className={avatarcss.card}>
                <div className={avatarcss.cardtop}>
                <img src={mary} alt="mary" />
                <div className={avatarcss.name}>
                   <div>White Money</div>
                    <div className={avatarcss.contestant}>Contestant 12</div>
                </div>
                </div>
                <ul>
                    <li>name: <strong>demilade oni</strong></li>
                    <li>sex: <strong>artiste</strong></li>
                    <li>state: <strong>calabar</strong></li>
                    <li>favorite: <strong>singing, dancing</strong></li>
                    <li>strenght: <strong>vocals</strong></li>
                    <li>weakness: <strong>instruments</strong></li>
                </ul>
                
                {/* <div style={{display: "flex", justifyContent: 'flex-end', width: '80%'}}><img src={check} style={{height: '20px', width: '20px'}} alt="check" /></div> */}
                </div>
  )
}
const MyFleets = () => {
  return (
    <div className={avatarcss.fleets}>
      <div className={avatarcss.select}>Select any 3 desired avatar</div>
        <div style={{fontWeight: 'bold', fontSize: '18px', padding: '0 0 15px 0'}}>Housemates</div>
        <div className={avatarcss.fleetwrapper}>
        <figure>
        <img src={arin} alt="arin" title="title" />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" className={avatarcss.myavatar} />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" className={avatarcss.myavatar} />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" className={avatarcss.myavatar} />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" />
        <figcaption>White money</figcaption>
        </figure>
        <figure>
        <img src={arin} alt="arin" title="title" />
        <figcaption>White money</figcaption>
        </figure>
        
        </div>
      </div>
  )
}
const Avatar = () => {
  const [showFleets, setShowFleets] = useState(false)
 
  return (
    <>
    <div className="zoom" style={{minHeight: '100vh', paddingBottom: '60px', marginBottom: '100px', display: 'flex', gap: '2%', width: '85%', margin: '100px auto'}}>
      
      
      <section className={avatarcss.sectone}>
      <div className={avatarcss.headerImage}>
      <img src={avatarpage}  alt="avatarpage" />
      </div>

      <div className={avatarcss.picksub}>
        <div style={{fontSize: '16px', color: '#16407A', fontWeight: 500, margin: '20px 0'}}>My Picks</div>
        <div><button className={avatarcss.btn}>Submit</button></div>
      </div>

      <div className={avatarcss.myavatars}>
                <Show />
                
                <Show />
                
                <Empty showFleets={showFleets} setShowFleets={setShowFleets} />
      </div>
      

      <div className={avatarcss.picks}>
        <div style={{fontSize: '16px', color: '#16407A', fontWeight: 500, margin: '20px 0'}}>Yesterdays Picks</div>
        <Link to="/avatars-history" style={{color: '#0A7815'}}>View all Avatar result</Link>
      </div>

      <div className={avatarcss.eachavatar}>
        <EachAvatar />
        <EachAvatar />
        <EachAvatar />
      </div>


      </section>
      
      
      
      
      {/* section two        */}
      <section className={avatarcss.secttwo}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}><Link to="/rewards-prizes" style={{color: '#0A7815'}}>See Prizes</Link></div>
      <div style={{padding: '0 0 20px 0'}}>Select any 3 desired avatar</div>
      <MyFleets />
      </section>
      
    </div>
    {showFleets && <div className={avatarcss.avmodwrap}>
    <Modal closeModal={()=> setShowFleets(!showFleets)} cancelIcon={true}>
        <MyFleets />  
      </Modal>
      </div>
      }
    </>
  );
};


const CommingSoon = () => {
  const history = useHistory()
  return (

    
       <>

        <div style={{display:"flex", alignItems:'center', padding:'1rem .3rem', justifyContent:'center', minHeight:'80vh'}} className="container">
        <div>
       
         <div className={commingsoon.cardwrapper}>
         
        <div className={commingsoon.card}>
          <img className={`${commingsoon.cardimg}`}  src={questionmark} alt="questionmark"  />
          <div className={`${commingsoon.text} ${commingsoon.guesstext} `}>
            Guess Game
          </div>
          <div className={commingsoon.description}>
            Put a stake on your favorite TV show
          </div>
          <button
            className={commingsoon.btn}
            onClick={() => history.push("/guess-game")}
          >
            Play Now 
          </button>
        </div>
        <div  className={commingsoon.card}>
          <img src={avataricon} className={`${commingsoon.cardimg}`}  alt="questionmark" />
          <div  className={` ${commingsoon.text} ${commingsoon.avatartext}`}>
            Avatar
          </div>
          <div className={` ${commingsoon.description } ${commingsoon.blink_me}` }>Coming Soon</div>
          <button disabled className={commingsoon.btn}>
           Coming Soon
          </button>
        </div>
        
        <div  className={commingsoon.card}>
          <img src={triviaicon}  className={`${commingsoon.cardimg}`} alt="questionmark" />
          <div className={`${commingsoon.text} ${commingsoon.triviatext} `}>
            Trivia
          </div>
          <div className={commingsoon.description}>
          How well have you been following?
          </div>
          <button onClick={() => history.push("/trivia-game")}  className={commingsoon.btn}>
            Play Now
          </button>
        </div>
      </div>
    </div>
    </div>
  
       </>
  )
}
export default Avatar
