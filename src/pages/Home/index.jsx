import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StatsCard from "../../components/StatsCard";
import "./style.css";

import rightarrow from "../../assets/images/rightarrow.svg";
import { list } from "./list";
import Each from "./Each";
import { eachgame } from "../each-game";
import EachGame from "../EachGame";
import Wrapper, { HomeWrapper, Topping } from "../../components/Wrapper";
import UseProduct from "../../utils/UseProduct";
import Modal from "../../components/Modal";
import ProductCard from "../../components/ProductCard";
import ContestantCard from "../../components/ContestantCard";
import { message } from "antd";
import "antd/dist/antd.css";
import boostarrow from "../../assets/svg/boostarrow.svg";
import patlogo from "../../assets/images/patlogo.png";
import mary from "../../assets/images/mary.svg";
import greenarrowleft from "../../assets/svg/green-arrow-left.svg";
import redarrowright from "../../assets/svg/red-arrow-right.svg";
import Button from "../../components/Button";



const token = localStorage.getItem("token");
const myUserId = JSON.parse(localStorage?.getItem("user"));
const userId = myUserId?.userId;
const Home = (props) => {
  const [myAvatars, setMyAvatars] = React.useState([]);
  const [allAvatars, setAllAvatars] = React.useState([]);
  const [showBoostModal, setShowBootModal] = React.useState(false);
  const [showSwitchModal, setShowSwitchModal] = React.useState(false);
  const [buy, setBuy] = React.useState(false);
  const [boostType, setBoosType] = React.useState([
    { id: 1, name: "double", coin: 5 },
    { id: 2, name: "triple", coin: 10 },
  ]);
  const [pickedBoost, setPickedBoost] = React.useState("");
  const [pickedBoostAvatarId, setPickedBoostAvatarId] = React.useState("");
  const [onBoostBtn, setOnBoostBtn] = React.useState(true);
  const [showswitchslide, setShowSwitchSlide] = React.useState(false);
  const [user_avatar_id, set_user_avatar_id] = React.useState("");
  const [new_avatar_id, set_new_avatar_id] = React.useState("");
  const [picked, setPicked] = React.useState("");
  const [switchPicked, setSwitchPicked] = React.useState("");
  const [avatarloading, setAvatarLoading] = React.useState(true);

  // a get request to fetch each users avatar
  useEffect(() => {
    setAvatarLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/avatars/user?playground_id=e1cc5e63db834a8ead7ce374c6ed48b6`,
        {
          headers: {
            "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
            "user-id": `${userId}`,
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAvatarLoading(false);
       
        
        setMyAvatars(response.data.avatars);
      })
      .catch((err) => {
       
        setAvatarLoading(false);
      });
  }, []);

  //  sandbox.api.humbergames.com/avatars/avatars?user_id=60de3c86c1c2d9001ce711e3
  // a get request to fetch all avatars
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/avatars/avatars?user_id=${userId}`,
        {
          headers: {
            "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
            "user-id": `${userId}`,
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
          setAllAvatars(response.data);
      })
      .catch((err) => {
       
      });
  }, []);

  // a get request to purchase avartar
  const purchase = (avatarId) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/avatars/user/avatars/purchase?avatar_id=${avatarId}`,
        {
          headers: {
            "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
            "user-id": `${userId}`,
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        
        setBuy(false);
        message.success('avatar purchasing', response)
      })
      .catch((err) => {
        
        message.error(err.response?.data?.detail)
      });
  };
  const buyAvatar = () => {
    setBuy(true);
    
  };

  const handlebuy = () => {
    setBuy(false);
  };

  const purchaseAvatar = (avatarId) => {
  
    purchase(avatarId);
  };
  let checker = {};

  const hanldeBoost = (diid) => {
    setShowBootModal(true);
    setPickedBoostAvatarId(diid);
    
  };
  const selectBoostType = (name, id) => {
    setPickedBoost(name);
    const awe = boostType.filter((boot) => boot.id === id);
   
    if (awe[0].id === id) {
      setPicked(id);
    }

    setOnBoostBtn(false);
    // console.log('name of boost ', name, 'selected avatar id', avartid)
  };

  const onBoost = () => {
    // if(pickedBoost && pickedBoostAvatarId){
    //     setOnBoostBtn(false)
    // }
    
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/avatars/user/boost?boost_type=${pickedBoost}&user_avatar_id=${pickedBoostAvatarId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
            "user-id": userId,
          },
        }
      )
      .then((response) => {
       
        if (response.data.type) {
          message.success("boost activated succesfully");
          setShowBootModal(false);
        }
      })
      .catch((error) => {
        
        if (error) {
          message.error("User Avatar has an active boost");
          setShowBootModal(false);
        }
      });
    // https://sandbox.api.humbergames.com/avatars/user/boost?boost_type=double&user_avatar_id=f1d134b97797475faa1ba7cda66b5b3c
  };

  const hanldeSwitchModal = (label, theid) => {
    setShowSwitchModal(true);
    set_user_avatar_id(theid);
     };
  const bothSwitchAvatar = (label, iid) => {
    setShowSwitchModal(false);
    setShowSwitchSlide(true);
    set_new_avatar_id(iid);
    setSwitchPicked(iid);
    
  };

  const handleCancelSlide = () => {
    setShowSwitchSlide(false);
  };

  const handleSwitchPurchase = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/avatar/user/avatars/switch?user_avatar_id=${user_avatar_id}&new_avatar_id=${new_avatar_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
            "user-id": userId,
          },
        }
      )
      .then((response) => {
      
      })
      .catch((error) => {
        console.log(error);
      });
    };
  const { productModal, setProductModal, closeModal, product } = props;

  const showAvatarPlaceHolder = () => {
    let placeHolders = [];
    const maxAvatars = 3;
    const loop = maxAvatars - myAvatars.length;
    if (myAvatars && myAvatars.length < maxAvatars) {
      for (let i = 0; i < loop; i++) {
        placeHolders.push(
          <ContestantCard
            onAdd={buyAvatar}
            key={i}
            empty={true}
          />
        );
      }
    }
    return placeHolders;
  };
  return (
    <React.Fragment>
      <HomeWrapper>
        <div className="home-stats">
          <StatsCard />
        </div>
        <div className="gamerss">
          <div>Games</div>
          <div className="home-games-layout">
            {eachgame.map((each) => (
              <EachGame each={each} />
            ))}
          </div>
        </div>
      </HomeWrapper>
      <Topping>
        <div className="toppings-title">
          <div className="ava">My Avatars</div>
          <div className="toppings-view-avatar">
            <Link to="/avatars" className="view-ava">
              View all Avatars
            </Link>
            <img src={rightarrow} alt="rightarrow" />
          </div>
        </div>
      </Topping>
      <div className="owned-avatars">
        {avatarloading ? (
          <div>..loadingg</div>
        ) : (
          <>
            {myAvatars.slice(0, 3).map((myavatar) => {
              checker = myavatar;
              return (
                <>
                  <ContestantCard onAdd={buyAvatar}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img 
                      style={{width: '50px', height: '50px'}}
                    //   src={myavatar?.avatar?.image}
                      src={mary}
                       alt="timidakolo" />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "20px",
                        }}
                      >
                        <div style={{ fontSize: "19px", fontWeight: "500" }}>
                          {myavatar?.avatar?.label}
                        </div>
                        <div style={{ color: "#A3A3A3" }}>
                          Contestant {myavatar?.avatar?.contestantId}
                        </div>
                      </div>
                    </div>
                    <div style={{ margin: "20px 0 10px 0", fontSize: "12px" }}>
                      <div
                        style={{
                          background: "#E6F2E8",
                          position: "relative",
                          margin: "7px 0",
                          borderRadius: "15px",
                          padding: "3px 10px",
                          maxWidth: "80px",
                        }}
                      >
                        Vocal ({myavatar?.avatar?.vocals})
                        <div className="upperball-one">
                          <div>+10</div>
                        </div>
                      </div>
                      <div
                        style={{
                          background: "#F20000",
                          margin: "7px 0",
                          opacity: "0.4",
                          borderRadius: "15px",
                          maxWidth: "80px",
                          padding: "3px 10px",
                        }}
                      >
                        Social ({myavatar?.avatar?.socials})
                      </div>
                      <div
                        style={{
                          background: "#E6F2E8",
                          position: "relative",
                          margin: "7px 0",
                          borderRadius: "15px",
                          maxWidth: "125px",
                          padding: "3px 10px",
                        }}
                      >
                        Performance ({myavatar?.avatar?.performance || 0})
                        <div className="upperball-one">
                          <div>+12</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ position: "relative", marginTop: "15px" }}>
                      <div style={{ fontSize: "32px", color: 'black', fontWeight: "bold" }}>
                        {myavatar?.avatar.points || '201'}
                        <span style={{ fontSize: "11px" }}>Pts</span>
                      </div>
                      <div className="upperball">
                        <div>+32</div>
                      </div>
                    </div>
                    <div
                      className="last-row"
                      style={{
                        display: "flex",
                        fontWeight: "bold",
                        fontSize: "13px",
                        padding: "10px 0",
                      }}
                    >
                      <div
                        onClick={() => hanldeBoost(myavatar.avatar_id)}
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ color: "#0A7815" }}>Boost Points</div>
                        <img
                          style={{ marginLeft: "10px" }}
                          src={rightarrow}
                          alt="rightarrow"
                        />
                      </div>
                      <Link
                        onClick={() =>
                          hanldeSwitchModal(myavatar.avatar.label, myavatar.id)
                        }
                        style={{
                          textDecoration: "none",
                          color: "#FF2200",
                          marginLeft: "70px",
                        }}
                      >
                        Switch
                      </Link>
                    </div>
                  </ContestantCard>
                </>
              );
            })}
            {showAvatarPlaceHolder()}
          </>
        )}
      </div>
      {showBoostModal && (
        <Modal closeModal={() => setShowBootModal(false)}>
          <h3
            style={{
              textAlign: "center",
              textTransform: "capitalize",
              marginBottom: "30px",
            }}
          >
            boost points
          </h3>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10%",
                minHeight: "150px",
                borderRadius: "15px",
              }}
            >
              {boostType.map((boot) => (
                <div
                  key={boot.id}
                  className={`each-boost ${
                    boot.id === picked && "pickedboost"
                  }`}
                  onClick={() => {
                    selectBoostType(boot.name, boot.id);
                  }}
                >
                  {boot.name === "double" ? (
                    <div style={{ marginTop: "20px" }}>
                      <img src={boostarrow} alt="boostarrow" />
                      <img src={boostarrow} alt="boostarrow" />
                    </div>
                  ) : (
                    <div style={{ marginTop: "20px" }}>
                      <img src={boostarrow} alt="boostarrow" />
                      <img src={boostarrow} alt="boostarrow" />
                      <img src={boostarrow} alt="boostarrow" />
                    </div>
                  )}
                  <div style={{ marginTop: "20px" }}>{boot?.name} boost</div>
                  <p style={{ marginTop: "20px" }}>
                    Costs{" "}
                    <span style={{ color: "#123A74" }}>{boot?.coin} coins</span>
                  </p>
                </div>
              ))}
            </div>
            <div>
              <button
                className="myBoostBtn"
                onClick={onBoost}
                disabled={onBoostBtn}
              >
                <div>boost</div>
                <img
                  style={{ margin: "7px 0 0 10px", height: "10px" }}
                  src={rightarrow}
                  alt="rightarrow"
                />
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showSwitchModal && (
        <Modal closeModal={() => setShowSwitchModal(false)}>
          <div style={{ textAlign: "center" }}>
            <p>Available Avatars when you click on switch</p>
            <div
              style={{
                width: "80%",
                margin: "0 auto",
                display: "flex",
                columnGap: "10%",
                rowGap: "20px",
                flexWrap: "wrap",
                overflow: "scroll",
                height: "350px",
              }}
            >
              {allAvatars && allAvatars.length
                ? allAvatars
                    .filter((oneavatar) => oneavatar?.id !== checker?.avatar_id)
                    .map((check) => (
                      <div
                        className={`switch-card ${
                          switchPicked === check.id && "switch-card-bg"
                        }`}
                        onClick={() =>
                          bothSwitchAvatar(check?.label, check?.id)
                        }
                      >
                        <img
                          src={patlogo}
                          alt="patlogo"
                          style={{
                            width: "30px",
                            marginTop: "20px",
                            borderRadius: "50%",
                          }}
                        />
                        <div style={{ marginTop: "20px" }}>{check?.label}</div>
                        <div
                          style={{
                            backgroundColor: "#1290df",
                            color: "#ffffff",
                            margin: "10px auto",
                            padding: "5px 10px",
                            borderRadius: "15px",
                            width: "100px",
                          }}
                        >
                          {check?.meta.status}
                        </div>
                        {/* <div>{check?.id}</div> */}
                        <div>points</div>
                        <div
                          style={{
                            width: "50px",
                            margin: "10px auto",
                            height: "50px",
                            borderRadius: "50%",
                            border: "2px solid #2c6ba5",
                            display: "flex",
                            justifyContent: "center",
                            placeItems: "center",
                          }}
                        >
                          {check?.last_added_score}
                        </div>
                      </div>
                    ))
                : ""}
            </div>
          </div>
        </Modal>
      )}
      {showswitchslide && (
        <Modal closeModal={() => setShowSwitchSlide(false)}>
          <p style={{ textAlign: "center", fontSize: "17px" }}>
            Are you sure you want to switch
          </p>
          <div style={{ width: "80%", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "45%",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    marginTop: "20px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "gray",
                  }}
                ></div>
                <div style={{ marginTop: "20px", fontSize: "16px" }}>
                  name two
                </div>
              </div>
              <div
                style={{
                  width: "10%",
                  padding: "30px 0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img
                  src={greenarrowleft}
                  alt="greenarrowleft"
                  style={{ width: "30px" }}
                />
                <img
                  src={redarrowright}
                  alt="greenarrowleft"
                  style={{ width: "30px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "45%",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    marginTop: "20px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "gray",
                  }}
                ></div>
                <div style={{ marginTop: "20px", fontSize: "16px" }}>
                  {" "}
                  name one
                </div>
              </div>
            </div>
            <div>
              <button className="myBoostBtn" onClick={handleSwitchPurchase}>
                confirm switch
              </button>
            </div>
            <div>
              <button className="myBoostBtn" onClick={handleCancelSlide}>
                cancel
              </button>
            </div>
            <p
              style={{
                fontSize: "15px",
                textAlign: "center",
                marginTop: "40px",
              }}
            >
              This will cost you{" "}
              <span style={{ color: "red" }}>20% of the Avatars points</span>
            </p>
          </div>
        </Modal>
      )}
      {buy && (
        <Modal closeModal={handlebuy}>
          <div style={{ textAlign: "center" }}>
            <h3>Available Avatars </h3>
            <div
              style={{
                width: "80%",
                margin: "0 auto 30px auto",
                display: "flex",
                columnGap: "10%",
                rowGap: "20px",
                flexWrap: "wrap",
                overflow: "scroll",
                height: "350px",
                padding: '10px'
              }}
            >
            {allAvatars && allAvatars.length
              ? allAvatars
                  .filter((oneavatar) => oneavatar?.id !== checker?.avatar_id)
                  .map((check) => (
                    <div className="buying">
                      <div>label: {check?.label}</div>
                      <div>status: {check?.meta.status}</div>
                      {/* <div>{check?.id}</div> */}
                      <div>{check?.last_added_score}</div>
                      <button onClick={() => purchaseAvatar(check.id)}>
                        purchase
                      </button>
                    </div>
                  ))
              : ""}
            </div>
          
          </div>
        </Modal>
      )}
      {productModal && (
        <Modal closeModal={closeModal}>
          <ProductCard productsService={product} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Home
