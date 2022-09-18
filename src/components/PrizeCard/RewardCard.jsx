import React, { useState, useEffect, useContext } from "react";
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
import rewardcss from "./rewardcard.module.css";
import { StatsContext } from "../../context/";
import SelectAccount from "./SelectAccount";
import FeatherIcon from "feather-icons-react";

const { Option } = Select;

function RewardCard({
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
  reward,
  show=true,
  width,
  margin
}) {
  const { data } = useMyFetchStuffs();
  const history = useHistory();
  const { userCoins, userPoints } = useFetchStat();
  const [read, setRead] = useState(false);
  const [gameRewardId, setGameRewardId] = useState(id);
  const [qnt, setQnt] = useState(1);
  const [openType, setOpenType] = useState("select");
  const [valueType, setValueType] = useState("COINS");
  const [pickType, setPickType] = useState(false);
  const { token } = isAuthenticated();
  const [loading, setLoading] = useState(false);
  const [prizeValue, setPrizeValue] = useState("");
  const [ticker, setTicker] = useState();
  const [selectedAccount, setSelected] = useState({});

  const {
    state: { stat, account },
  } = useContext(StatsContext);
  useFetchStat();

  const redeemPrize = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_PAYMENT_URL}/api/user-rewards`,
        {
          rewardId: gameRewardId,
          qnt: qnt,
          valueAmount: ticker,
          valueType: valueType,
          collectionChannel: "BANKACCOUNT",
          collectionChannelId: selectedAccount?.accountNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);

      if (result.data.desc === "OK" && result.data.status === 0) {
        setRead(false);
        message.success({
          content: "Your request has been received successfully!  and it will be processed within 24 hours",
          duration: 10,
        });
        setTimeout(() => {
          // window.location.reload();
          history.push("/redeemed");
        }, 2000);
      } else {
        message.error({
          content: result.data.desc,
          duration: 5,
        });
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
  // NONCASH
  const redeemCoins = () => {
    if (data.mycoins < coins) {
      message.error({
        content: "You do not have enough coins to make redeem this prize",
        duration: 5,
      });
    } else if (reward.rewardType === "NONCASH") {
     
      setOpenType('redeem')
      setRead(true);
      setPrizeValue("coins");
      setTicker(coins);
      setSelected({})
      setSelected({...selectedAccount, accountNumber:account[0]?.accountNumber})
      
      // message.error("You can only redeem cash prices");
      setValueType("COINS");
    } else {
      setOpenType("select");
      setRead(true);
      setPrizeValue("coins");
      setTicker(coins);
      setValueType("COIN");
    }
  };

  const isAuthentorized = () => {
    let isAuthorized = "";
  };

  const redeemPoints = () => {
    console.log(reward.rewardType);
    if (data.mypoints < points) {
      message.error({
        content: "You do not have enough points to make redeem this prize",
        duration: 5,
      });
    } else if (reward.rewardType === "NONCASH") {
      setOpenType('redeem')
      setRead(true);
      setPrizeValue("points");
      setTicker(points);
      setValueType("POINT");
      setSelected({...selectedAccount, accountNumber:account[0]?.accountNumber})
      // message.error("You can only redeem cash prices");
    } else {
      setOpenType("select");
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
      <div style={{width:width ? width:null}} className={`${rewardcss.wrap} position-relative`} key={id}>
        {/* {
          reward.inStock === 0 && (
            <div className={rewardcss.out_of_stock}>
            <div className={rewardcss.out_of_stock_text}>
              Out of stock
            </div>
          </div>
          )
        }
        {
          reward.isAvailable === 'NO' && (
            <div className={rewardcss.out_of_stock}>
            <div style={{color:'#252384'}} className={rewardcss.out_of_stock_text}>
              Comming Soon
            </div>
          </div>
          )
        } */}

        <div className="img-holder" style={{ margin: "5px", height: "140px" }}>
          <img
            src={img}
            alt="price card"
            style={{ width: "100%", height: "140px", objectFit: "contain" }}
            loading="lazy"
          />
        </div>
        <div
          className="d-flex"
          style={{
            margin: "10px 0",
            padding: "9px 10px 0px",
            flexDirection: "column",
          }}
        >
          <div className={rewardcss.reward_title}>{title}</div>
          {
            reward?.inStock === 0 && show ? (
              <div style={{textAlign: 'center',
    color: '#766060'}} >Not available</div>
            ) : reward.isAvailable  === 'NO' && show ? ( 
              <div style={{textAlign: 'center',
    color: '#766060'}}  >Coming soon</div>
            ) : (
              null
            )
          }

          {
            reward?.inStock === 0 && reward.isAvailable  === 'NO' &&  (
              <div
            style={{ fontSize: 13, marginBottom: 3, display: "flex", gap: 5 }}
          >
            <span style={{ fontWeight: "bold" }}>Total number of items:</span>
            <span>{new Intl.NumberFormat().format(reward?.inStock)}</span>
          </div>
            )
          }

         {
           token && (
             <>
             {
            reward?.inStock === 0 ? (
              null
            ) : reward.isAvailable  === 'NO' ? ( 
            null
            ) : (
              <>
              {
               show && (
                 <>
                 <div
            style={{ fontSize: 13, marginBottom: 3, display: "flex", gap: 5 }}
          >
            <span style={{ fontWeight: "bold" }}>Total number of items:</span>
            <span>{new Intl.NumberFormat().format(reward?.inStock)}</span>
          </div>
              <div className="d-flex justify-content-between">
            <div
              className={rewardcss.value_wrapper}
              style={{ flexDirection: "column", gap: 5 }}
              className=" d-flex"
            >
              <div>
                <span style={{ fontWeight: "bold" }}>Point values:</span>{" "}
                <span>{new Intl.NumberFormat().format(points)}</span>{" "}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Coin values:</span>{" "}
                <span>{new Intl.NumberFormat().format(coins)}</span>
              </div>
            </div>
            <div
              style={{ flexDirection: "column", gap: 5 }}
              className=" d-flex"
            >
              <button
                type="button"
                className={`${rewardcss.mybtn} ${rewardcss.mypointbtn}`}
                onClick={redeemPoints}
              >
                Redeem
              </button>
              <button
                type="button"
                className={`${rewardcss.mybtn} ${rewardcss.myrebtn}`}
                onClick={redeemCoins}
              >
                Redeem
              </button>
            </div>
          </div>
                 </>
               )
              }
              
          </>
            )
          }
             </>
           )
         }

          
         
          
          {/* <div className="d-flex justify-content-between align-items-center mt-1">
            <div>
              <span>Point Value:</span>
              <span>{new Intl.NumberFormat().format(points)}</span>
            </div>
            <button
              type="button"
              className={`${rewardcss.mybtn} ${rewardcss.mypointbtn}`}
              onClick={redeemPoints}
            >
              Redeem
            </button>
          </div> */}
          {/* <div className="d-flex justify-content-between align-items-center mt-1">
            <div>
              <span>Coin Value:</span>
              <span>{new Intl.NumberFormat().format(coins)}</span>
            </div>
            <button
              type="button"
              className={`${rewardcss.mybtn} ${rewardcss.mypointbtn}`}
              onClick={redeemCoins}
            >
              Redeem
            </button>
          </div> */}
        </div>
        {/* <div style={{margin: '10px 0', padding: "15px 0 0 0" }}>
          <div
            style={{ color: "#000", fontWeight: "bold", textAlign: 'center', fontSize: "16px" }}
          >
            {title}({reward?.inStock})
          </div>
        
        </div> */}
        {/* <div
          style={{ flexDirection: "column" }}
        >
          <div
            style={{
              fontSize: "14px",
              textAlign: 'center'
         
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
            {!not && cashed &&  (
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#2FDD2B" }}
              >
                Redeemed
              </button>
            )}
            {!not && !cashed && token && (
              <button type="button" 
          
              className={`${rewardcss.mybtn} ${rewardcss.myrebtn}`}
              onClick={redeemCoins}>
                Redeem with coins
              </button>
            )}
            {!not && !cashed && token  && (
              <button
              
                type="button"
             
                className={`${rewardcss.mybtn} ${rewardcss.mypointbtn}`}
                onClick={redeemPoints}
              >
                Redeem with points
              </button>
            )}
          </div>
        </div> */}
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
          <>
            {openType === "select" && (
              <SelectAccount
                setOpenType={setOpenType}
                setSelected={setSelected}
                selectedAccount={selectedAccount}
                account={account}
              />
            )}
          </>
          <>
            {openType === "redeem" && (
              <div className="wayu">
                {reward.rewardType !== "NONCASH" && (
                  <FeatherIcon
                    className="d-flex justify-content-start mb-2"
                    type="button"
                    onClick={() => setOpenType("select")}
                    icon="corner-up-left"
                  />
                )}
                <img src={img} alt="img-to-redeem" className="theimg" />
                <div className="pointer-prize">
                  <span className="pointer-cost">Cost:</span>&nbsp;&nbsp;
                  <span className="pointer-points">
                    {ticker} {prizeValue}{" "}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: ".9rem",
                    color: "var(--humber-black)",
                    padding: ".8rem 0",
                  }}
                >
                  Are you sure you want to redeem this item?
                </div>
                <div className="btn-roller">
                  <button
                    className="rbtn"
                    onClick={redeemPrize}
                    disabled={loading}
                  >
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
            )}
          </>
        </Modal>
      )}
    </>
  );
}

export default RewardCard;
