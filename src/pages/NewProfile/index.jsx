import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import newprofile from "./newprofile.module.css";

import EditProfile from "../../components/EditProfile/index";
import AddAcount from "../../components/EditProfile/AddAcounts";

import settings from "../../assets/svg/settings.svg";

//import Modal from "../../components/Modal";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useFetchStat } from "../../utils/useFetchStat";
import SleekSlider from "../../components/SleekSlider";

import FeatherIcon from "feather-icons-react";
import { isAuthenticated } from "../../utils/authdata";
import Activities from "../../components/Activities/activities";
import { StatsContext } from "../../context/";
import { useHistory } from "react-router";
import NoData from "../../components/NoData";
import { bankCodes } from "../../utils/utils";
import { Spinner } from "react-bootstrap";
import { message } from "antd";

const GameTrans = (props) => {
  const { title, color, total, fail, win, trivia } = props;

  return (
    <div
      className={`${newprofile.gametrans} ${
        color === "guess"
          ? newprofile.guessbg
          : color === "scramble"
          ? newprofile.scramble
          : newprofile.triviabg
      }`}
    >
      <div
        className={` d-flex justify-content-between ${newprofile.title} ${
          color === "guess" ? newprofile.guesscolor : newprofile.triviacolor
        }`}
      >
        <span style={{ lineHeight: 1 }}> {title}</span>
        <Link
          className="position-relative"
          style={{ fontSize: "11px" }}
          to="/history"
        >
          My Results{" "}
          <span
            className={`dot bg-danger position-absolute ${newprofile.history_total}`}
          >
            {total ? total : "0"}
          </span>
        </Link>
      </div>
      <div style={{ padding: "5px 0", lineHeight: "1.5rem" }}>
        <div>
          <strong>Stats</strong>
        </div>
        <div>
          Correct {trivia ? "Answer(s)" : "Guesses"}:&nbsp; {win ? win : "0"}
        </div>
        <div>
          Wrong {trivia ? "Answer(s)" : "Guesses"}:&nbsp; {fail ? fail : "0"}
        </div>
        <div>Total: {total ? total : "0"}</div>
      </div>
    </div>
  );
};

