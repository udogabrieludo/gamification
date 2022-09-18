import React, { useEffect, useState } from "react";
import axios from "axios";
import GameListing from "../../components/GameListing";
import StatsCard from "../../components/StatsCard";
import styles from "./style.module.css";
import guessme from "../../assets/images/guessme.svg";
import thunder from "../../assets/svg/thunder.svg";
import arrowwhite from "../../assets/images/arrowwhite.svg";
import ListGames from "../../components/ListGames";
import Wrapper, {
  SubWrapper,
  SectOne,
  SectTwo,
} from "../../components/Wrapper";
import UseProduct from "../../utils/UseProduct";
import Button from "../../components/Button"
import { setNestedObjectValues } from "formik";
import { message, Space } from 'antd';
import 'antd/dist/antd.css';

const token = localStorage.getItem("token");
const productBtn = {
  boxShadow: '0px 0px 85px rgba(0, 0, 0, 0.05)', 
  cursor: 'pointer',
  border: 'none',
  color: 'white',
  backgroundColor: '#1290DF',
      padding: '10px 25px',
      backgroundImage: 'linear-gradient( #1290DF, #2C6BA5 )',
      borderRadius: '20px',
      textTransform: 'capitalize', 
      marginBottom: '40px', 
}
const Guess = () => {
  const token = localStorage.getItem("token");
  const myUserId = JSON.parse(localStorage.getItem("user"));
  const userId = myUserId?.userId;
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState({});
  const [eachEvent, setEachEvent] = useState([]);
  const [step, setStep] = useState(1);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [outcome, setOutCome] = useState({});
  const [success, setSuccess] = useState('')
  const [marker, setMarker] = useState(false)

  const successOne = () => {
    message.success('This is a success message');
  };
  
  const errorOne = (args) => {
    message.error({
        content: `You have ${args}`
    });
  };

  const pickedOutcome = (eventId, stakes) => {
     };


  const fetchEvents = () => {
      setStep(1)
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/predictions/events`, {
        headers: {
          authorization: `Bearer ${token}`,
          "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
        },
      })
      .then((response) => {
          setEvents(response.data.events);
        setLoadingEvents(false);
      })
      .catch((error) => {
         });
  };
  const fetchEventsByCategory = (category) => {
      setStep(1)
    // https://sandbox.api.humbergames.com/predictions/events?category=music
    setLoadingEvents(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/predictions/events?category=${category}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
          },
        }
      )
      .then((response) => {
          setLoadingEvents(false);
        setEvents(response.data.events);
      })
      .catch((err) => {
          setLoadingEvents(false);
      });
  };
  const fetchCategories = () => {
    setLoadingCategory(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/predictions/events/categories`, {
        headers: {
          authorization: `Bearer ${token}`,
          "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
        },
      })
      .then((response) => {
         setLoadingCategory(false);
        setCategories(response.data);
      })
      .catch((error) => {
         setLoadingCategory(false);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  const filterEvents = (category) => {
  
    const result = events.filter((event) => event.category === category);
    setEvents({ ...events }, result);
  };

  const showEvents = (eventId) => {
    const res = events.filter((event) => event.event_id === eventId);
    setStep(2);
    setEachEvent(res);
  };

  const submitPrediction = () => {
      axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/predictions/events/stake`,
        {
          event_id: selected.event_id,
          quantity: 1,
          stakes: selected.stakes,
          user_id: userId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
          },
        }
      )
      .then((response) => {
        
        if(response.data.event_id){
            successOne()
        }
        if(response.data.status === 'failed'){
            errorOne(response.data.error)
        }
      })
      .catch((err) => {
         });
  };
  const selectPrediction = (eventId, stake) => {
    setMarker(eventId === stake)
    setSelected({
      stakes: stake,
      event_id: eventId,
      quantity: 1,
      user_id: userId,
    });
  };
 

  return (
    <Wrapper>
      <SubWrapper>
      
        <SectOne>
          <StatsCard leaderboard={true} />
          <ListGames />
        </SectOne>

        <SectTwo>
          <div className={styles.guess}>
            <div style={{ fontSize: "20px", padding: "5px 10px" }}>
              Guess Game
            </div>
            <div style={{ display: "flex", fontSize: "12px" }}>
              <div>
                Guess Game prediction closes in{" "}
                <span style={{ color: "red" }}>23h: 34m: 22s</span>{" "}
              </div>
            </div>
          </div>
          
          <div style={{ display: "flex", marginBottom: '40px' }}>
            <div className={styles.all} onClick={() => fetchEvents()}> all </div>

              {!loadingCategory
                ? categories.map((category, id) => (
                    <div className={styles.cat} key={id} onClick={() => fetchEventsByCategory(category)}>
                      {category}
                    </div>
                  ))
                : <div className={styles.cat}>..loading</div>}
          </div>
          <div className={step === 1 ? styles.guessthegame1: styles.guessthegame} style={{ textAlign: "center" }}>
        {/* {success.length > 0  && <div style={{width: '250px', right: '19%', height: '250px', marginTop: '50px', position: 'absolute', backgroundColor: 'red'}}>prediction made</div>} */}
            {step === 1 && (
              <div className={styles.cardWrapper}>
                {!loadingEvents
                  ? events.map((event) => (
                      <div
                        key={event.event_id}
                        className={`${styles.eventCard}`}
                        onClick={() => showEvents(event.event_id)}
                      >
                        <img src={thunder} alt="predict img" />
                        <div>
                          <div className={styles.label}>{event.label}</div>
                          <br />
                          <div className={styles.status}>{event.status}</div>
                        </div>
                      </div>
                    ))
                  : <div className={styles.loadingEvents}>..loading events</div>}
              </div>
            )}
            {events.length < 1 && <div>
            <div
                        className={styles.eventCard1}
                      >
                          No events for this category
                      </div>
            </div>}
            {step === 2 && (
              <div className={styles.guessthegame1} style={{ marginBottom: "50px" }}>
                <img
                  src={guessme}
                  alt="guessme"
                  style={{ marginTop: "40px" }}
                />
                {!loadingEvents && (
                  <>
                    <div
                      key={eachEvent[0].event_id}
                      onClick={pickedOutcome(eachEvent[0].event_id)}
                    >
                      {eachEvent[0].label} | {eachEvent[0].odd} |{" "}
                      {eachEvent[0].id}
                    </div>
                    <div className="options" style={{ marginTop: "30px" }}>
                      <ul>
                        {eachEvent[0].outcomes.map((outcome) => {
                          return (
                            <li
                              key={outcome.id}
                              onClick={() =>
                                selectPrediction(
                                  eachEvent[0].event_id,
                                  outcome.id
                                )
                              }
                            >
                              {outcome.label} {marker && 'marked'}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div style={{ fontSize: "12px" }}>
                      <strong>
                        This will cost you{" "}
                        <span style={{ color: "red" }}>N50</span>
                      </strong>
                    </div>
                    <div style={{ width: "550px", height: "70px" }}></div>
                    <button onClick={submitPrediction} style={productBtn}>predict</button>
                  </>
                )}
              </div>
            )}
          </div>
        </SectTwo>
      </SubWrapper>
    </Wrapper>
  );
};

export default UseProduct(Guess);
