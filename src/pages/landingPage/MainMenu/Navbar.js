import React, {useState, useContext} from 'react'
import { HomeSidebar, Menu } from '../../../components'
// import biggieslogo  from '../../../assets/images/biggies-logo.svg';
import biggieslogo  from '../../../assets/images/logo.png';

import FeatherIcon from 'feather-icons-react'
import { useHistory, NavLink } from 'react-router-dom';
import { authenticate, isAuthenticated } from '../../../utils/authdata';
import axios from 'axios';
import { message } from 'antd';
import { validateEmail } from '../../../utils/emailValidation';
import CustomModal from '../../../components/CustomModal/CustomModal';
import { StatsContext } from '../../../context';

const Navbar = (props) => {

const {location} = props
// const {state} = location

const [toggle, setToggle] = useState(false);

const {token} = isAuthenticated()

const {state:{openModal}, dispatch} = useContext(StatsContext)

const routeDashbord = ()=>{
    history.push('/dashboard') 
}

let history = useHistory()
const [showModal, setShowModal] = useState(false);
const [loading, setLoading] = useState(false);
const [screen, setScreen] = useState(2);
const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
};



const [values, setValues] = useState({
    username: '',
    email: '',
    phone : '',
    password: '',
    otp:'',
    errors:{
        nameError : '',
        emailError : '',
        otpError : '',
        phoneError : '',
        passwordError : '',
    }
})

const { username, email, phone, password, otp, errors} = values;

const handleChange = name =>e=>{
   setValues({...values, errors:{}, [name]: e.target.value})
}

const loginScreen = ()=>{
   setScreen(1)
}

const signupScreen = ()=>{
   setScreen(2)
}



const registerUser = async(e)=>{
   e.preventDefault();

   setLoading(true)
   if(!username){
       setLoading(false);
       setValues({...values, errors:{nameError:'Name is required'}})}
   else if(!email.trim()){
       setLoading(false);
       setValues({...values, errors:{emailError:'Email is required'}})
   }
   else if(validateEmail(email)){
       setValues({...values, errors: {emailError:"Please provide a valid email*"}})
       setLoading(false);
     }
   else if(!phone){
       setLoading(false);
       setValues({...values, errors:{phoneError:'Phone is required'}})
   }
   
   else if(!password){
       setValues({...values, errors:{passwordError:'Password is required'}});
       setLoading(false);
   }else if(password.length < 8){
       setValues({...values, errors:{passwordError:'Minimum characters is 8 digits or more '}});
       setLoading(false);
   }else{
     
       try{

           const payload = {
               name : username,
               email : email,
               phone : phone,
               password: password
           }

          
           const {data} = await axios.post(`${process.env.REACT_APP_AUTH_URL}/register`, payload);

           if(data?.status ===1){
               message.error(data?.desc);
               setLoading(false)
             }    
          else{ 
               message.success("Six(6) digit code has been sent to your email to complete your registration!");
               setScreen(4);  
               setLoading(false)          
       } 
     

       }catch(error){
             
   if (error instanceof Error) {
       if(error.message === 'Network Error'){
         message.error('Please check your network connection!');
         setLoading(false)  
        }else{
        
        setLoading(false)
        }
 
      }else{
        setLoading(false)
      }
     
       }
   }
}



