import React, {useState,useContext} from 'react'
import FeatherIcon from 'feather-icons-react'
import Wrapper, {WrapperContainer} from '../../components/Wrapper'
import { useHistory } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import avatar from '../../assets/gulder_assets/avatar.svg'
import { Container, Column, AvatarLogo, Gap, Title, Card,Button,AvatarHeader, CardItem, AvatarProfile, AvatarDetails, List } from './avata-styles'
import AvatarCardList from './avatar-card-list'
import AvatarInro from './avatar-intro'
import { StatsContext } from '../../context'
import { message } from 'antd';
import axios from 'axios'
import { isAuthenticated } from '../../utils/authdata'
import CustomModal from '../../components/CustomModal/CustomModal'
import AvatarModal from './avatar-modal'

const AvatarGame = () => {
    const {cartState:{cart, avatarActivities}, cartDispatch} = useContext(StatsContext);
    const history = useHistory();
    const [intro, setIntro] = useState(1);
    const [loading, setLoading] = useState(false);
    const [gameState, setGameState] = useState(1)
    const { token } = isAuthenticated();
    const [showModal, setShowModal] = useState(false)
    const [show, setShow] = useState(false)
    
    const avatarTotalAmount = cart.reduce((sum, avatar) => sum + avatar.qty * avatar.price, 0)
    
    const avatarIds = cart?.map((item)=>{
        return item?.id
    })

 

    const submitAvatars = async()=>{
        setLoading(true);
        let payload={
            activityId: avatarActivities?.id,
            selection: avatarIds
        }

       
        try{
            const {data} = await axios.post(`${process.env.REACT_APP_GUESS_GAME_URL}/avatar-selection`, payload,{
                headers:{
                    Authorization: `${token}`
                }
            });
          
            // message.success("Avatar recorded successfully!");
            setLoading(false);
            setGameState(2)
            cartDispatch({
                type:'REMOVE_ALL_FROM_AVATAR'
            })
          
        }catch(error){
         if(error instanceof Error){
           if(error.message === "Network Error"){
            message.error('Kindly check your network connect and try again!')  
           }
          }
         if(error.response.data){
          message.error(error.response.data.obj?.[0].message)
          setLoading(false)
         }
         
        }

    }
    
  const confirmationModal = ()=>(
      <CustomModal maxWidth='90%' showModal={showModal}  setShowModal={setShowModal}>
               <div  style={{color:'#fff', textAlign:'center', margin:'2rem 0'}}>
                   <div>
                       {gameState === 1 &&(
                           <>
                             <FeatherIcon  icon='info' size='30px' color='var(--humber-primary)' />
                            <Gap padding='.5rem'/>
                        <div style={{fontSize:'1.1rem'}}>{cart?.length} avatar(s) will cost you<span style={{color: 'var(--humber-primary)'}}> {avatarTotalAmount} Tokens</span></div>
                            <div className='btn-group-box'>
                                <button className='confirm-play' onClick={submitAvatars}>{loading ? 'Submiting...' : 'Submit'}</button>
                                <button className='cancel-play' onClick={()=>setShowModal(false)}>Cancel</button>
                            </div>
                           </>
                       )}
                       {gameState === 2 &&(
                           <>
                            <div className='success-icon'>
                             <FeatherIcon  icon='check' size='30px' color='var(--humber-light)' />
                             </div>
                            <Gap padding='.5rem'/>
                               <div style={{fontSize:'1.1rem'}}>Avatar recorded successfully!</div>
                               <div className='btn-group-box'>
                                <button className='confirm-play' onClick={()=>{
                                    setShowModal(false);
                                    history.push('/dashboard')
                                }}>Close</button>
                              </div>
                            
                           </>
                       )}
                   </div>
               </div>
      </CustomModal>
  )

    return (
        <Wrapper>       
             {showModal && (
                <>{confirmationModal()}</>
             )}

             <AvatarModal show={show} setShow={setShow}/>
            <WrapperContainer>
                <Container>
                   {intro===1 && (
                        <AvatarInro  setIntro={setIntro}/>
                   )}
                    {intro === 2 && (
                        <>
                        <Column width='60%'>
                        
                        <AvatarLogo style={{width:'100px'}}> 
                        <ReactSVG  src={avatar} />
                          <div className='page-header'>
                          <FeatherIcon type="button" size="20px" onClick={()=>setIntro(1)} icon="arrow-left"/> <Title color='var(--humber-primary)' align='center'> Avatar</Title>
                          </div>
                        </AvatarLogo>
                        <Gap />
                        {cart.length >=1 && (
                           <AvatarHeader >
                           <div  className='avatar-summary'>My Picks {" "} {cart.length || '0'} </div> 
                           <div className='avatar-summary'>Total Tokens  <span>{avatarTotalAmount}</span> </div>
                          <Button margin='0' onClick={()=>setShowModal(true)}>
                          Submit Avatar
                             </Button>
                             </AvatarHeader>
                        )}
                         
                        <Gap padding='.3rem' />
                            
                          <Card>
                             {cart.map(( item, i)=>(
                                <CardItem key={i}>
                                  <AvatarProfile>
                                      <div className='avatar-pic'> 
                                      <img src={item?.imgUrl} alt='avatar' />     
                                      </div>
                                      <div className='avatar-box'>
                                           <div className='avatar-name'>
                                                {item?.name}
                                           </div>
                                           <div className='avatar-role'>
                                               Contentant {item.id}
                                           </div>
                                      </div>
                                      <div className='delete-avatar' onClick={()=>{
                                          cartDispatch({
                                              type:'REMOVE_FROM_AVATAR',
                                              payload: item
                                          });
                                         

                                      }}>
                                          <FeatherIcon icon='x-circle' size='30px'/>
                                      </div> 
                                  </AvatarProfile>
                                   <AvatarDetails>
                                        <List>
                                            Name: <strong>{item?.name}</strong>
                                        </List>
                                        <List>
                                            Gender: <strong>{item.gender}</strong>
                                        </List>
                                        <List>
                                            State: <strong>{item.stateOfOrigin}</strong>
                                        </List>
                                        <List>
                                            Lifestyle: <strong>{item.lifestyle}</strong>
                                        </List>
                                        <List>
                                            Hobbies: <strong>{item.hobbies}</strong>
                                        </List>
                                        <List>
                                            Age: <strong>30</strong>
                                        </List>
                                        <List>
                                            Price: <strong>{item.price} Tokens</strong>
                                        </List>
                                   </AvatarDetails>
   
                                </CardItem>
                            ))}
                        </Card>
                      
                       
                        
                    
                   
                 {!cart.length  && (
                      <div className='no-data-notify'>Your selections will display here!</div>
                    )
                   } 
                  
                   <div className='show-avatar-modal'>
                           <button onClick={()=>setShow(true)}><FeatherIcon icon='plus'  /></button>
                        </div>

                        <Gap padding='.3rem' />
                    </Column>

                    <Column width='40%'> 
                        <AvatarCardList />
                    </Column>
                        </>
                    )}
                </Container>
            </WrapperContainer>
    </Wrapper>
   
    )
}

export default AvatarGame
