import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  RowContent,
  PositionWrapper,
} from "./activities_styles";
import FeatherIcon from "feather-icons-react";
import styles from "./style.module.css";
import staricon from "../../assets/gulder_assets/star1.svg";
import walleticon from "../../assets/gulder_assets/wallet.svg";
import coinicon from "../../assets/gulder_assets/coin1.svg";
import Payments from "../../components/Payments";
import Modal from "../../components/Modal";
import axios from "axios";
import { getPositionInWords } from "../../utils/utils";
import { ReactSVG } from "react-svg";
import { useHistory, Link } from "react-router-dom";
import { useFetchStat } from "../../utils/useFetchStat";
import { isAuthenticated } from "../../utils/authdata";
import { useQuery } from "react-query";
import Spinner from "react-bootstrap/Spinner";
import Sspinner from "../../components/Spinner";

const Activities = ({ stat = {}, pagename, openTopup, setAwait }) => {
  const [topUp, setTopUp] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [amountAdded, setAmmountAdded] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [key, setKey] = useState(1);
  const history = useHistory();

  useFetchStat();

  useEffect(() => {
    setTopUp(openTopup);
  }, [openTopup]);

  const formatNumber = (x) => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x;
  };

  const { token } = isAuthenticated();

  const fetchMyPoints = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PAYMENT_URL}/api/points/position`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return res.data;
    } catch (error) {}
  };

  const { data, status } = useQuery("myPoints", fetchMyPoints, {
    staleTime: 20000,
  });
  return (
    <div>
      <div className={`row ${pagename === "profile" ? "mt-4" : ""}`}>
        <div
          className={`col-md-${
            pagename === "profile" ? "6" : "4"
          } col-sm-6 col-xs-6 mb-4 ${styles.col} position-relative`}
        >
          <Card style={{ position: "relative" }}>
            {confirm && (
              <div className={`${styles.modal}`}>
                <div className={`${styles.modal_content}`}>
                  <span class="close">&times;</span>

                  <RowContent justify={"center"}>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </RowContent>
                </div>
              </div>
            )}
            <CardBody>
              <RowContent>
                <p className={styles.title}>Token {pagename} </p>

                <ReactSVG className={styles.icon} src={walleticon} />
              </RowContent>

              <p type="button" className={`${styles.amount}`}>
                {" "}
                <span
                  type="button"
                  onClick={() => history.push("/transactions?type=token")}
                >
                  {stat?.TOKEN ? (
                    formatNumber(stat?.TOKEN)
                  ) : (
                    <>
                      {stat?.TOKEN == 0 ? (
                        <div>{0}</div>
                      ) : (
                        <Sspinner cz="25px" />
                      )}
                    </>
                  )}
                </span>{" "}
              </p>
              <RowContent justify={"flex-start"}>
                {/* { formatNumber(stat?.TOKEN) || 0 } */}
                <a
                  className="dashboard_action"
                  onClick={() => setTopUp(true)}
                  type="button"
                  style={{ color: "var(--humber-link)" }}
                >
                  Top up{" "}
                  <FeatherIcon size="14px" icon="chevron-right" color="#000" />
                </a>
              </RowContent>
            </CardBody>
          </Card>
        </div>
        <div
          className={`col-md-${
            pagename === "profile" ? "6" : "4"
          } col-sm-6 col-xs-6 mb-4 ${styles.col}`}
        >
          <Card>
            <CardBody>
              <RowContent>
                <p className={styles.title}>My coins</p>

                <ReactSVG className={styles.icon} src={coinicon} />
              </RowContent>
              {/* <Sspinner cz="25px"/> */}
              <p type="button" className={`${styles.amount}`}>
                <span
                  type="button"
                  onClick={() => history.push("/transactions?type=coins")}
                >
                  {stat?.COINS ? (
                    formatNumber(stat?.COINS)
                  ) : (
                    <>
                      {stat?.COINS == 0 ? (
                        <div>{0}</div>
                      ) : (
                        <Sspinner cz="25px" />
                      )}
                    </>
                  )}
                </span>
              </p>
              <RowContent justify={"flex-start"}>
                <Link
                  className="dashboard_action"
                  to="/rewards-prizes"
                  style={{ color: "var(--humber-link)" }}
                >
                  View prizes
                  <FeatherIcon size="14px" icon="chevron-right" color="#000" />
                </Link>
              </RowContent>
            </CardBody>
          </Card>
        </div>
        <div
          className={`col-md-${
            pagename == "profile" ? "12" : "4"
          } col-sm-12 col-xs-12  mb-4`}
        >
          <Card>
            <CardBody>
              <RowContent justify={"flex-start"}>
                <p className={styles.title}>My points</p>

                <ReactSVG className={styles.icon} src={staricon} alt="star" />
              </RowContent>

              <RowContent
                style={{
                  height: "62px",
                  marginBottom: `${pagename == "profile" ? "20px" : ""}`,
                }}
              >
                <p
                  type="button"
                  onClick={() => history.push("/transactions?type=points")}
                  className={`${styles.amount}`}
                >
                  {" "}
                  {stat?.POINTS ? (
                    formatNumber(stat?.POINTS)
                  ) : (
                    <>
                      {
                        stat?.POINTS == 0 ? (
                          <div>
                            {0}
                          </div>
                        ) : (
                          <Sspinner cz="25px" /> 
                        )
                      }
                      
                    </>
                  )}
                </p>
                <PositionWrapper onClick={() => history.push("/leaderboard")}>
                  <div
                    style={{ color: "var(--humber-primary)", fontWeight: 900 }}
                    className="text-center"
                  >
                    Position
                  </div>
                  <div className="text-center leaderboard-position">
                    {data?.obj}
                    { data?.obj > 0 ? getPositionInWords(Number(data?.obj)) : null}
                  </div>
                </PositionWrapper>
              </RowContent>
              <RowContent style={{ gap: "15px" }} justify={"flex-start"}>
                {pagename !== "profile" && (
                  <Link
                    className="dashboard_action"
                    to="/leaderboard"
                    type="button"
                    style={{ color: "var(--humber-link)" }}
                  >
                    View Leaderboard{" "}
                    <FeatherIcon
                      size="14px"
                      icon="chevron-right"
                      color="#000"
                    />
                  </Link>
                )}
              </RowContent>
            </CardBody>
          </Card>
        </div>
      </div>
      {topUp && (
        <Modal
          modalClass={"topup_modal_content"}
          dialogClassName={"topUpclass"}
          closeModal={() => setTopUp(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <Payments
            setTopUp={setTopUp}
            setConfirm={setConfirm}
            
            setAmmountAdded={setAmmountAdded}
            setSuccessModal={setSuccessModal}
            successModal={successModal}
            setKey={setKey}
          />
        </Modal>
      )}
      {successModal && (
        <Modal
          modalClass={"sss"}
          dialogClassName={"topUpsuccess"}
          closeModal={() => setSuccessModal(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <div className="text-center mb-4">
            <FeatherIcon icon="check-circle" size="50px" color="#198754" />
          </div>
          <div className={styles.tokenAdded}>
            {formatNumber(amountAdded ? amountAdded / 10 : "")} Token(s)
          </div>
          <div
            style={{
              color: "#000",
              fontFamily: "Poppins",
              fontSize: "20px",
              fontWeight: "bolder",
            }}
            className={`${styles.text} mt-4 mb-4 text-center`}
            style={{ fontSize: "1rem", fontWeight: "400" }}
          >
            has been added to your wallet
          </div>

          <div className=" d-flex mt-4 mb-4 justify-content-center">
            <button
              onClick={() => {
                setSuccessModal(false);
              }}
              className={styles.topupsuccess}
            >
              Play Game
            </button>
          </div>
          <div style={{ display: "none" }}>
            <Activities key={key} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Activities;
