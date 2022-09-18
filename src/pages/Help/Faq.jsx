import React from "react";
import './faq.css'
import { Collapse } from "antd";
import { Main } from "../../components";


const { Panel } = Collapse;
const Faq = () => {

  return (
    <Main>
        <h3 >Frequently Asked Questions</h3>
       <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              className="site-collapse-custom-collapse"
            >
              <Panel
                header={<b >How can I pay for the games?</b>}
                key="1"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  Players can pay for the games on the  Biggie's Game website "www.biggiesgames.com", via debit card, USSD or Transfer
                  </i>
                </p>
              </Panel>
              <Panel
                header={<b>How many games are available to play?</b>}
                key="2"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  There are two (2) games available to play at the moment: Trivia and Word Scramble games. More games will be added 
                  </i>
                </p>
              </Panel>
              <Panel
                header={<b>How much do I need to play the games?</b>}
                key="3"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>The player needs a
          minimum of N100.</i>
                </p>
              </Panel>
              <Panel
                header={<b>What is the value of a N100 in tokens ?</b>}
                key="4"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  The value of a N100 is 10
          tokens.
                  </i>
                </p>
              </Panel>
              <Panel
                header={<b>Can I share my tokens with another player?</b>}
                key="5"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  No, you can't share your
          token. Every player has to pay individually to play the Game.
                  </i>
                </p>
              </Panel>
              <Panel
                header={<b>How can I get tokens to play the Game?</b>}
                key="6"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  You will get tokens to play the
          Game when you pay.
                  </i>
                </p>
              </Panel>
              <Panel
                header={<b>How do I get coins?</b>}
                key="7"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                    You get <b>coins</b> when you play and win games.
                  </i>
                </p>
              </Panel>
              <Panel
                header={<b>How do I get points?</b>}
                key="76"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  You get points for performing tasks such as “Sign
          Up, Gameplay, deposit (Top Up)”.
                  </i>
                </p>
              </Panel>
              <Panel
                header={<b>How many times can I play Trivia in a day?</b>}
                key="8"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>You can play a maximum of
          (20) Trivia daily.</i>
                </p>
              </Panel>
              
              <Panel
                header={<b>What is the cost of playing  a Trivia game?</b>}
                key="10"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                 Trivia game costs 2 tokens per game.
                  </i>
                </p>
              </Panel>
              <Panel
                header={
                  <b>What is my reward for playing the Trivia Game?</b>
                }
                key="11"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  You get coins and points when you answer the trivia correctly.
                  </i>
                </p>
              </Panel>
              <Panel
                header={<b>Does my token affect the number of games I can play?</b>}
                key="12"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  Yes, all games
          are available to play  depending on your available tokens.
                  </i>
                </p>
              </Panel>
              <Panel
                header={
                  <b>
                   Can I play Trivia with no token?
                  </b>
                }
                key="13"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  You can't play Trivia if you don't
          have enough tokens in your wallet.
                  </i>
                </p>
              </Panel>
              <Panel
                header={
                  <b>How much does it costs to play scramble game ?</b>
                }
                key="20"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  Scramble game 5 tokens per play.

                  </i>
                </p>
              </Panel>
              {/* <Panel
                header={<b>What are Avatars?</b>}
                key="14"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  Avatars are Icons representing you and the contestants in the Gulder Ultimate Search show. The performance of these Avatars adds to your overall coins, which makes you eligible to win prizes.

                  </i>
                </p>
              </Panel> */}
              {/* <Panel
                header={
                  <b>How do you buy an Avatar?</b>
                }
                key="15"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  You are entitled to buy 3 Avatar daily to
          play the games and the cost avatar is a N100
                  </i>
                </p>
              </Panel> */}
              
              
              {/* <Panel
                header={
                  <b>How much is an Avatar?</b>
                }
                key="16"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  Every avatar costs a N100
                  </i>
                </p>
              </Panel> */}
              <Panel
                header={
                  <b>How Many Times Can I Play a Guess Game?</b>
                }
                key="17"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  You can play the Guess game as many times as you wish before it closes for the day. 
                  </i>
                </p>
              </Panel>
              
              <Panel
                header={
                  <b>Can I play the Guess game without Playing Trivia?</b>
                }
                key="18"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  You can play a Guess game without playing the Trivia game.

                  </i>
                </p>
              </Panel>
              <Panel
                header={<b>Support contact ?</b>}
                key="19"
                className="site-collapse-custom-panel"
              >
                <p>
                  <i>
                  All support services are available to address and respond promptly to any of your questions regarding your usage of the platform. You can reach out to us to tell us how we can help you.  Email: 
                  &nbsp;<a style={{color:'red'}} href="mailto:support@biggiesgames.com">
                    biggiesgamesupport@humberone.com 
                    </a>
                    &nbsp;&nbsp;
                    or CALL: +2348099033088 (9am  - 5pm, Mondays to Fridays)
                  </i>
                </p>
              </Panel>
            </Collapse>
    </Main>
  );
};

export default Faq