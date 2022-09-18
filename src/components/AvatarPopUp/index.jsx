import React from 'react'
import styles from './avatarpopup.module.css'

import avataricon from '../../assets/svg/avataricon.svg';
import check from '../../assets/svg/check.svg';

import mary from '../../assets/images/mary.svg';
import plus from '../../assets/images/plus.png';
import Cost from '../Cost'


const index = (props) => {
    const {noshowAvatarGamePopUp, openModal, showFisrtTimer } = props
    const handleShowLogin = () => {
        noshowAvatarGamePopUp()
        openModal()
        showFisrtTimer()
      }
    return (
        <div>
            <div className={styles.top}>
            <img src={avataricon} alt={avataricon } />
            <div className={styles.title}>Avatar</div>
            <div className={styles.description}>Pick your top performers for the day</div>
            <div className={styles.readme}>Select any 3 desired avatars</div>
            <Cost />
            </div>
            <div className={styles.cardwrapper}>
                <div className={styles.card}>
                    <img src={plus} alt={plus} className={styles.plus} />
                </div>
                <div className={styles.card} style={{backgroundColor: '#123873'}}>
                <div className={styles.cardtop}>
                <img src={mary} alt="mary" />
                <div className={styles.name}>
                   <div>White Money</div>
                    <div className={styles.contestant}>Contestant 12</div>
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
                <div style={{display: "flex", justifyContent: 'flex-end', width: '80%'}}><img src={check} style={{height: '20px', width: '20px'}} alt="check" /></div>
                </div>
                <div className={styles.card} style={{backgroundColor: '#123873'}}>
                <div className={styles.cardtop}>
                <img src={mary} alt="mary" />
                <div className={styles.name}>
                   <div>White Money</div>
                    <div className={styles.contestant}>Contestant 12</div>
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
                <div style={{display: "flex", justifyContent: 'flex-end', width: '80%'}}><img src={check} style={{height: '20px', width: '20px'}} alt="check" /></div>
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
            <button className={styles.btn} onClick={handleShowLogin}>Finish</button>
            </div>
        </div>
    )
}

export default index
