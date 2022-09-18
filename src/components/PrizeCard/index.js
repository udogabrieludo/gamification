import React, {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import "./style.css";
import { Link } from "react-router-dom";
import Star from "../../assets/images/png/Star.png"
import Coin from "../../assets/images/png/coin.png"
import Modal, {BModal} from '../../components/Modal'
import { message } from "antd";
import { useFetchStat } from "../../utils/useFetchStat";
import { Select } from 'antd';
import styles from "./reward.module.css";
import CustomModal from 'react-bootstrap/Modal'
import { isAuthenticated } from '../../utils/authdata'


const { Option } = Select;



// const userObj = JSON.parse(localStorage.getItem("user"));
// const token = userObj?.token
//chidiebere
function  PrizeCard({ tag, className, coinVal, pointVal, dvalueType, points, title, description, img, not, cashed, id,rewardStatus, Amount, reward }) {
  const history = useHistory()
    const { userCoins ,  userPoints } = useFetchStat();
  const [read, setRead] = useState(false)
  const [gameRewardId, setGameRewardId] = useState(id)
  const [qnt, setQnt] = useState(1)
  const [valueAmount, setValueAmount] = useState(points)
  const [valueType, setValueType] = useState('')
  const [pickType, setPickType] = useState(false)
  const { token } = isAuthenticated()
  const [loading, setLoading] = useState(false)
  
  
  const redeemPrize = async() => {

    
    setLoading(true)
    try{
      const result = await axios.post(`${process.env.REACT_APP_GUESS_GAME_URL}/game-user-reward`, {
        'gameRewardId': gameRewardId,
        'qnt': qnt,
        'valueAmount': valueAmount,
        'valueType': valueType
      }, {
        headers: {
          Authorization: token
        }
      })
      setLoading(false)
    
      setRead(false)
      if(result.data.desc === 'OK' && result.data.status === 0){
        setRead(false)
        message.success({content: 'You have succesfully redeemed this prize', duration: 5})
        setTimeout(()=>{
            window.location.reload()
        }, 5000)
      }
    }catch(error){
    
      if(error.response.status != 200){
        message.error({content: `${error?.response?.data?.desc}` || 'unable to connect', duration: 5})
      }
      setRead(false)
      setLoading(false)
    }
  }
  const onRedeem = () => {
    if(userCoins >= points || userPoints >= points){
      setPickType(true)
    }else {
      setRead(true)
    }
    if(userCoins >= points){
      setValueType('COINS')
    }
    if(userPoints >= points){
      setValueType('POINT')
    }
      if (userCoins < points && userPoints < points){
          message.error({content: 'You do not have sufficient coins to purchase this prize', duration: 5})
          return
      }
  }
  const handlePick = (event) => {
    setValueType(event.target.value)
    if(valueType){
      setPickType(false)
      setRead(true)
    }
  }

  const Color = (status) => {
      if(status === 'FAILED' || status === 'REJECTED' ){
        return  '#dc3545'
      
      }
      else if(status === 'PROCESSING'){
        return '#faad14'
      }
      
      else if(status === 'PENDING'){
        return '#8b8f8b'
      }else {
        return '#007c02'
      }
  }
  return (
    <>
    <div className="prize-card" style={{backgroundColor:'#8c8c8c1c'}} key={id}>
      <div style={{ borderRadius: '20px 20px 0 0', padding: '10px', height: '160px', backgroundColor: 'white'}}>
        {reward?.reward.imageUrl ? 
        <img src={reward?.reward?.imageUrl} alt={title} style={{width: "100%", height: "140px", objectFit: 'contain'}} loading="lazy"/>
        : <div style={{width: '100%', height: '90%', borderRadius: '20px', backgroundColor: 'white', color: '#16407A', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          No Image to display
        </div>
      }
      </div>
     
      <div style={{ borderRadius: '0 0 20px 20px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 20px 10px 20px'}}>
       <div style={{color: '#16407A', fontWeight: 'bold', fontSize: '14px', overflow: 'hidden', width:'120px', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{reward?.reward?.name}</div>
        <div style={{color: '#000', fontSize: '12px', fontWeight: 'bold'}}>
        
        </div>
        <div>
          {!not && cashed &&
            <button style={{backgroundColor:Color(rewardStatus)}} type="button" className="rdbtn">{rewardStatus}</button>
          }
          {!not && !cashed &&
            <button type="button" className="myrebtn" onClick={onRedeem}>Redeem</button>
          }
        </div>
          
      </div>
      <div className="text-wrapper" style={{padding: '0 20px 30px 20px'}}>
        
        <p className="desc" style={{color: '#000'}}>  </p>
        {pointVal && new Intl.NumberFormat().format(pointVal) + ' points'}  {coinVal && new Intl.NumberFormat().format(coinVal) + ' coins'}
          {
            !not &&  cashed && <div>{dvalueType ? `Redeemed with ` : ''}<span style={{color: '#4ca04c', fontWeight: 'bold'}}>{dvalueType ? `${Amount} ${dvalueType === 'POINT' ? 'Points' :'Coins'}` : ''}</span></div>
          }
      </div>
          <div className="d-flex">
              
          </div>
      </div>
    </div>
    {/* {
      pickType && <Modal modalClass={"sss"} dialogClassName="reward_modal" style={{marginTop: '200px'}}
      cancelIcon={true}
          closeModal={()=> setPickType(false)}
          >
        <div style={{textAlign: 'center', padding: '20px'}}>
        <h3 className={`${styles.h3}`}>Pick an option to be debited from</h3>
        <select className={`${styles.select_option}`} onChange={handlePick} style={{width: '180px', height: '40px', padding: 5}} value={pickType}>
          <option value="" selected>Select</option>
          <option value="COIN">COIN</option>
          <option value="POINT">POINT</option>
        </select>
        </div>
      </Modal>
    } */}
    <CustomModal
        close
        centered
        size="lg"
        
        dialogClassName="reward_modal"
        show={pickType}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => {
          setPickType(false);
        }}
      >
        <CustomModal.Header closeButton />
        <CustomModal.Body>
         <div style={{textAlign: 'center', padding: '20px'}}>
        <h3 className={`${styles.h3}`}>Pick an option to be debited from</h3>
        <select className={`${styles.select_option}`} onChange={handlePick} style={{width: '180px', height: '40px', padding: 5}} value={pickType}>
          <option value="" selected>Select</option>
          <option value="COIN">COIN</option>
          <option value="POINT">POINT</option>
        </select>
        </div>
        </CustomModal.Body>
      </CustomModal>
    {
      read && <Modal  dialogClassName="reward_modal1" modalClass={'kkk'}
      style={{marginTop: '200px'}}
      cancelIcon={true}
          closeModal={()=> setRead(false)}
          space={{ maxWidth: "576px" }}
      >
        <div className="wayu">
        <img src={img} alt="img-to-redeem" className="theimg" />
        <div className="pointer-prize">
          <span className="pointer-cost">Cost</span>&nbsp;&nbsp; 
          <span className="pointer-points">{points}&nbsp;&nbsp; </span><img src={Coin} alt="coin" /></div>
        <div style={{fontSize: '1.1rem', color: '#123873', padding: '1.2rem 0', fontWeight: 'bold'}}>
          Are you sure you want to redeem this item?
        </div>
        <div className="btn-roller">
          <button className="rbtn" onClick={redeemPrize} disabled={loading}>{loading ? 'loading ...': 'Redeem'}</button>
          <button className="rbtn1" type="button" onClick={()=> history.push('dashboard')}>Play Game</button>
        </div>
        </div>
      </Modal>
    }
    </>
  );
}

export default PrizeCard;
