import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import PrizeCard from '../../components/PrizeCard'
import { Spinner } from "react-bootstrap";

import PrizeLayout from '../../components/PrizeLayout'
import FeatherIcon from 'feather-icons-react'
import Activities from '../../components/Activities/activities'
import ReactPaginate from "react-paginate"
import { StatsContext } from '../../context/'
import Nodata from '../../components/NoData/index'
import { useFetchStat } from "../../utils/useFetchStat";
import {message } from 'antd'
import { isAuthenticated } from "../../utils/authdata";


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

const Redeemed = () => {
  const tokenObj = JSON.parse(localStorage.getItem("user")) || "";
  const [loading, setLoading] = useState(false)
  const [rewards, setRewards] = useState([])
  const pageLimit = 12
  const currentPage = 0
  const [count, setCount] = useState()
  const PageCount = Math.ceil(count / pageLimit)
  const { token } = isAuthenticated()
  const { state:{stat, account} } = useContext(StatsContext)
  const paginateReward = ({selected}) =>{
    getRewards(selected)
  }
  const getRewards = async(page) => {
    const filter = {
      page: page ? page - 1 : currentPage,
      size: pageLimit,
      orderDirection: "DESC",
      orderColumn: "id",
    };
    const URL = applyFilters(
      `${process.env.REACT_APP_PAYMENT_URL}/api/user-rewards`,
      { ...filter }
    );
    try{
      setLoading(true)
      const rewards = await axios.get( URL,{
          headers: { Authorization: `Bearer ${token}` }
        })
        
    
        setLoading(false)
      if(rewards?.status === 200){
          setRewards(rewards?.data?.obj?.userRewards)
        setCount(rewards?.data?.obj?.count)
        setLoading(false)
        
      }
      setLoading(false)
    }catch(error){
      console.log(error)
      setLoading(false)
      message.error('An error occured while getting redeemd')
    }
  }

  useEffect(()=>{
    getRewards()
  }, [])

    return (
        <div 
         className="zoom"
        style={{
            width: "90%",
        paddingBottom: "50px",
        minHeight: "100vh",
        margin: "50px auto",
       
        }}
        // style={{minHeight: '100vh', marginBottom: '100px'}}
        >
            <Activities stat={stat} />
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                <div style={{color:"var(--humber-primary)", fontWeight: 'bold', fontSize: '18px'}}>Redeemed Prizes</div>
             
                </div>
                <Link to="rewards-prizes" style={{color:"var(--humber-primary)",  fontWeight: 'bold', fontSize: '16px'}}>Rewards & Prizes</Link>
            </div>

            <PrizeLayout 
              title={ rewards?.length == 0 ? null : "List of prizes you have won"}
              description=""
            >
              {loading ? 
              <div className="d-flex justify-content-center" style={{gap:'3px', width: '100%'}}>
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" size="sm" />
            </div>
              : rewards?.length < 1 ? 
             
              <div style={{display: 'flex', flexDirection: 'column', margin: '0 auto',  color:"var(--humber-primary)", textAlign: 'center'}}>
                <div><FeatherIcon size="35px" color="var(--humber-primary)" icon="inbox" /></div>
                <div>No Prizes have been redeemed yet!</div>
              </div> 
            
              : rewards?.map(reward => {
                return(
                  <PrizeCard key={reward.id} 
                    reward={reward}
                    cashed={true} 
                    points={reward.pointValue}
                    img={reward?.gameReward?.imageUrl}
                    title={reward?.gameReward?.name}
                    Amount={reward?.valueAmount}
                    dvalueType={reward?.valueType}
                    rewardStatus={reward?.rewardStatus}
                  />
                )
              })}
            </PrizeLayout>
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
        </div>
    )
}

export default Redeemed
// pageCount={PageCount} onPageChange={paginateReward}