const loginUser = async(e)=>{
   e.preventDefault();

   setLoading(true)
   if(!email.trim()){
       setLoading(false);
       setValues({...values, errors:{emailError:'Email is required'}})
   }
   else if(validateEmail(email)){
       setValues({...values, errors: {emailError:"Please provide a valid email*"}})
       setLoading(false);
     }
   else if(!password){
       setValues({...values, errors:{passwordError:'Password is required'}});
       setLoading(false);
   }else if(password.length < 8){
       setValues({...values, errors:{passwordError:'Minimum characters is 8 digits or more '}});
       setLoading(false);
   }else{
     
       try{

           const payload = {
               email : email,
               password: password
           }
           const {data} = await axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/login`, payload);

           if(data?.status ===1){
               message.error(data?.desc);
               setLoading(false)
               setLoading(false); 
               if(data?.desc === "Kindly Verify Email"){
                   setScreen(4) 
               } 
             }    
          else{
               message.success("Login successful!");

            setShowModal(false);
          
            authenticate(data?.obj, ()=>{
                history.push('/dashboard');
                // if(state && state.from){
                //     history.push(state.from);
                //   }else{  
                //     history.push('/dashboard');
                //   }
             })
             dispatch({
                type:'OPEN_MODAL',
                payload:false
            })
            
     } 
     

       }catch(error){
             
   if (error instanceof Error) {
       if(error.message === 'Network Error'){
         message.error('Please check your network connection!');
         setLoading(false)  
        }else{
        
        setLoading(false)
        }
 
      }else{
        setLoading(false)
      }
     
       }
   }
}

const completeRegistration = async(e)=>{
   e.preventDefault();

   setLoading(true)
   if(!otp){
       setLoading(false);
       setValues({...values, errors:{otpError:'OTP is required'}})
   }else{
     
       try{

           const payload = {
               email : email,
               otp : otp,
           }
           const {data} = await axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/email/verify`, payload);

           if(data?.status ===1){
               message.error(data?.desc);
               setLoading(false)
             }    
          else{   
               message.success("Registration successful!");
               setShowModal(false);
               authenticate(data?.obj, ()=>{
                   history.push('/dashboard');
                 })
                 dispatch({
                     type:'OPEN_MODAL',
                     payload:false
                 })
             
            
     } 
     
       }catch(error){
             
   if (error instanceof Error) {
       if(error.message === 'Network Error'){
         message.error('Please check your network connection!');
         setLoading(false)  
        }else{
        
        setLoading(false)
        }
 
      }else{
        setLoading(false)
      }
     
       }
   }
}


const forgotPassword = async(e)=>{
   e.preventDefault();

   setLoading(true)
   if(!email.trim()){
       setLoading(false);
       setValues({...values, errors:{emailError:'Email is required'}})
   }else if(validateEmail(email)){
       setValues({...values, errors: {emailError:"Please provide a valid email*"}})
       setLoading(false);
     }
   else{
     
       try{

           const payload = {
               email : email,
           }
           const {data} = await axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/reset`, payload);

           if(data?.status ===1){
               message.error(data?.desc);
               setLoading(false)
             }    
          else{   
           message.success("Six(6) digit code has been sent to your email to reset your password!");
              setScreen(5)
              setLoading(false)
         } 
     
       }catch(error){
             
   if (error instanceof Error) {
       if(error.message === 'Network Error'){
         message.error('Please check your network connection!');
         setLoading(false)  
        }else{
        
        setLoading(false)
        }
 
      }else{
        setLoading(false)
      }
     
       }
   }
}


const confirmReset = async(e)=>{
   e.preventDefault();

   setLoading(true);
   if(!email.trim()){
       setLoading(false);
       setValues({...values, errors:{emailError:'Email is required'}})
   }else if(validateEmail(email)){
       setValues({...values, errors: {emailError:"Please provide a valid email*"}})
       setLoading(false);
     }
   else if(!otp){
       setLoading(false);
       setValues({...values, errors:{otpError:'OTP is required'}})
   }
   else if(!password){
       setLoading(false);
       setValues({...values, errors:{passwordError:'Password is required'}})
   }
   else if(password.length < 8){
       setLoading(false);
       setValues({...values, errors:{passwordError:'Minimum characters is 8 digits or more '}})
   }else{
     
       try{

           const payload = {
               email : email,
               otp : otp,
               password:password
           }
           const {data} = await axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/reset-password`, payload);

           if(data?.status ===1){
               message.error(data?.desc);
               setLoading(false)
             }    
          else{   
               message.success("Password reset successful!");
               setScreen(1);
               setLoading(false)   
     } 
     
       }catch(error){
             
   if (error instanceof Error) {
       if(error.message === 'Network Error'){
         message.error('Please check your network connection!');
         setLoading(false)  
        }else{
        
        setLoading(false)
        }
 
      }else{
        setLoading(false)
      }
     
       }
   }
}


