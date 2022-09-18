import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";
import Star from "../../assets/images/png/Star.png";
import Coin from "../../assets/images/png/coin.png";
import Modal, { BModal } from "../../components/Modal";
import { message } from "antd";
import { useFetchStat } from "../../utils/useFetchStat";
import { useMyFetchStuffs } from "../../utils/taofikFetch";
import { Select } from "antd";
// import CustomModal from '../../components/CustomModal/CustomModal';
import styles from "./reward.module.css";
import { isAuthenticated } from "../../utils/authdata";
import CustomModal from "react-bootstrap/Modal";

const { Option } = Select;

function NewCard({
  tag,
  className,
  points,
  coins,
  page,
  title,
  description,
  img,
  not,
  cashed,
  id,
}) {
  const { data } = useMyFetchStuffs();
  const history = useHistory();
  const { userCoins, userPoints } = useFetchStat();
  const [read, setRead] = useState(false);
  const [gameRewardId, setGameRewardId] = useState(id);
  const [qnt, setQnt] = useState(1);
  const [valueAmount, setValueAmount] = useState(points);
  const [valueType, setValueType] = useState("COINS");
  const [pickType, setPickType] = useState(false);
  const { token } = isAuthenticated();
  const [loading, setLoading] = useState(false);
  const [prizeValue, setPrizeValue] = useState("");
  const [ticker, setTicker] = useState();

  const redeemPrize = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_GUESS_GAME_URL}/game-user-reward`,
        {
          gameRewardId: gameRewardId,
          qnt: qnt,
          valueAmount: valueAmount,
          valueType: valueType,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      setLoading(false);
      if (result.data.desc === "OK" && result.data.status === 0) {
        setRead(false);
        message.success({
          content: "You have succesfully redeemed this prize",
          duration: 5,
        });
        setTimeout(() => {
          history.push('/redeemed')
        }, 1500);
      }
    } catch (error) {
      
      if (error.response.status != 200) {
        message.error({
          content: `${error?.response?.data?.desc}` || "unable to connect",
        });
      }
      setRead(false);
      setLoading(false);
    }
  };

  const onRedeem = () => {
    if (userCoins >= points || userPoints >= points) {
      setPickType(true);
    } else {
      setRead(true);
    }
    if (userCoins >= points) {
      setValueType("COINS");
    }
    if (userPoints >= points) {
      setValueType("POINT");
    }
    if (userCoins < points && userPoints < points) {
      message.error({
        content: "You do not have sufficient coins to purchase this prize",
        duration: 5,
      });
      return;
    }
  };

  const redeemCoins = () => {
    if (data.mycoins < coins) {
      message.error({
        content: "You do not have enough coins to make redeem this prize",
        duration: 5,
      });
    } else {
      setRead(true);
      setPrizeValue("coins");
      setTicker(coins);
      setValueType("COINS");
    }
  };

  const redeemPoints = () => {
    if (data.mypoints < points) {
      message.error({
        content: "You do not have enough points to make redeem this prize",
        duration: 5,
      });
    } else {
      setRead(true);
      setPrizeValue("points");
      setTicker(points);
      setValueType("POINT");
    }
  };

  const handlePick = (event) => {
    setValueType(event.target.value);
    if (valueType) {
      setPickType(false);
      setRead(true);
    }
  };
  return (
    <>
      <div style={{ marginRight: "20px" ,padding:'5px' , borderRadius: '10px', width:'94%', background: 'var(--humber-light)' }} key={id} >
        <div
          className="img-holder"
          style={{ position: "relative", height: "120px" }}
        >
          <div>
            <img
              src={img}
              alt="price card"
              style={{ width: "100%", height: "120px", objectFit: "contain" }}
              loading="lazy"
            />
          </div>
        </div>
        <div style={{margin: '10px 0', padding: "15px 0 0 0" }}>
          <div
            style={{ color: "#16407A", fontWeight: "bold", fontSize: "12px" }}
          >
            {title}
          </div>
          {/* <p className="desc" style={{color: '#000'}}>{description}</p> */}
        </div>
        <div
          style={{ flexDirection: "column" }}
        >
          <div
            style={{
              fontSize: "10px",
              display: "flex",
              justifyContent: "center",
              color:"var(--humber-primary)"

            }}
          >
            {`  ${
              points >= 1 && new Intl.NumberFormat().format(points)
            } points`}
            {`${points > 0 ? " /" : ""} `}
            {`${coins >= 1 && new Intl.NumberFormat().format(coins)} coins`}
            {points <= 0 && ""}
            {coins <= 0 && ""}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              marginTop: "15px",
              width: "100%",
            }}
          >
            {!not && cashed && (
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#2FDD2B" }}
              >
                Redeemed
              </button>
            )}
            {!not && !cashed && (
              <button type="button" className="myrebtn" onClick={redeemCoins}>
                Redeem with coins
              </button>
            )}
            {!not && !cashed && (
              <button
                type="button"
                className="mypointbtn"
                onClick={redeemPoints}
              >
                Redeem with points
              </button>
            )}
          </div>
        </div>
      </div>
      {/* {
      pickType && <Modal style={{marginTop: '200px'}}
      cancelIcon={true}
          closeModal={()=> setPickType(false)}
          space={{ maxWidth: "476px" }}>
        <div style={{textAlign: 'center', padding: '20px'}}>
        <h3>Pick an option to be debited from</h3>
        <select onChange={handlePick} style={{width: '180px', height: '40px', padding: 5}} value={pickType}>
          <option value="select" disabled>Select</option>
          <option value="COIN">coin</option>
          <option value="POINT" >point</option>
        </select>
        </div>
      </Modal>
    } */}
      <CustomModal
        close
        centered
        size="lg"
        dialogClassName="reward_modal"
        show={pickType}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => {
          setPickType(false);
        }}
      >
        <CustomModal.Header closeButton />
        <CustomModal.Body>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h3 className={`${styles.h3}`}>
              Pick an option to be debited from
            </h3>
            <select
              className={`${styles.select_option}`}
              onChange={handlePick}
              style={{ width: "180px", height: "40px", padding: 5 }}
              value={pickType}
            >
              <option value="" selected>
                Select
              </option>
              <option value="COIN">COIN</option>
              <option value="POINT">POINT</option>
            </select>
          </div>
        </CustomModal.Body>
      </CustomModal>
      {read && (
        <Modal
          dialogClassName="reward_modal1"
          modalClass={"kkk"}
          style={{ marginTop: "200px" }}
          cancelIcon={true}
          closeModal={() => setRead(false)}
          space={{ maxWidth: "576px" }}
        >
          <div className="wayu">
            <img src={img} alt="img-to-redeem" className="theimg" />
            <div className="pointer-prize">
              <span className="pointer-cost">Cost</span>&nbsp;&nbsp;
              <span className="pointer-points">
                {ticker} {prizeValue}{" "}
              </span>
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "var(--humber-primary)",
                padding: "1.2rem 0",
                fontWeight: "bold",
              }}
            >
              Are you sure you want to redeem this item?
            </div>
            <div className="btn-roller">
              <button className="rbtn" onClick={redeemPrize} disabled={loading}>
                {loading ? "loading..." : "Redeem"}
              </button>
              <button
                className="rbtn1"
                type="button"
                onClick={() => history.push("dashboard")}
              >
                Play Game
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default NewCard;
