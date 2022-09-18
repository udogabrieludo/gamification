// import React,{useContext} from 'react'
// import { Menu, MenuWrapper, List, ListRoute } from './styles/home-mobile-menu';

// import biggieslogo from '../../assets/images/biggies-logo.svg';
// import {useHistory, Link} from 'react-router-dom';
// // import { isAuthenticated, signout } from '../../utils/data'
// import FeatherIcon from 'feather-icons-react'
// // import { Context } from '../../Context';




// const HomeSidebar = ({toggle, setToggle}) => {

  
//     // const {state, dispatch}  = useContext(Context);

//     // const {data} = isAuthenticated()

//     // const logout = () => {

//     //     dispatch({
//     //       type:'LOGOUT',
        
//     //     })
//     //     signout(()=>{    
//     //       history.push('/login');
//     //     });     
//     //  }
     
//     //  ;

//     const history = useHistory();
//     return (
      
           
//              <Menu toggle={toggle}>
              

//                 {toggle && (
//                     <MenuWrapper>
//                         <div style={{display:'flex', justifyContent:'space-between'}}>
//                             <Link to='/'><img src={biggieslogo} alt='logo' width='100px' /></Link> <div><FeatherIcon icon='x-circle' color='rgb(0,80,157)' size='25px'   onClick={()=>setToggle(false)}/></div>
//                         </div>
                         
                        
//                          <List>
                                
//                                 <ListRoute  onClick={()=>{setToggle(false);  history.push('/')}}>How to Play</ListRoute>
//                                 <ListRoute onClick={()=>{setToggle(false) ; history.push('/')}} >Leaderboard</ListRoute>
//                                 <ListRoute onClick={()=>{setToggle(false);  history.push('/')}}>Help & Support</ListRoute>

                                 
//                                   <div className='btn-group'>

//                                   <ListRoute  onClick={()=>{
//                                             setToggle(false); history.push('/login')
//                                         }}> <div className='inner-btn'>Login</div></ListRoute>   
//                                 {/* {!data && (
//                                     <>
//                                     <ListRoute  onClick={()=>{
//                                             setToggle(false); history.push('/login')
//                                         }}> <div className='inner-btn'>Login</div></ListRoute>
//                                         <ListRoute  onClick={()=>{
//                                             setToggle(false); history.push('/signup')
//                                         }}> <div className='inner-btn2'>Get Started</div></ListRoute>
//                                     </>
//                                 )} */}
 
//                              {/* {data && (
//                                  <ListRoute  onClick={()=>{
//                                     setToggle(false); history.push('/dashboard')
//                                 }}><div className='inner-btn'>Dashboard</div></ListRoute>
//                              )}
//                                 */}
//                                   </div>      
//                          </List>
//                     </MenuWrapper>
//                 )}
             
//              </Menu>
           
        
//     )
// }

// export default HomeSidebar