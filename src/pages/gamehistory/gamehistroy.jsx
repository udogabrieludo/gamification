
import { useEffect, useState, useContext } from "react";
import styles from "./guesshistory.module.css";
import moment from "moment";
import FeatherIcon from "feather-icons-react"
import Nodata from '../../components/NoData'

import { Spinner } from "react-bootstrap";
import axios from "axios";
import { Tabs } from "@feuer/react-tabs";

import Activities from "../../components/Activities/activities";
import { StatsContext } from '../../context/';
import ReactPaginate from 'react-paginate';

const Loader = () =>(
  <div className="d-flex justify-content-center mb-5 mt-5" style={{gap:'3px', width: '100%'}}>
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" />
</div>
)
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
const formatTime2 = (value) => {
    let time = moment(value).format('LT')
    return time
  }
const HistoryTable = (props) => {
  
 
  
  const formatDate = (value) => {
    let time = moment(value).format("ll");
    return time;
  };

  const { histories } = props;
  
  const guessUserAnswers = histories?.guessUserAnswers
  
  return (
    <div className={`table mt-1 ${styles.table} table-responsive`}>
      {
        guessUserAnswers?.length > 0 ? (
      <table  className={`table ${styles.game_history}`}>
        <thead>
          <tr>
            <th style={{ width: "20rem" }} scope="col">
              <small>Question</small>
            </th>
            <th scope="col">
              <small>Your Answer</small>
            </th>
            <th scope="col">
              <small>Outcome</small>
            </th>
              <th scope="col">
              <small>Time</small>
            </th>
            <th scope="col">
              <small>Date</small>{" "}
            </th>
          
          </tr>
        </thead>
        <tbody>
          {guessUserAnswers?.map((result, i) => {
            return (
              <tr key={i}>
                <td>{result?.guess?.questionText || "N/A"}</td>
                <td>{result?.userAnswerText}</td> 
                <td style={{color:
                  result?.wasCorrectAnswer === "YES"
                  ? "#07ff07"
                  : result?.wasCorrectAnswer === null
                  ? ""
                  : "red"
                
                }}>
                  {" "}
                  {result?.wasCorrectAnswer === "YES"
                    ? "Win"
                    : result?.wasCorrectAnswer === null
                    ? "pending"
                    : "Lose"}

                    
                </td>
                <td>{formatTime2(result?.createdTime)}</td>
                <td>{formatDate(result?.createdTime)}</td>
              </tr>
            );
          })}
        </tbody> 
      </table>
        ) : (
          <Nodata size="50px" text={'No history found for guess game '}/>
        )
      }
    
    </div>
  );
};
const TriviaTable = (props) => {
  
  const formatDate = (value) => {
    let time = moment(value).format("ll");
    return time;
  };
  const { triviaHistory } = props;
  const  triviaUserAnswers = triviaHistory?.triviaUserAnswers
  
  
  return (
    <div className={`table mt-1 ${styles.table} table-responsive`}>
      {
        triviaUserAnswers?.length > 0 ? (
          <table className={`table ${styles.game_history}`}>
        <thead>
          <tr>
            <th style={{ width: "20rem" }} scope="col">
              <small>Question</small>
            </th>
            {/* <th scope="col">
              <small>Your Answer</small>
            </th> */}
            <th scope="col">
              <small>Outcome</small>
            </th>
            <th scope="col">
              <small>Time</small>
            </th>
            <th scope="col">
              <small>Date</small>{" "}
            </th>
           
          </tr>
        </thead>
        <tbody>
          {triviaUserAnswers?.map((result,i) => {
            return (
              <tr key={i}>
                <td>{result?.guess?.questionText || "N/A"}</td>
                {/* <td>{result?.userAnswerText}</td> */}
                <td style={{color:result?.wasCorrectAnswer==="YES" ? '#07ff07===' : 'red'}}> {result?.wasCorrectAnswer === "YES" ? "Win" : "Lose"}</td>
                <td>{formatTime2(result?.createdTime)}</td>
                <td>{formatDate(result?.createdTime)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
        ) : (
          <Nodata size="50px" text={'No history found for trivia game '}/>
        )
      }
     
    </div>
  );
};

const ScrambleTable = (props) => {
  
  const formatDate = (value) => {
    let time = moment(value).format("ll");
    return time;
  };
  const { scrambleHistory } = props;
  
  
 
  return (
    <div className={`table mt-1 ${styles.table} table-responsive`}>
      {
        scrambleHistory?.length > 0 ? (
          <table className={`table ${styles.game_history}`}>
        <thead>
          <tr>
            <th style={{ width: "20rem" }} scope="col">
              <small>Question</small>
            </th>
            {/* <th scope="col">
              <small>Your Answer</small>
            </th> */}
            <th scope="col">
              <small>Outcome</small>
            </th>
            <th scope="col">
              <small>Time</small>
            </th>
            <th scope="col">
              <small>Date</small>{" "}
            </th>
           
          </tr>
        </thead>
        <tbody>
          {scrambleHistory?.map((result,i) => {
            return (
              <tr key={i}>
                <td>{result?.crossWordGame?.wordText || "N/A"}</td>
                {/* <td>{result?.userAnswerText}</td> */}
                <td style={{fontWeight:'bolder',color:result?.wasCorrectAnswer==="YES" ? '#52c41a' : 'red'}}> {result?.wasCorrectAnswer === "YES" ? "Win" : "Lose"}</td>
                <td>{formatTime2(result?.createdTime)}</td>
                <td>{formatDate(result?.createdTime)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
        ) : (
          <Nodata size="50px" text={'No history found for trivia game '}/>
        )
      }
     
    </div>
  );
};

const GameHistory = () => {
  const [histories, setHistory] = useState({});
  const [triviaHistory, setTriviaHistory] = useState([]);
  const currentPage = 0
 
  const [guessTotal, setGuessTotal] = useState(null);
  const [triviaTotal, setTrivialTotal] = useState(null);
  const [scrambleTotal, setScrambleTotal] = useState(null);
  const [scrambleHistory, setScrambleHistory] = useState([]);
  const pageLimit = 10

  const tokenObj = JSON.parse(localStorage.getItem("user")) || "";
  const [loading, setLoading] = useState(false)
  const { state:{stat} } = useContext(StatsContext)
  const PageCount = Math.ceil(triviaTotal / pageLimit);
  const pageCount1 = Math.ceil(guessTotal / pageLimit)
  const pageCount2 = Math.ceil(scrambleTotal/pageLimit)
  const headers = {
    Authorization: tokenObj.token,
  };
  useEffect(() => {
    getTrivialHistory();
    getGameHistory();
    getScrambleHistory();
  }, []);

  const getGameHistory = (page) => {
    setLoading(true)
   
    // console.log(currentPage);

    const filter = {
      page: page ? page  : currentPage,
      size: pageLimit,
      orderDirection: "DESC",
      orderColumn: "id",
    };

    const URL = applyFilters(
      `${process.env.REACT_APP_GUESS_GAME_URL}/guess-game-answer`,
      { ...filter }
    );
    /// hhhh

    axios
      .get(URL, { headers })
      .then((res) => {
      

        const histories = res?.data?.obj;
        setHistory(histories);
        setGuessTotal(histories?.count);
        setLoading(false)
      })
      .catch((err) => {
      
        setLoading(false)
      });
  };

  const paginateTrivia = ({selected}) =>{
  
    getTrivialHistory(selected);
  }

  const paginateScramble = ({selected}) =>{
    getScrambleHistory(selected)
  }
  const paginateguess = (selected) =>{

    getGameHistory(selected);
  }

  const getScrambleHistory = (page) =>{

    const filter = {
      page: page ? page  : currentPage,
      size: pageLimit,
      orderDirection: "DESC",
      orderColumn: "id",
    };
    const URL = applyFilters(
      `${process.env.REACT_APP_GUESS_GAME_URL}/crossword-game-answer`, { ...filter }
    );

    axios.get(URL, {headers})
      .then((res)=>{
        
        setScrambleHistory(res?.data?.obj?.crossWordUserAnswers)
        setScrambleTotal(res?.data?.obj?.count)
      })
  }
  const getTrivialHistory = (page) => {
    const filter = {
      page: page ? page : currentPage,
      size: pageLimit,
      orderDirection: "DESC",
      orderColumn: "id",
    };

    const URL = applyFilters(
      `${process.env.REACT_APP_GUESS_GAME_URL}/trivia-game-answer`,
      { ...filter }
    );

    axios
      .get(URL, { headers })
      .then((res) => {
      
        const histories = res.data.obj;
        const count = res?.data?.obj?.count;
        setTriviaHistory(histories);
        
        setTrivialTotal(count);
        setLoading(false)
      })
      .catch((err) => {
      
        setLoading(false)
      });
  };
  return (
    <div
      className="zoom"
      style={{
        width: "90%",
        paddingBottom: "50px",
        minHeight: "100vh",
        margin: "50px auto",
      }}
    >
      <Activities stat={stat} />

      {/* <div className={`d-flex justify-content-between mb-4`}>
        <div style={{ color: "#123873", fontSize: "16px", fontWeight: "600" }}>
          Result histories
        </div>
      </div> */}
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
          id: "guess",
          
        }}
      >
        <Tabs.Tab id="guess" title="Guess">

        {
          loading ? (
            <Loader />
          ) : ( <HistoryTable loading={loading} histories={histories} /> )
        }
       
          {
            histories && (
              <div className="d-flex justify-content-center align-items-center">
            
            <ReactPaginate  previousLabel={<FeatherIcon size=".8rem" icon="chevron-left"/>}
              nextLabel={<FeatherIcon size=".8rem" icon="chevron-right"/>}
              pageCount={pageCount1} onPageChange={({selected})=>paginateguess(selected)} containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"} />
          </div>
            )
          }
        </Tabs.Tab>
        <Tabs.Tab id="trivia" title="Trivia">
        {
          loading ? (<Loader />):(<TriviaTable loading={loading} triviaHistory={triviaHistory} />)
        }
        
        {
          triviaHistory &&   (
            <div className="d-flex justify-content-center align-items-center">
            <ReactPaginate  previousLabel={<FeatherIcon size=".8rem" icon="chevron-left"/>}
              nextLabel={<FeatherIcon size=".8rem" icon="chevron-right"/>}
              pageCount={PageCount} onPageChange={paginateTrivia} containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"} />
         </div>
          ) 
        }
        </Tabs.Tab>

        <Tabs.Tab id="scramble" title="Scramble">
        {
          loading ? (<Loader />):(<ScrambleTable loading={loading} scrambleHistory={scrambleHistory} />)
        }
          

        {
          triviaHistory &&   (
            <div className="d-flex justify-content-center align-items-center">
            <ReactPaginate  previousLabel={<FeatherIcon size=".8rem" icon="chevron-left"/>}
              nextLabel={<FeatherIcon size=".8rem" icon="chevron-right"/>}
              pageCount={pageCount2} onPageChange={paginateScramble} containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"} />
         </div>
          ) 
        }
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default GameHistory;
