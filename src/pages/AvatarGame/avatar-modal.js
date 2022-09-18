import { message } from 'antd';
import React, {useState, useContext} from 'react'
import CustomModal from '../../components/CustomModal/CustomModal';
import { StatsContext } from '../../context';
import FeatherIcon from 'feather-icons-react';
import Sspinner from "../../components/Spinner";
import { AvatarListModal,AvatarHeader, AvatarXs, AvatarListItems, AvatarProfile, AvatarSideBar, Loading, Gap } from './avata-styles';


const AvatarModal = ({show, setShow}) => {

const {state:{stat},cartState:{cart, avatarActivities, avatars}, cartDispatch} = useContext(StatsContext)
const [loading, setLoading] = useState(false);


const avatarTotalAmount = cart.reduce((sum, avatar) => sum + avatar.qty * avatar.price, 0)


    return (
        <AvatarXs>
            {show && (
            <CustomModal maxWidth='90%'  showModal={show} setShowModal={setShow}>
            <AvatarSideBar>  
             <AvatarListModal >
                 {loading && (
                     <Loading> <Sspinner cz="25px" color="var(--humber-light)"/> Loading Avatars...</Loading>
                 )}
                  {!loading && (
                      <div style={{display:'flex', flexWrap:'wrap'}}>
                      {avatars?.map((avatar,i)=>(
                          <AvatarListItems key={i}> 
                            {cart.some((p)=>p.id === avatar.id) ?
                          <AvatarProfile direction='column' justifyContent='center' mR='0'
                          onClick={()=>{
                            cartDispatch({
                                type: 'REMOVE_FROM_AVATAR',
                                payload: avatar,
                            });
                            }}
                          >
                            <div className='avatar-select-box'>
                            <FeatherIcon icon='check' size='15px'  />   
                            <div className='avatar-pic'> 
                               <img src={avatar?.imgUrl} alt='avatar' />  
                            </div>
                            </div>
                            <small style={{color:'#fff'}}>{avatar?.name?.split(" ")[0]}</small>
                          </AvatarProfile> : 
                           <AvatarProfile direction='column' justifyContent='center' mR='0'
                          onClick={()=>{
                              if(stat.TOKEN < avatarTotalAmount){
                                message.error('You have insufficient token!')
                              }
                             else if(cart.length < parseInt(avatarActivities.maxSelection)){
                                cartDispatch({
                                    type: 'ADD_TO_AVATAR',
                                    payload: avatar,
                                });
                            }else{
                               message.error('You have react the maximum selection!')
                            } 
                           
                        }}
                          >
                          <div className='avatar-pic'> 
                            <img src={avatar?.imgUrl} alt='avatar' />  
                          </div>
                          <small style={{color:'#fff'}}>{avatar?.name?.split(" ")[0]}</small>
                        </AvatarProfile> 
                          }
                          </AvatarListItems>
                      ))}
                     
                  </div>
                  )}
             </AvatarListModal>
              <Gap padding='.5rem' />
             <AvatarHeader >
                <div  className='avatar-summary'>My Picks {" "} {cart.length || '0'} </div> 
                <div className='avatar-summary'>Total Tokens  <span>{avatarTotalAmount}</span> </div>          
           </AvatarHeader>
                <div className='view-selected-avatar' onClick={()=>setShow(false)}>View your selections</div>
        </AvatarSideBar>
        </CustomModal>
         )}
        </AvatarXs>
    )
}

export default AvatarModal
