import React from "react";
import mypoints from "./mypoints.module.css";
import   { useFetchStat} from "../../utils/useFetchStat";
import Spinner from "../../components/Spinner";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useHistory } from "react-router";
import { useMyFetchStuffs } from "../../utils/taofikFetch"


 const Progress = (props) => {
   const formatNumber = (x) =>{
     
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.00';
   }
   
   var { userPoints } = props
    const percentage = userPoints ? userPoints : 0;

  return (
    <CircularProgressbar
    value={formatNumber(percentage)}
    maxValue={10000000}
    text={`${percentage}`}
    styles={buildStyles({
      // Rotation of path and trail, in number of turns (0-1)
      rotation: 0.25,
  
      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: 'butt',
  
      // Text size
      textSize: '16px',
  
      // How long animation takes to go from one percentage to another, in seconds
      pathTransitionDuration: 0.5,
  
      // Can specify path transition in more detail, or remove it entirely
      // pathTransition: 'none',
  
      // Colors
      pathColor: `rgb(17 86 187`,
      textColor: '#000000',
      trailColor: '#f5dd64',
      backgroundColor: '#3e98c7',
    })}
  />
  )
  
 }

const formatNumber = (x) => {
  if(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return x
};

const MyMyPoints = () => {
  const {data, status} = useMyFetchStuffs()

  const { userPoints, loading } = useFetchStat();
  const history = useHistory()
  const me =  formatNumber(userPoints)
  return (
    <div  type="button"  onClick={()=>{
      history.push('/transactions?type=points')
    }}
      className={`${mypoints.stackcard} ${mypoints.mypoints}`}
      style={{ width: "100%", height: "100%" }}
    >
      

      <div type="button"  onClick={()=>{
        history.push('/transactions?type=points')
      }} className={mypoints.pointstitle} style={{fontWeight:"600"}}>
        
        My Points</div>
      <div className="progress">
        <div
          className="progress-bar bg-info"
          role="progressbar"
          style={{ width: "10%" }}
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      {status != "success" ? <Spinner cz="30px" />: <Progress userPoints={formatNumber(data?.mypoints)} />}
      
    </div>
  );
};

export default MyMyPoints;


