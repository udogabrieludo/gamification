import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;


const HelpCenter = () => {
  return (
    <div>
    <h1>Frequently Asked Questions</h1>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        className="site-collapse-custom-collapse"
      >
        <Panel
          header={<b>Do I need Airtime to Subscribe?</b>}
          key="1"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              Yes. There are two available Data Bundles for the Y'ello Star
              Games which are N100 (200MB) daily and N300 (600MB) for 7days
              which will be deducted from your available Airtime balance.
            </i>
          </p>
        </Panel>
        <Panel
          header={
            <b>Does my subscription affect the number of games I can play?</b>
          }
          key="2"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              No, your subscription does not limit the games you can play. All
              games are available to play irrespective of your chosen
              subscription plan.
            </i>
          </p>
        </Panel>
        <Panel
          header={<b>Can I share my subscription with another player?</b>}
          key="3"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              No you can't share your subscription. Every player has to
              subscribe individually to play the Game.
            </i>
          </p>
        </Panel>
        <Panel
          header={<b>How many Games are available to play?</b>}
          key="4"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              You can play Trivia and Prediction games as many times as possible
              using your coins. However, Every player has three life lines daily
              to play trivia if questions aren’t answered correctly.
            </i>
          </p>
        </Panel>
        <Panel
          header={<b>How many times can I trade my Avatar?</b>}
          key="5"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              There are two categories of games available to play. You can play
              the <b>Trivia</b> and <b>Prediction</b> Games.
            </i>
          </p>
        </Panel>
        <Panel
          header={<b>How can I get Coins and Points to play the Game?</b>}
          key="6"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              You will get <b>Coins</b> and <b>Points</b> to play the Game when
              you subscribe. You can use your Coins and Points to play Trivia,
              Prediction Quiz and Buy Avatars.
            </i>
          </p>
        </Panel>
        <Panel
          header={<b>How many times can I play Trivia in a day?</b>}
          key="7"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              You can play Trivia as many times as possible in a day depending
              on your available Coins or Points.
            </i>
          </p>
        </Panel>
        <Panel
          header={<b>What is my reward for playing the Trivia Game?</b>}
          key="8"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              You get more Coins or Points when you answer the Trivial questions
              correctly. The Points add to your overall points on the
              LeaderBoard, which enables you to win the prizes including the
              Grand prize.
            </i>
          </p>
        </Panel>
        <Panel
          header={<b>Can I play Trivia if my subscription expires?</b>}
          key="9"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              You can't play Trivia if you don't have an active subscription.
              You can’t even access the platform if you do not have an active
              subscription.
            </i>
          </p>
        </Panel>
        <Panel
          header={<b>What are Avatars?</b>}
          key="10"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              Avatars are Icons representing you and the contestants of the
              Y'ello Star Show. The performance of these Avatars adds to your
              overall points which makes you eligible to win prizes.
            </i>
          </p>
        </Panel>
        <Panel
          header={
            <b>
              Does my Subscription affect the number of Avatars I can purchase?
            </b>
          }
          key="11"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              You are entitled to purchase up to three Avatars to play the game
              irrespective of your chosen subscription plan.
            </i>
          </p>
        </Panel>
        <Panel
          header={<b>How can I switch a low performing Avatar?</b>}
          key="12"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              You can switch a low performing Avatar for a better one using your
              Coins or Points.
            </i>
          </p>
        </Panel>
        <Panel
          header={
            <b>How many times can I switch a low performing Avatar in a day?</b>
          }
          key="13"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              You can switch your Avatar as many times as possible if your Coin
              balance is enough to make “switch”.
            </i>
          </p>
        </Panel>
        <Panel
          header={<b>How Many Times Can I Play a Prediction Game?</b>}
          key="14"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              You can play a Prediction game as many times as you wish before it
              closes for the day.
            </i>
          </p>
        </Panel>
        <Panel
          header={<b>Can I play a Prediction game without Playing Trivia?</b>}
          key="15"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>You can play a Prediction without playing the Trivia quiz.</i>
          </p>
        </Panel>
        <Panel
          header={<b>Support contact</b>}
          key="16"
          className="site-collapse-custom-panel"
        >
          <p>
            <i>
              All support services are available to address and respond promptly
              to any of your questions regarding your usage of the App. You can
              reach out to us to tell us how we can help you. Address: 24,
              Ekololu Street, Surulere, Lagos, Nigeria. Email:
              <a href="mailto:support@yellostargames.com">
                support@yellostargames.com
              </a>
            </i>
          </p>
        </Panel>
      </Collapse>
    </div>
  );
}

export default HelpCenter;
