import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { message } from 'antd';
import Sspinner from "../../components/Spinner";
import { AvatarSideBar, AvatarList,AvatarProfile, Loading, AvatarListItems } from './avata-styles'
import { StatsContext } from '../../context';
import FeatherIcon from 'feather-icons-react'

const AvatarCardList = () => {

const {state:{stat},cartState:{cart, avatarActivities}, cartDispatch} = useContext(StatsContext)
const [getAllvatars, setAllAvatars] = useState();
const [loading, setLoading] = useState(false);


const avatarTotalAmount = cart.reduce((sum, avatar) => sum + avatar.qty * avatar.price, 0)

const getAvatars = async()=>{
    setLoading(true)
    try{
        const {data} = await axios.get(`${process.env.REACT_APP_GUESS_GAME_URL}/avatar`);
       
        setAllAvatars(data?.obj?.avatar);
        setLoading(false);
        cartDispatch({
            type:'GET_ALL_AVATARS',
            payload: data?.obj?.avatar
        })
    }catch(error){
      message.error("Failed to load avatars");
      setLoading(false)
    }

}





useEffect(()=>{
    getAvatars()
}, [])

    return (
        <div className='avatar-sidebar'>
        
        <h6 style={{color:'var(--humber-light)'}}>Kindly select maximum of ({avatarActivities?.maxSelection}) Avatars!</h6>
        <AvatarSideBar>
             <AvatarList >
                 {loading && (
                     <Loading> <Sspinner cz="25px" color="var(--humber-light)"/> Loading Avatars...</Loading>
                 )}
                  {!loading && (
                      <div style={{display:'flex', flexWrap:'wrap'}}>
                      {getAllvatars?.map((avatar,i)=>(
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
                            <small>{avatar?.name?.split(" ")[0]}</small>
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
                          <small>{avatar?.name?.split(" ")[0]}</small>
                        </AvatarProfile> 
                          }
                          </AvatarListItems>
                      ))}
                     
                  </div>
                  )}
             </AvatarList>
            
        </AvatarSideBar>
        </div>
    )
}

export default AvatarCardList