const ConfirmDelete = ({ DeleteAccount, account, setProfileSettings }) => {
  return (
    <div className={newprofile.comfirm_wrapper}>
      <div className={newprofile.comfirm_del}>
        <FeatherIcon
          style={{ marginBottom: "10px" }}
          type="button"
          size="30px"
          color="#df3131"
          icon="alert-circle"
        />{" "}
        <div>Are sure you want to delete</div>
      </div>
      <div className="d-flex justify-content-around">
        <button onClick={()=>DeleteAccount(account)} className={newprofile.comfirm_del_btn}>Confirm</button>
        <button  onClick={()=>setProfileSettings(false) }
          style={{ background: "#969292" }}
          className={newprofile.comfirm_del_btn}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const NewProfile = (props) => {
  const { guessStats, triviaStats, userCoins, userPoints, scramble } =
    useFetchStat();
  const [profileSettings, setProfileSettings] = useState(false);
  const [user, setUserData] = useState({});
  const [bankAccount, setBankAccount] = useState([]);
  const tokenObj = JSON.parse(localStorage.getItem("user")) || "";
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("profile");
  const [account, setAccount] = useState();
  const [bankAccounts, setBankAccounts] = useState([]);
  const {
    state: { stat },
  } = useContext(StatsContext);
  const history = useHistory();
  const formatNumber = (x) => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x;
  };
  const getUserProfile = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUserData(userData);
  };
  useEffect(() => {
    getUserProfile();

    fetchTrivialStat();
    BankAcount();
    getAllbanks()
  }, []);

  // const fetchUserStat = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_AUTH_URL}/api/v1/user-stat`,
  //         {
  //           headers: { Authorization: `Bearer ${tokenObj.token}` },
  //         }
  //       );
  //     //   setMymyToken(response?.data?.TOKEN);
  //       console.log("hkbskskvjsf", response?.data?.TOKEN);
  //     } catch (error) {
  //       console.log("from user stats error is >>", error);
  //     }
  //   };
  const getAllbanks = () => {
    const { token } = isAuthenticated();

    axios
      .get(
        `${process.env.REACT_APP_PAYMENT_URL}/api/bank-accounts/available-banks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
       
        setBankAccounts(res?.data?.obj)
      })
      .catch((err) => {});
  };
  const fetchTrivialStat = () => {
    const { token } = isAuthenticated();

    axios
      .post(
        `${process.env.REACT_APP_GUESS_GAME_URL}/trivia-game-answer/game-stat`,
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {})
      .catch((err) => {});
  };
  const openSettings = (type) => {
    setProfileSettings(settings);
    setType(type);
  };

  const BankAcount = () => {
    const { token } = isAuthenticated();
    setLoading(true);

    axios
      .get(
        `${process.env.REACT_APP_PAYMENT_URL}/api/bank-accounts`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const accounts = res.data.obj;
        setBankAccount(accounts);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const DeleteAccount = (account) => {
    const { token } = isAuthenticated();

    axios
      .delete(
        `${process.env.REACT_APP_PAYMENT_URL}/api/bank-accounts/delete/${account}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        message.success("Account deleted successfully");
        BankAcount();
        setProfileSettings(false)
      })
      .catch((err) => {});
  };
  const maskAccount = (string) => {
    var str = string;

    var trailingCharsIntactCount = 4;

    str =
      new Array(str.length - trailingCharsIntactCount + 1).join("x") +
      str.slice(-trailingCharsIntactCount);

    return str;
  };

  const closeSettings = () => {
    setProfileSettings(!settings);
  };

  const comfirmDelete = (account) => {
    setAccount(account);
 
    openSettings("confirm");
  };

  return (
    <div>
      <Modal
        close
        centered
        size="lg"
        dialogClassName="profile_modal"
        show={profileSettings}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => {
          setProfileSettings(false);
        }}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          {type === "profile" && (
            <EditProfile
              getUserProfile={getUserProfile}
              setProfileSettings={setProfileSettings}
              name={user?.name}
              email={user?.email}
              phone={user?.phone}
              closeSettings={closeSettings}
            />
          )}

          {type === "account" && (
            <AddAcount
              bankCodes={bankCodes}
              getUserProfile={getUserProfile}
              setProfileSettings={setProfileSettings}
              name={user?.name}
              email={user?.email}
              phone={user?.phone}
              closeSettings={closeSettings}
              BankAcount={BankAcount}
              bankAccount={bankAccount}
              bankAccounts={bankAccounts}
            />
          )}
          {type === "confirm" && (
            <ConfirmDelete
              DeleteAccount={DeleteAccount}
              account={account}
              setProfileSettings={setProfileSettings}
            />
          )}
        </Modal.Body>
      </Modal>
      <div
        style={{
          width: "90%",
          paddingBottom: "50px",
          minHeight: "100vh",
          margin: "50px auto",
        }}
      >
        <div className="page-title">
          {" "}
          <FeatherIcon
            type="button"
            size="20px"
            onClick={() => history.goBack()}
            icon="arrow-left"
          />{" "}
          My Profile
        </div>

        <div className={newprofile.newprofilewrap}>
          <section className={newprofile.sectone}>
            <div className={newprofile.bio}>
              <div className={newprofile.biohead}>
                <img
                  src={settings}
                  alt="settings"
                  onClick={() => openSettings("profile")}
                />
              </div>
              <div className={newprofile.biosub}>
                <div className={newprofile.bioone}>
                  {/* <img src={myavatar} alt="myavatar" /> */}
                  <h1 className={newprofile.avatar}>{user?.name?.[0]}</h1>
                </div>
                <div className={newprofile.biotwo}>
                  <div>
                    Name:&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {user?.name}
                    </span>
                  </div>
                  <div>
                    Email:&nbsp;&nbsp;&nbsp;&nbsp; <span>{user?.email}</span>{" "}
                  </div>
                  <div>
                    Phone:&nbsp;&nbsp;&nbsp;&nbsp; <span>{user?.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={newprofile.add_account_btn_wrapper}>
              <button
                onClick={() => {
                  bankAccount.length == 2
                    ? message.error("You can only 2 accounts ")
                    : openSettings("account");
                }}
                className={newprofile.add_account_btn}
              >
                Add Account
              </button>
            </div>
            <div
              style={{ boxShadow: "var(--box-shadow)" }}
              className={newprofile.transactions}
            >
              {/* <div style={{fontSize: '20px', fontWeight: 'bold'}}>Transaction</div> */}
              {loading ? (
                <div
                  className="leaderSpinner d-flex justify-content-center mt-5 mb-5"
                  style={{ gap: "4px", width: "100%", position: "relative" }}
                >
                  <Spinner animation="grow" size="sm" />
                  <Spinner animation="grow" size="sm" />
                  <Spinner animation="grow" size="sm" />
                </div>
              ) : bankAccount.length > 0 ? (
                <div>
                  {bankAccount.map((bank) => {
                    return (
                      <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          <div
                            style={{
                              gap: "20px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className={newprofile.accountName}>
                              {bank?.bankName}
                            </div>
                            <div>{maskAccount(bank?.accountNumber)}</div>
                          </div>
                          <div>
                            <FeatherIcon
                              onClick={() => {
                                comfirmDelete(bank?.accountNumber);
                              }}
                              type="button"
                              color="red"
                              size="14px"
                              icon="trash-2"
                              // fill="red"
                            />
                          </div>
                        </li>
                      </ul>
                      /* <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        gap: "20px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{bank?.bankName}</div>
                      <div>
                        
                        {maskAccount(bank?.accountNumber)}
                      </div>
                    </div>
                    <div>
                      <FeatherIcon type="button" color="red" size="14px" icon="trash" />
                    </div>
                  </div> */
                    );
                  })}
                </div>
              ) : (
                <div className="row">
                  <NoData
                    style={{ height: "56px" }}
                    text="No account added yet !"
                  />
                </div>
              )}
            </div>
            <div className={newprofile.transactions}>
              {/* <div style={{fontSize: '20px', fontWeight: 'bold'}}>Transaction</div> */}
              <div style={{ padding: "20px 0" }} className="row">
                <div
                  className={`${newprofile.first}  ${newprofile.col_class} col-md-6 col-sm-12 col-xs-12  `}
                >
                  <Link
                    className={`text-center ${newprofile.link_history}`}
                    style={{
                      color: "var(--humber-link)",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                    className=""
                    to="/history"
                  >
                    View Play History{" "}
                    <FeatherIcon
                      icon="chevron-right"
                      size="19px"
                      color="var(--humber-link)"
                    />
                  </Link>
                </div>
                <div
                  className={` ${newprofile.col_class} col-md-6 col-sm-12 col-xs-12  `}
                >
                  <Link
                    className={`${newprofile.link_history} text-center`}
                    style={{
                      color: "var(--humber-primary)",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                    className=""
                    to="/transactions"
                  >
                    View Transactions{" "}
                    <FeatherIcon
                      icon="chevron-right"
                      size="19px"
                      color="var(--humber-primary)"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <Activities stat={stat} pagename={"profile"} />
            {/* <div style={{ marginTop: "30px" }}>
            <MyPoints />
          </div>
          <div className={newprofile.collect}>
            <div className={newprofile.collectone}>
              <Position />
            </div>
            <div className={newprofile.collectone}>
              <MyMyPoints />
            </div>
          </div> */}
          </section>
          <section className={newprofile.secttwo}>
            {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{ color: "#123873", fontWeight: "bold", fontSize: "20px" }}
            >
              My Avatars
            </div>
            <div
              style={{ color: "#0A7815", fontWeight: "bold", fontSize: "16px" }}
            >
              View History
            </div>
           
          </div> */}
            {/* <div className={newprofile.avlist}>
            <EachAvatar /> 
            <EachAvatar />
            <EachAvatar />
          </div> */}

            <div className={newprofile.guessandtrivia}>
              <GameTrans {...guessStats} title="Guess" color="guess" />
              <GameTrans
                trivia
                {...triviaStats}
                title="Trivia"
                color="trivia"
              />
              <GameTrans
                trivia
                {...scramble}
                title="Scramble"
                color="scramble"
              />
            </div>
            {/* redeem */}
            <div className={newprofile.redeem}>
              <div className={newprofile.rdbox}>
                <div>
                  You have{" "}
                  <strong>
                    {userCoins ? formatNumber(userCoins) : "0"} coins
                  </strong>{" "}
                  ,{" "}
                  {(userCoins && userCoins < 1000) || !userCoins
                    ? `earn more coins and redeem any of these prizes`
                    : ` already will you like to redeem any of the prizes with it?`}
                </div>
                {/* <div style={{ margin: "20px 0" }}>
                <img
                  src={lock}
                  alt="lock"
                  title="lock"
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "45%",
                    cursor: "pointer",
                  }}
                />
                <img src={camryhybrid} alt="camryhybrid" title="camryhybrid" />
                <img
                  src={redeemright}
                  alt="camryhybrid"
                  title="camryhybrid"
                  style={{
                    position: "absolute",
                    top: "45%",
                    right: "0",
                    cursor: "pointer",
                  }}
                />
                <img
                  src={redeemleft}
                  alt="camryhybrid"
                  title="camryhybrid"
                  style={{
                    position: "absolute",
                    top: "45%",
                    left: "0",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div>
                <strong>{userPoints ? userPoints : 0} points</strong>
              </div> */}
                <SleekSlider userPoints={formatNumber(userPoints)} />
                {/* <Link to="/rewards-prizes">View Prizes</Link> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NewProfile;
