import React, { useState, useEffect } from "react";
import { Tabs } from "@feuer/react-tabs";
import "./style.css";
import {
  useFetchPointHistory,
  useFetchCoinToken,
  useFetchCoin,
} from "../../utils/FetchTransaction";
import moment from "moment";
import NoData from '../../components/NoData/index'
import Table from "./transactionTables";
import { Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import FeatherIcon from 'feather-icons-react'

import { Pagination } from "antd";
const formateTime = (time) => {

  return moment(time).format("lll");
};

const useQueryString = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};
const Profile = () => {
  const [historyTokens, setHistoryTokens] = useState([]);
  const [historyPoints, setHistoryPoints] = useState([]);

  const [coinsHistory, setcoinsHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const queryString = useQueryString();

  // pagination section for points
  const [currentPage1, setCurrentPage1] = useState(1);
  const [postPerPage1, setPostPerPage1] = useState(10);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2, setPostPerPage2] = useState(10);

  // console.log(useFetchCoinToken('TOKENS'))
  // console.log(useFetchCoinToken('COINS'))
  // console.log(useFetchPointHistory())

  // to get tokens transactions
  const tokenData = useFetchCoinToken("TOKENS") || "";
  useEffect(() => {
    setLoading1(true);
    tokenData
      .then((res) => {
        setLoading1(false);
        // console.log('token data is ', res.data)
        setHistoryTokens(res?.data || "");
      })
      .catch((err) => {
        setLoading1(false);
      });
  }, []);

  const Spinners = () => (
    <div className="d-flex" style={{ gap: "4px" }}>
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
    </div>
  );

  // to get coins transactions

  const coins = useFetchCoin();
  useEffect(() => {
    setLoading3(true);
    coins
      .then((res) => {
        setLoading3(false);
        setcoinsHistory(res?.data || "");
      })
      .catch((err) => {
      
        setLoading3(true);
      });
  }, []);

  // to get points transactions
  const pointsData = useFetchPointHistory();

  useEffect(() => {
    setLoading2(true);
    pointsData
      .then((response) => {
        setLoading2(false);

        setHistoryPoints(response?.data || "");
      })
      .catch(() => {
        setLoading2(false);
      });
  }, []);

  // console.log('gbese re ee', historyTokens)

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = historyTokens.slice(indexOfFirstPost, indexOfLastPost);

  // section for points pagination
  const indexOfLastPost1 = currentPage1 * postPerPage1;
  const indexOfFirstPost1 = indexOfLastPost1 - postPerPage1;
  const currentPosts1 = historyPoints.slice(
    indexOfFirstPost1,
    indexOfLastPost1
  );
  const indexOfLastPost2 = currentPage2 * postPerPage2;
  const indexOfFirstPost2 = indexOfLastPost2 - postPerPage2;
  const currentPosts2 = coinsHistory?.slice(indexOfFirstPost2, indexOfLastPost2);

  
  
 

  const handleTabClick = (event) => {
   
  };
  
  return (
    <div style={{ minHeight: "100vh", marginBottom: "20px" }}>
      <div
        style={{
          margin: "40px 0 0 70px",
          fontSize: "25px",
          fontWeight: "bold",
          // color:"var(--humber-light)"
        }}
        className="zoom"
      >
        My Transactions
      </div>
      <div className="profile">
        <Tabs
          tabsProps={{
            className:"tab_class",
            style: {
            
              borderColor: 'red',
              borderBottomColor: 'red',
              color: '',
             
            },
          }}
          activeTab={{
            id: `${
              queryString.get("type") ? queryString.get("type") : "token"
            }`,
          }}
        >
          <Tabs.Tab id="token" title="Token" onTabClick={handleTabClick}>
           {/* {loading1 && (
              <div className="d-flex justify-content-center mt-4 mb-4 py-5">
                <Spinners />
              </div>
            )} */}
            {
              loading1 ? (
                <div className="d-flex justify-content-center mt-4 mb-4 py-5">
                <Spinners />
              </div>
              ) :  historyTokens.length > 0 ? (
                <Table
              loading1={loading1}
              tableHeader={[
                "REFERENCE",
                "ID",
                "NARRATIONS",
                "TOKEN VALUE",
                "TYPE",
                "TIME",
              ]}
            >
              {currentPosts?.map((token) => {
                return (
                  <tr key={token?.reference}>
                    <td className="td_transaction">{token?.reference}</td>
                    <td className="td_transaction">{token?.transactionId}</td>
                    <td className="td_transaction">{token?.narration}</td>
                    <td className="td_transaction">{token?.tokenValue}</td>
                    <td
                      className={` td_transaction   ${
                        token?.transactionType == "WITHDRAWAL"
                          ? "color_withdrawal"
                          : "color_deposite"
                      }`}
                    >
                      {token?.transactionType == "WITHDRAWAL" ? ' Game played' :' Deposit'}
                    </td>
                    <td>{formateTime(token?.createdAt)}</td>
                  </tr>
                );
              })}
            </Table>
              ) : (
                <NoData text={'No history found'}/>
              )
            }

           
           
{/* 
            {historyTokens?.length > 0 && (
              <div className="d-flex justify-content-center">
                <Pagination
                  onChange={(e) => {
                    setCurrentPage(e);
                  }}
                  defaultCurrent={currentPage}
                  total={historyTokens.length}
                />
              </div>
            )} */}
            {
              historyTokens?.length > 0 && (
                <div className="d-flex justify-content-center align-items-center">
            <ReactPaginate  previousLabel={<FeatherIcon size=".8rem" icon="chevron-left"/>}
              nextLabel={<FeatherIcon size=".8rem" icon="chevron-right"/>}
              pageCount={Math.ceil(historyTokens?.length / postPerPage)} onPageChange={({selected})=> setCurrentPage(selected + 1)} containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"} />
         </div>
              )
            }

            {/* tabs for trransaction for points */}
          </Tabs.Tab>
          <Tabs.Tab id="points" title="Points" onTabClick={handleTabClick}>
        

            {
              loading2 ? (
                <div className="d-flex justify-content-center  mt-4 mb-4 py-5">
                <Spinners />
              </div>
              ) :  historyPoints?.length > 0 ? (
                <Table
              loading2={loading2}
              tableHeader={[
                "REFERENCE",
                "ID",
                "NARRATIONS",
                "GAME TYPE",
                "TIME",
                "POINT ADDED",
               
              ]}
            >
              {currentPosts1?.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt)).map((point) => {
                return (
                  <tr key={point?.reference + "iis"}>
                    <td className="td_transaction">{point?.reference}</td>
                    <td className="td_transaction">{point?.transactionId}</td>
                    <td className="td_transaction">{point?.narration}</td>
                    <td className="td_transaction">{point?.gameType}</td>
                    <td className="td_transaction">
                      {formateTime(point?.createdAt)}
                    </td>
                    <td className="td_transaction">{point?.pointAdded}</td>
                    
                  </tr>
                );
              })}
            </Table>
              ) : (
                <NoData text={'No history found'} />
              )
            }
            
            {/* {historyPoints.length > 0 && (
              <div className="d-flex justify-content-center">
                <Pagination
                  onChange={(e) => {
                    setCurrentPage1(e);
                  }}
                  defaultCurrent={currentPage1}
                  total={historyPoints.length}
                />
              </div>
            )} */}

            {
              historyPoints?.length > 0 && (
                <div className="d-flex justify-content-center align-items-center">
            <ReactPaginate  previousLabel={<FeatherIcon size=".8rem" icon="chevron-left"/>}
              nextLabel={<FeatherIcon size=".8rem" icon="chevron-right"/>}
              pageCount={Math.ceil(historyPoints?.length / postPerPage)} onPageChange={({selected})=> setCurrentPage1(selected + 1)} containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"} />
         </div>
              )
            }
            
          </Tabs.Tab>
          <Tabs.Tab
            id="coins"
            className="coins"
            title="Coins"
            onTabClick={handleTabClick}
          >

        {loading3 ? (
              <div className="d-flex justify-content-center  mt-4 mb-4 py-5">
                <Spinners />
              </div>
            ) : coinsHistory.length > 0 ? (
              <Table
              loading3={loading3}
              tableHeader={[
                "REFERENCE",
                "ID",
                "NARRATIONS",
                "COIN VALUE",
               
                "TIME",
              ]}
            >
           
             
              {currentPosts2?.map((coin) => {
                return (
                  <tr key={coin?.reference}>
                    <td className="td_transaction">{coin?.reference}</td>
                    <td className="td_transaction">{coin?.transactionId}</td>
                    <td className="td_transaction">{coin?.narration}</td>
                    <td className="td_transaction">{coin?.coinValue}</td>
                    
                    <td className="td_transaction">
                      {formateTime(coin?.createdAt)}
                    </td>
                  </tr>
                );
              })}

            
            </Table>
             ) : (<NoData text={'No history found for coins'} />)
          }  
            {
              coinsHistory?.length > 0 && (
                <div className="d-flex justify-content-center align-items-center">
            <ReactPaginate  previousLabel={<FeatherIcon size=".8rem" icon="chevron-left"/>}
              nextLabel={<FeatherIcon size=".8rem" icon="chevron-right"/>}
              pageCount={Math.ceil(coinsHistory?.length / postPerPage)} onPageChange={({selected})=> setCurrentPage2(selected + 1)} containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"} />
         </div>
              )
            }

            {/* tabs for trransaction for points */}
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;

const Transaction = () => {
  return (
    <div className="container">
      <div></div>
    </div>
  );
};