const resendOTP = async()=>{
    try{

        const payload = {
            email : email,
        }
        const {data} = await axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/regenerate/otp`, payload);

        if(data?.status ===1){
            message.error(data?.desc);
            setLoading(false)
          }    
       else{   
        message.success("Six(6) digit code has been sent to your email again!");    
           setLoading(false)
      } 
  
    }catch(error){
          
     if (error instanceof Error) {
    if(error.message === 'Network Error'){
      message.error('Please check your network connection!');
      setLoading(false)  
     }else{
     
     setLoading(false)
            }

        }else{
            setLoading(false)
        }
  
    }

}




//Custom Modal


    return (
        <> 
      
          <HomeSidebar  setToggle={setToggle} toggle={toggle} token={token}  dispatch={dispatch}/>
        <Menu>
        <Menu.Wrapper>
            <Menu.Group>
                <Menu.Logo>
                   <NavLink to='/' > <img src={biggieslogo } alt='log'/></NavLink>
                </Menu.Logo>
            </Menu.Group>
             <Menu.Group showMobile='none' showDesktop='flex'>
                <Menu.LinkItem >
                   <NavLink to='/how-to-play'  activeClassName='isActive'>  How to Play</NavLink>
                </Menu.LinkItem>
                <Menu.LinkItem>
                   <NavLink to='/prizes'  activeClassName='isActive'>   Prizes </NavLink>
                </Menu.LinkItem>
                <Menu.LinkItem onClick={()=>history.push('/help-support')}>
                  
                    <NavLink to='/help-support' activeClassName='isActive' >  Help & Support</NavLink>
                </Menu.LinkItem>
                {!token && (
                    <Menu.Button onClick={()=>dispatch({
                        type:'OPEN_MODAL',
                        payload:true
                    })}>
                    Login
               </Menu.Button>
                )}


              {token && (
                    <Menu.Button onClick={routeDashbord}>
                    Dashboard
               </Menu.Button>
                )}
            </Menu.Group>
            <Menu.Group showMobile='flex' showDesktop='none' onClick={()=>setToggle(true)}>
                <FeatherIcon icon='menu' color='#000' size='40px' />
            </Menu.Group>
        </Menu.Wrapper>




      
    </Menu>

        {/* Custom modal */}

          {openModal && (
            <CustomModal  dispatch={dispatch}  width='400px'>
                  <div>
                      <div className='modal-tab'>
                      <div className='tab' onClick={signupScreen} style={{borderBottom: screen ===2 ? '4px solid var(--humber-button-color)': null}}>Sign-up</div>
                        <div className='tab' onClick={loginScreen} style={{borderBottom: screen ===1 ? '4px solid var(--humber-button-color)': null}}>Login</div>
                       </div>

                        {screen ===1 && (
                            <div style={{padding:'1rem '}}>
                            <h3><strong>LOGIN</strong></h3>
                           <form>
                               <input type='text'  value={email} onChange={handleChange('email')} placeholder='Enter Email'  />
                               <small>{errors?.emailError}</small>
                               <div className='inputGap'></div>
                             
                               <div style={{position:'relative'}}>
                                   
                                   <input type={showPassword ? "text" : "password"}   value={password} onChange={handleChange('password')} placeholder='Enter Password'  />
                                   <FeatherIcon icon={ showPassword ? "eye" : "eye-off"}  onClick={togglePasswordVisiblity}
                                        style={{position: "absolute",
                                        right: "15px",
                                        top: "13px",
                                        color: "var(--humber-primary)",
                                        width: "18px"}} />
                                   </div>
                               
                               <small>{errors?.passwordError}</small>
                               
                               <div className='forgot-password' onClick={()=>setScreen(3)}>Forgot Password?</div>
                               <div className='inputGap'></div>
                               
                               <button type='submit' onClick={loginUser}>{loading ? 'Authenticating...' : 'Login'}</button>
                           </form>
                       </div>
                        )}

                       {screen ===2 && (
                            <div style={{padding:'1rem '}}>
                            <p><strong><span >Create a free account </span> 
                            {/* <span style={{color:'var(--humber-button-color)'}}>BIGGIES GAME!</span> */}
                            </strong>
                            </p>
                           <form>
                               <input type='text' value={username} onChange={handleChange('username')} placeholder='Enter Name'  />
                               <small>{errors?.nameError}</small>
                               <div className='inputGap'></div>

                               <input type='text' value={email} onChange={handleChange('email')} placeholder='Enter Email'  />
                               <small>{errors?.emailError}</small>
                               <div className='inputGap'></div>
                              
                               <input type='number'value={phone} onChange={handleChange('phone')} placeholder='Enter Phone'  />
                               <small>{errors?.phoneError}</small>
                               <div className='inputGap'></div>
                               
                               <div style={{position:'relative'}}>
                                <input type={showPassword ? "text" : "password"}   value={password} onChange={handleChange('password')} placeholder='Enter Password'  />
                               <FeatherIcon icon={ showPassword ? "eye" : "eye-off"}  onClick={togglePasswordVisiblity}
                                    style={{position: "absolute",
                                    right: "15px",
                                    top: "13px",
                                    color: "var(--humber-primary)",
                                    width: "18px"}} />
                                </div>
                               
                               {/* <input type='password'value={password} onChange={handleChange('password')} placeholder='Enter Password'  /> */}
                              
                              
                               <small>{errors?.passwordError}</small>
                               <small className='warning-notice'>{!errors?.passwordError ? "Password must contain 8 characters or more." : null}</small>
                               <div className='inputGap'></div>
                               
                               <button type='submit' onClick={registerUser}>{loading ? 'Loading...' : 'Sign up'}</button>
                           </form>
                       </div>
                       )}

                        {screen ===3 && (
                            <div style={{padding:'1rem '}}>
                            <h6><strong>REQUEST OTP</strong></h6>
                            <div className='inputGap'></div>
                           <form>
                               <input type='text'  value={email} onChange={handleChange('email')} placeholder='Enter Email'  />
                               <small>{errors?.emailError}</small>
                               <div className='inputGap'></div>
                               <button type='submit' onClick={forgotPassword}>{loading? 'Verifying...' : 'Request OTP'}</button>
                           </form>
                       </div>
                        )}
                         {screen ===4 && (
                            <div style={{padding:'1rem '}}>
                            <h6><strong>VERIFY OTP</strong></h6>
                             <div className='token-notification'>Six(6) digit code has been sent to your email to complete your registration!</div>
                           <form>
                               <input type='number'  value={otp} onChange={handleChange('otp')} placeholder='Enter OTP'  />
                               <div className='inputGap'></div>
                              
                               <button type='submit' onClick={completeRegistration}>{loading ? "Verifying ..." : 'Confirm'}</button>
                               <div className='inputGap'></div>
                               <div>Didn't Receive OTP? <strong style={{cursor:'pointer',color:'#0f0d5f'}} onClick={resendOTP}> Resend</strong></div>
                           </form>
                       </div>
                        )}
                        {screen ===5 && (
                            <div style={{padding:'1rem '}}>
                            <h6><strong>RESET PASSWORD</strong></h6>
                            <div className='token-notification'>Six(6) digit code has been sent to your email to reset your password!</div>
                           <form>
                               <input type='text'  value={email} onChange={handleChange('email')} placeholder='Enter Email'  />
                               <small>{errors?.emailError}</small>
                               <div className='inputGap'></div>
                               <input type='number'  value={otp} onChange={handleChange('otp')} placeholder='Enter OTP'  />
                               <small>{errors?.otpError}</small>
                               <div className='inputGap'></div>
                               <div style={{position:'relative'}}>
                                <input type={showPassword ? "text" : "password"}   value={password} onChange={handleChange('password')} placeholder='Enter Password'  />
                               <FeatherIcon icon={ showPassword ? "eye" : "eye-off"}  onClick={togglePasswordVisiblity}
                                    style={{position: "absolute",
                                    right: "15px",
                                    top: "13px",
                                    color: "#295982",
                                    width: "18px"}} />
                                </div>
                               {/* <input type='text'  value={password} onChange={handleChange('password')} placeholder='Enter New Password'  /> */}
                               <small>{password?.otpError}</small>
                               <div className='inputGap'></div>
                               <button type='submit' onClick={confirmReset}>{loading ? "Resetting..." : "Reset Password"}</button>
                               <div className='inputGap'></div>
                                <div>Didn't Receive OTP? <strong style={{cursor:'pointer',color:'#0f0d5f'}} onClick={resendOTP}> Resend</strong></div>
                           </form>
                       </div>
                        )}

                  </div>
             </CustomModal>
              )} 
    </>
    )
}

export default Navbar
