import React, {useState, useEffect} from "react";
import axios from 'axios'
import PrizeCard from "../../components/PrizeCard";
import styles from "./style.module.css";
import { Spinner } from "react-bootstrap";
import Navbar from '../../pages/landingPage/MainMenu/Navbar'
import { BreadCrumb, Main } from "../../components";
import PrizeLayout from '../../components/PrizeLayout'
import { Pagination } from 'antd'
import ReactPaginate from "react-paginate"
import FeatherIcon from 'feather-icons-react'
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
function Prizes() {
  const [loading, setLoading] = useState(false)
  const [rewards, setRewards] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
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
    };
    const URL = applyFilters(
      `${process.env.REACT_APP_GUESS_GAME_URL}/game-reward`,
      { ...filter }
    );
    try{
      setLoading(true)
      const rewards = await axios.get(URL)
      if(rewards?.status === 200){
        setCount(rewards?.data?.obj?.count)
        setRewards(rewards?.data?.obj?.gameReward)
        setLoading(false)
             }
    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(()=>{
    getRewards()
  }, [])
  return (
    <div className="help">
      {/* <HeaderNav toplay={true} landing={true} /> */}
      <Navbar />
      <BreadCrumb  title=' Rewards & Prizes'  subtitle='List of prizes to be won'/>    

     
    <Main>
      <PrizeLayout 
        title="Prizes to be won"
        description=""
      >
      {loading ? 
                <div className="d-flex justify-content-center" style={{gap:'3px', width: '100%'}}>
                  <Spinner animation="grow" size="sm" />
                  <Spinner animation="grow" size="sm" />
                  <Spinner animation="grow" size="sm" />
                </div>
              : rewards ? rewards.map(reward => {
                //jjsj
                return(
                  <PrizeCard 
                  not={true}
                    points={reward.pointValue}
                    img={reward?.imageUrl}
                    title={reward?.name}
                    description={reward?.description}
                    coinVal={reward?.coinValue}
                    pointVal={reward?.pointValue}
                    key={reward?.id + 'reward'}
                  />
                )
              }) : ''}

             
      </PrizeLayout>
      <div style={{color:'white'}} className="d-flex justify-content-center ">
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
      </Main>
    </div>
  );
}

export default Prizes;
