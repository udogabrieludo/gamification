import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NewCard from "../../components/PrizeCard/NewCard";
import { Spinner } from "react-bootstrap";
import PrizeCard from "../PrizeCard";
import FeatherIcon from "feather-icons-react";
import NoData from "../NoData";
import RewardCard from '../../components/PrizeCard/RewardCard'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const MultiCarousel = () => {
  const [loading, setLoading] = useState(false);
  const [rewards, setRewards] = useState([]);

  const getRewards = async () => {
    try {
      setLoading(true);
      const rewards = await axios.get(
        `${process.env.REACT_APP_PAYMENT_URL}/api/rewards`
      );
      if (rewards?.status === 200) {
        setRewards(rewards?.data?.obj?.rewards);
        setLoading(false);
       
      }
      setLoading(false);
    } catch (error) {
    
      setLoading(false);
    }
  };

  useEffect(() => {
    getRewards();
  }, []);
  return (
    <>
      {
        loading ? <div
               style={{ gap: "4px", width: "100%", height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
             >
               <Spinner animation="grow" size="sm" />
               <Spinner animation="grow" size="sm" />
               <Spinner animation="grow" size="sm" />
            </div>: rewards.length < 1 ? <NoData /> : <Carousel responsive={responsive}>
            {
              rewards.map((reward, i) => {
                       return (
                         <div key={`${i}carouse`} style={{ marginTop: "20px",margin:'15px 5px' }}>
                         <RewardCard width={'100%'} show={false}
                    isAvailable = {reward.isAvailable}
                    id={reward?.id}
                    points={reward.pointValue}
                    coins={reward.coinValue}
                    img={reward?.imageUrl}
                    title={reward?.name}
                    description={reward?.description}
                    page={true}
                    reward={reward}
                  />
                           {/* <NewCard 
                             id={reward?.id}
                             points={reward.pointValue}
                             coins={reward.coinValue}
                             img={reward?.imageUrl}
                           /> */}
                         </div>
                       );
                    })
            }
         </Carousel>
      }
    </>
  );
};

export default MultiCarousel;
