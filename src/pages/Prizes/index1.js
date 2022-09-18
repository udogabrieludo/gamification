import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import rewardsprizes from './rewardsprizes.module.css'
// import Stack from '../../components/Stack'
// import NewCard from '../../components/PrizeCard/NewCard'
import PrizeLayout from '../../components/PrizeLayout'
import { Spinner } from "react-bootstrap";

import FeatherIcon from 'feather-icons-react'
import RewardCard from '../../components/PrizeCard/RewardCard'
import Navbar from '../../pages/landingPage/MainMenu/Navbar'
import { BreadCrumb, Main } from "../../components";
// import Activities from "../../components/Activities/activities";
// import { StatsContext } from '../../context/'
import ReactPaginate from "react-paginate"
const applyFilters = (url, filter) => {
  if (filter) {
    let filteredEntities = "";
    if (url.indexOf("?") === -1) {
      url += "?";
    } else {
      url += "&";
    }

    Object.keys(filter).forEach((key) => {
      filteredEntities += `${key}=${filter[key]}&`;
    });

    if (filteredEntities.slice(-1) === "&") {
      filteredEntities = filteredEntities.slice(0, -1);
    }

    return url + filteredEntities;
  }

  return url;
};
const RewardsPrizes = () => {
  
  const [loading, setLoading] = useState(false)
  const [rewards, setRewards] = useState([])
  // const { state:{stat} } = useContext(StatsContext)
  const currentPage = 0;
  const [count, setCount] = useState()
  const pageLimit = 12
  const PageCount = Math.ceil(count / pageLimit)
  const paginateReward = ({selected}) =>{
    getRewards(selected)
  }
  const getRewards = async(page) => {

    const filter = {
      page: page ? page - 1 : currentPage,
      size: pageLimit,
      orderDirection: "DESC",
      orderColumn: "id",
      isAvailable:'YES'
    };

    const URL = applyFilters(
      `${process.env.REACT_APP_PAYMENT_URL}/api/rewards`,
      { ...filter }
    );
    try{
      setLoading(true)
      const rewards = await axios.get(URL)
      if(rewards?.status === 200){
        
        const isAvailable = rewards?.data?.obj?.rewards.filter(reward => reward.isAvailable === 'YES')
        
        setCount(rewards?.data?.obj?.count)
        setRewards(rewards?.data?.obj?.rewards)
        setLoading(false)
       
      }
      setLoading(false)
    }catch(error){
    
      setLoading(false)
    }
  }

  useEffect(()=>{
    getRewards()
  }, [])

    return (
        <div 
         className="zoom"
        style={{
            width: "100%",
        paddingBottom: "50px",
        minHeight: "100vh",
        // margin: "50px auto",
       
        }}
            
        // style={{minHeight: '100vh', marginBottom: '100px'}}
        >
         <Navbar />
      <BreadCrumb  title=' Rewards & Prizes'  subtitle='List of prizes to be won'/>  
            {/* <Activities stat={stat} /> */}
            {/* <div className={rewardsprizes.rand}>
                <div>
                <div className={rewardsprizes.randp}>Rewards & Prizes</div>
                <div className={rewardsprizes.randl}>List of prizes to be won</div>
                </div>
                <Link to="redeemed" className={rewardsprizes.randmyp}>My Redeemed Prizes</Link>
            </div> */}

            <PrizeLayout 
              title="Grand Prizes to be won"
              description=""
            >
              {loading ? 
              <div className="d-flex justify-content-center" style={{gap:'3px', width: '100%'}}>
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
            </div>
              : rewards?.length < 1 ? 
              <div style={{display: 'flex', flexDirection: 'column',color:"var(--humber-light)", margin: '70px auto', textAlign: 'center'}}>
                <div><FeatherIcon size="35px" color="var(--humber-primary)" icon="inbox" /></div>
                <div>No Prizes available yet!</div>
                </div> : rewards?.map((reward, i) => {
                return(
                  <RewardCard
                    isAvailable = {reward.isAvailable}
                    id={reward?.id}
                    points={reward.pointValue}
                    coins={reward.coinValue}
                    img={reward?.imageUrl}
                    title={reward?.name}
                    description={reward?.description}
                    page={true}
                    reward={reward}
                    margin ={'0 12px 0 12px'}
                    key={i + 'prizes'}
                  />
                )
              })}
            </PrizeLayout>
            {
          true &&   (
            <div className="d-flex justify-content-center align-items-center">
            <ReactPaginate  previousLabel={<FeatherIcon size=".8rem" icon="chevron-left"/>}
              nextLabel={<FeatherIcon size=".8rem" icon="chevron-right"/>}
              containerClassName={"paginationBttns"}
              pageCount={PageCount} onPageChange={paginateReward}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"} />
         </div>
          ) 
        }
        </div>
    )
}

export default RewardsPrizes
// 