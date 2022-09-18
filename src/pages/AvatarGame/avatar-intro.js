import React, {useState, useEffect, useContext} from 'react';
import { ReactSVG } from 'react-svg';
import avatar from '../../assets/gulder_assets/avatar.svg';
import { useHistory} from 'react-router-dom';
import axios from 'axios'
import treasureBox from '../../assets/gulder_assets/treasure-box.svg'
import { Column, Gap, AvatarLogo,Loading, Title, Card,Button, IntroCard, AvatarProfile, AvatarDetails} from './avata-styles'
import { message } from 'antd';
import Sspinner from "../../components/Spinner";
import { StatsContext } from '../../context';

const AvatarInro = ({setIntro}) => {

    const history = useHistory();
    const {cartState:{avatarActivities}, cartDispatch} = useContext(StatsContext)
    const [activities, setActivities] = useState();
    const [loading, setLoading] = useState(false);



    const getAvatarActivities = async()=>{
      setLoading(true)
      try{
        const {data} = await axios.get(`${process.env.REACT_APP_GUESS_GAME_URL}/avatar-activity`);
        if(data){
          setActivities(data?.obj?.avatarActivities?.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1));
          setLoading(false)
          cartDispatch({
            type:'GET_ACTIVITIES',
            payload:data?.obj?.avatarActivities?.[0]
          })
        }

      }catch(error){
        if(error instanceof Error){
          message.error('Kindly check your network connection and try again!')
          setLoading(false)
        }else{
          message.error('Failed to load this week activities');
          setLoading(false)
        }
      }
    }

    

   useEffect(()=>{
    getAvatarActivities()
   }, []) 
    return (
        <Column width='100%'>
                        
        <AvatarLogo style={{width:'100px', margin: 'auto'}}> 
        <ReactSVG  src={avatar} />
            <Title color='var(--humber-primary)' align='center'> Avatar</Title>
        </AvatarLogo> 
                <Gap padding='.5rem '/>
           <Card>
             <IntroCard >
               <AvatarProfile>       
                         <ReactSVG  src={treasureBox} />     
               </AvatarProfile>
                {!loading && (
                   <AvatarDetails>
                   {activities?.slice(0, 1)?.map((activity)=>(
                      <div key={activity.id} style={{textAlign:'center', color:'#fff', margin:'1rem 0'}}>
                      <h3 style={{color:'var(--humber-primary)'}}>{activity?.activityTitle}</h3>   
                      {activity?.activityText}
                     </div>
                   ))}
                   
                   <Button onClick={()=>setIntro(2)}>
                           Select Avatar
                 </Button>
                 </AvatarDetails>
                )}
                 
                 {loading && (
                   <AvatarDetails>
                        <Loading> <Sspinner cz="25px" color="var(--humber-light)"/> Loading...</Loading>
                   </AvatarDetails>
                 )}

             </IntroCard>
     </Card>
    </Column>
    )
}

export default AvatarInro
