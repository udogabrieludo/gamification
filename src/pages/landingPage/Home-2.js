import React, {  useContext } from "react";
import Navbar from "./MainMenu/Navbar";
import trivia from "../../assets/images/triviaicon1.png";
import guess from "../../assets/images/guess-1.svg";
import scramble from "../../assets/gulder_assets/scramble.svg";
import gift1 from "../../assets/images/gift-1.svg";
import gift2 from "../../assets/images/gift-2.svg";
import gift3 from "../../assets/images/gift-3.svg";
import gift4 from "../../assets/images/gift-4.svg";
import gift5 from "../../assets/images/gift-5.svg";

import {
  Container,
  Wrapper,
  Row,
  Column,
  Header,
  Text,
  Card,
  CardAvatar,
  Subtitle,
} from "./styles/home2-styles";

import { isAuthenticated } from "../../utils/authdata";
import { useHistory } from "react-router-dom";

import { StatsContext } from '../../context';


const Home2 = () => {
  let history = useHistory();

  const {state:{openModal}, dispatch} = useContext(StatsContext)

  const { token } = isAuthenticated();




  return (
    <>
      <Container>
        <Wrapper>
          <Row>
            <Navbar
              token={token}
            />
            <Column>
              <Header>
                N100,000,000
                <span>Giveaway</span>
              </Header>
              <Text>Play your favourite Games & Win Big!</Text>
            </Column>
          </Row>
          <Row height="400px">
            <Column>
              <Card>
                <CardAvatar width="70px" height="74px">
                  <img src={guess} alt="guess" />
                </CardAvatar>
                <Text color="var(--humber-black)" size="1.3rem">
                  <strong>Guess Game</strong>
                </Text>
                <Subtitle>
                  <span>Guess correctly and win up to</span>{" "}
                  <strong>N500,000</strong>.
                </Subtitle>

                {/* <p>
                  Make a Guess on a specific event per category and win up to{" "}
                  <strong>N500,000 </strong> naira instantly if your guess is
                  correct.
                </p> */}
                <button
                  // onClick={() => {
                  //   {
                  //     token ? history.push("/guess-game") : dispatch({
                  //       type: "OPEN_MODAL",
                  //       payload:true
                  //   });
                  //   }
                  // }}
                >
                  Coming soon
                </button>
              </Card>
            </Column>
       
            <Column>
              <Card>
                <CardAvatar
                  width="auto"
                  height="80px"
                  padding="1.1rem 0 0 0"
                  margin="0 0 1.1rem 0"
                >
                  <img src={trivia} alt="trivia" />
                </CardAvatar>
                <Text color="var(--humber-black)" size="1.3rem">
                  <strong> Trivia Game</strong>
                </Text>
                <Subtitle>
                  
                  <span>Answer correctly and win up to</span>{" "}
                  <strong>N100,000</strong>.
                </Subtitle>
                <p>
                  This game tests your ability to respond quickly. Coins and
                  Points are awarded for every correct answer. Players are
                  eligible to win up to <strong>N100,000</strong> naira.
                 
                </p>

                <button
                  onClick={() => {
                    {
                      token ? history.push("/trivia-game") : dispatch({
                        type: "OPEN_MODAL",
                        payload:true
                    });
                    }
                  }}
                >
                  Play Now
                </button>
              </Card>
            </Column>
            <Column>
              <Card>
                <CardAvatar
                  width="auto"
                  height="80px"
                  padding="1.1rem 0 0 0"
                  margin="0 0 1.1rem 0"
                >
                  <img src={scramble} alt="avatar" />
                </CardAvatar>
                <Text color="var(--humber-black)" size="1.3rem">
                  <strong> Scramble Game</strong>
                </Text>
                <Subtitle>
                  <span>Play now and win up to</span> <strong>N50,000</strong>{" "}
                  
                </Subtitle>

                <p>
                  Coins and points are awarded for every correct answer. Winners
                  are eligible to win up to <strong>N50,000</strong> Naira
                  
                </p>

                <button
                  onClick={() => {
                    {
                      token ? history.push("/scramble") : dispatch({
                          type: "OPEN_MODAL",
                          payload:true
                      });
                    }
                  }}
                >
                  Play Now
                </button>
              </Card>
            </Column>
          </Row>

          <Row>
            <div className="half-circle">
              <div className="desc-box">
                <div className="desc"> LOTS OF GREAT </div>
                <div className="desc">PRIZES TO BE WON </div>
              </div>
              <div className="gift1">
                <img src={gift1} alt="" />
              </div>
              <div className="gift2">
                <img src={gift2} alt="" />
              </div>
              <div className="gift3">
                <img src={gift3} alt="" />
              </div>
              <div className="gift4">
                <img src={gift4} alt="" />
              </div>
              <div className="gift5">
                <img src={gift5} alt="" />
              </div>
            </div>
          </Row>

        </Wrapper>
      </Container>
    </>
  );
};

export default Home2;
