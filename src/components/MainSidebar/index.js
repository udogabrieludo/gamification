import React,{useState,useContext, useRef} from 'react'
import { Menu, MenuWrapper, List, ListRoute, ListDropdown } from './styles/main-sidebar';

import biggieslogo  from '../../assets/images/logo-white.png';
// import biggieslogo  from '../../assets/images/biggies-logo.svg';
import gulder_logo from '../../assets/images/gulder_logo.png'
import {useHistory, Link} from 'react-router-dom';
// import { isAuthenticated, signout } from '../../utils/data'
import FeatherIcon from 'feather-icons-react'
import { signout } from '../../utils/authdata';
// import { Context } from '../../Context';

import IdleTimer from 'react-idle-timer';



const HomeSidebar = ({toggle, setToggle, token, dispatch, showOnDashboard}) => {
  

    const [games, setGames] = useState(false);
    let modalRef = useRef()

    const idleTimerRef = useRef()
    // {toggle, setToggle}
  
    // const {state, dispatch}  = useContext(Context);

    // const {data} = isAuthenticated()

    // const logout = () => {

    //     dispatch({
    //       type:'LOGOUT',
        
    //     })
    //     signout(()=>{    
    //       history.push('/login');
    //     });     
    //  }
     
    //  ;
    const history = useHistory();
    const showGames = ()=>{
        setGames(!games)
    }
   

    const logout =()=>{
        signout(()=>{
            history.push('/')
        })
    }
   
    const closeModal = e =>{
        if(modalRef.current ===e.target){
            setToggle(false)
        }
    }

    return (
      
        <IdleTimer  ref={idleTimerRef}  timeout={1000 * 60 * 15} onIdle={logout}>
             <Menu toggle={toggle}  ref={modalRef} onClick={closeModal}>
              

                {toggle && (
                    <MenuWrapper>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <Link to='/'><img src={ biggieslogo } alt='logo' width='100px' /></Link> <div><FeatherIcon icon='x-circle' color='#fff' size='30px'   onClick={()=>setToggle(false)}/></div>
                        </div>
                      {!showOnDashboard && (
                             <List>
                                
                             <ListRoute  onClick={()=>{setToggle(false);  history.push('/how-to-play')}}>How to Play</ListRoute>
                             <ListRoute onClick={()=>{setToggle(false) ; history.push('/prizes')}} >Prizes</ListRoute>
                             <ListRoute onClick={()=>{setToggle(false);  history.push('/help-support')}}>Help & Support</ListRoute>

                              
                               <div className='btn-group'>

                               {!token && (
                                    <ListRoute  onClick={()=>{
                                     setToggle(false); dispatch({
                                         type:'OPEN_MODAL',
                                         payload:true
                                        })
                                 }}> <div className='inner-btn'>Login</div></ListRoute>  
                               )}

                              {token && (
                                   <ListRoute  onClick={()=>{
                                     setToggle(false); history.push('/dashboard')
                                 }}> <div className='inner-btn'>Dashboard</div></ListRoute>   
                              )}   

                                     



                             {/* {!data && (
                                 <>
                                 <ListRoute  onClick={()=>{
                                         setToggle(false); history.push('/login')
                                     }}> <div className='inner-btn'>Login</div></ListRoute>
                                     <ListRoute  onClick={()=>{
                                         setToggle(false); history.push('/signup')
                                     }}> <div className='inner-btn2'>Get Started</div></ListRoute>
                                 </>
                             )} */}

                          {/* {data && (
                              <ListRoute  onClick={()=>{
                                 setToggle(false); history.push('/dashboard')
                             }}><div className='inner-btn'>Dashboard</div></ListRoute>
                          )}
                             */}
                               </div>      
                      </List>
                      )}   
                        
                      
{showOnDashboard && (

<List>
                                
<ListRoute  onClick={()=>{setToggle(false);  history.push('/dashboard')}}>Dashboard</ListRoute>
<ListRoute onClick={showGames} >Games</ListRoute>
<ListDropdown  showDropdown={games}>
    <ListRoute onClick={()=>{setToggle(false) ; history.push('/scramble')}} >Scramble</ListRoute>
    {/* <ListRoute onClick={()=>{setToggle(false) ; history.push('/guess-game')}} >Guess Game</ListRoute> */}
    <ListRoute onClick={()=>{setToggle(false) ; history.push('/trivia-game')}} >Trivia Game</ListRoute>
</ListDropdown>
<ListRoute onClick={()=>{setToggle(false);  history.push('/leaderboard')}}>Leaderboard</ListRoute>
<ListRoute onClick={()=>{setToggle(false);  history.push('/prizes')}}>Prizes</ListRoute>
<ListRoute onClick={()=>{setToggle(false);  history.push('/help')}}>Help</ListRoute>
<ListRoute onClick={()=>{setToggle(false);  history.push('/profile')}}>Profile</ListRoute>
 
  <div className='btn-group'>


      <ListRoute  onClick={()=>{
      logout();  setToggle(false);
    }}> <div className='inner-btn'>Logout</div></ListRoute>   
  

        



  </div>      
</List>
                        )}  
                        
                    </MenuWrapper>
                )}
             
             </Menu>
           
        </IdleTimer>
    )
}

export default HomeSidebar