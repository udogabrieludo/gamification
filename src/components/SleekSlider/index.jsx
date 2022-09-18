import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Spinner } from "react-bootstrap";

import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./main.css";
import redeemright from "../../assets/svg/redeem-right.svg";
import redeemleft from "../../assets/svg/redeem-left.svg";
import Nodata from '../../components/NoData/index'
//////

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    
    <div
      className={className}
      style={{ ...style, display: "block", background: "transaparent" }}
      onClick={onClick}
    >
      <img src={redeemright} alt="right" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transaparent" }}
      onClick={onClick}
    >
      <img src={redeemleft} alt="left" />
    </div>
  );
}

const settings = {
  dots: false,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // nextArrow: <SampleNextArrow />,
  //     prevArrow: <SamplePrevArrow />
};
const SleekSlider = ({userPoints}) => {
  const [loading, setLoading] = useState(false);
  const [rewards, setRewards] = useState([]);

  const getRewards = async () => {
    try {
      setLoading(true);
      const rewards = await axios.get(
        `${process.env.REACT_APP_PAYMENT_URL}/api/rewards`
      );
      setLoading(false);
      if (rewards?.status === 200) {
        setRewards(rewards?.data?.obj?.rewards);
       

      }
    } catch (error) {
   
      setLoading(false);
    }
  };

  useEffect(() => {
    getRewards();
  }, []);
  return (
    <div className="container">
    
      <Slider {...settings}>
        {loading ? (
          <div
            className="d-flex justify-content-center"
            style={{ gap: "3px", width: "100%" }}
          >
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
          </div>
        ) : rewards?.length > 0 ? (
          rewards.map((reward) => {
            
            return (
              <div style={{ marginTop: "20px" }}>
                <img style={{width:'200px'}}
                  src={reward?.imageUrl}
                  alt={reward?.name}
                  title={reward.name}
                  loading="lazy"
                />
              </div>
            );
          })
        ) : (
          <Nodata text="No Reward found"/>
        )}
        {/* //sdmdmd */}
      </Slider>
        <div>
                <strong>{userPoints ? userPoints : 0} points</strong>
              </div>
              <Link to="/rewards-prizes" style={{color: 'var(--humber-link)', fontWeight: 'bold'}}>View Prizes</Link>
    </div>
  );
};
export default SleekSlider;
