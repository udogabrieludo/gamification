import React from "react";

import styles from "./style.module.css";

const Howtoplay = () => {
  return (
    <>
      <div className="zoom">
        {/* style={{border: "1px solid var(--humber-primary)", padding: "15px", borderRadius: "10px"}} */}
        <div>
          {/* <strong className={styles.title}>General Information</strong> */}
          <div
            style={{
              padding: "10px 0",
              fontSize: "16px",
              lineHeight: "1.7rem",
            }}
          >
            <strong>Welcome to Biggie’s Game!</strong> <br />
            <small>
              <i>Every player is a winner! </i>
            </small>
          </div>
          <strong className={styles.title}>How to Play?</strong>
          <div
            style={{
              padding: "10px 0",
              fontSize: "16px",
              lineHeight: "1.7rem",
            }}
          >
            Deposit a minimum of ₦100 to participate in the games. The value of
            your deposit is given as tokens and the reward for every successful
            gameplay is in "Coins".  Players will additionally earn Points for{" "}
            <strong style={{ fontSize: "1rem" }}>every key activity</strong> on
            the platform, such as "Sign Up, Gameplay, and Deposit".
          </div>
          <div style={{ padding: "5px 0", fontSize: "16px" }}>
            Sign up to the  Biggie’s website- www.biggiesgame.com
          </div>
          <div style={{ margin: "10px 0" }}>
            <ul className={styles.myp}>
              <li>
                A one time verification code is sent to the Player via{" "}
                <strong>EMAIL</strong>.
              </li>
              <li>
                Enter the code and get signed into the Biggie's games account.
              </li>
            </ul>
          </div>
          {/* <strong className={styles.title}>Payment</strong> */}
          {/* <div style={{ fontSize: "16px" }}>
            Players can buy tokens to play the  ultimate  games.
          </div>
          <div style={{ margin: "10px 0" }}>
            <ul className={styles.myp}>
              <li> Minimum deposit of ₦100 will get you 10 Tokens.</li>
              <li>
              For every correct gameplay, players earn Coins that can be used to redeem prizes.

              </li>
              <li>
              For every activity on the platform, players earn Points, which increases ranking on the leaderboard. You can also redeem prices with your Points.
              </li>
             
            </ul>
          </div> */}
          <strong className={styles.title}>GAMES</strong>
          <br />
          {/* <div style={{ padding: "5px 0", fontSize: "16px" }}>
            You can play the Avatar, Guess , Trivia and Word Scramble Game.
          </div> */}
          {/* <strong style={{ color: "var(--humber-primary)" }}>Avatar Game</strong>{" "}
          <br />
          <p className={styles.myp}>
            <div style={{ padding: "5px 0", fontSize: "16px", color: "#000" }}>
              The Gulder "Avatar Games" is one in which players can pick Avatars
              to represent them in a game for the purpose of scoring game
              points. Avatars will be ranked and given positions based on their
              performance in the show. Players who select the highest-scoring
              Avatars shall earn Coins earmarked for each round of Avatar
              activities.
            </div>
          </p> */}
          {/* <div style={{ margin: "10px 0" }}>
            <ul className={styles.myp}>
              <li>
                Avatar is an icon or figure representing you and the Contestants
                participating in the Gulder Ultimate show.
              </li>
              <li>An Avatar game play costs 10 tokens</li>
              <li>
                Each Avatar score increases based on their performance in the
                show. The number of Coins earned by each successful Player
                depends on the number of Players who choose correctly.
              </li>
            </ul>
          </div> */}
          <strong style={{ color: "var(--humber-primary)" }}>Trivia Game</strong>{" "}
          <br />
          <div className={styles.myp}>
            <div
              style={{
                padding: "5px 0",
                fontSize: "16px",
                color: "#000",
              }}
            >
              Trivia is a multiple-choice quiz game about General knowledge on
              different topics and industries in Nigeria and Diaspora.
            </div>
          </div>
          <div style={{ margin: "10px 0" }}>
            <ul className={styles.myp}>
              <li>Player selects Trivia Game.</li>
              <li>Trivia cost 2 tokens per play.</li>
              <li>
                Player selects 'continue'
                <ul className={styles.myp}>
                  <li>System  deduct tokens and displays question with options.</li>
                  <li>A countdown timer of 20 secs is also displayed.</li>
                  
                </ul>
              </li>
              <li>Player selects option and submit answer.</li>
              <li>The game result is displayed (Player’s coin and points earned).</li>
            </ul>
          </div>
          <strong style={{ color: "var(--humber-primary)" }}>Guess Game (Coming Soon)</strong>{" "}
          <br />
          <div className={styles.myp}>
            <div
              style={{
                padding: "5px 0",
                fontSize: "16px",
                color: "#000",
              }}
            >
              This game allows players to speculate possible results of events
              based on available categories.
            </div>
          </div>
          <div style={{ margin: "10px 0" }}>
            <ul className={styles.myp}>
              <li>Player clicks on Guess Game.</li>
              <li>System displays Guess Categories.</li>
              <li>
                Player selects a category that is Live based on the countdown
                timer
              </li>
              <li>
                Categories or events that has timed out (00:00) are invalid and
                should not be selected.
              </li>
              <li>Player selects a game instance.</li>
              <li>Cost of game is displayed (10 Tokens).</li>
              <li>Player inputs an answer (Free text or Option).</li>
              <li>Player submits guess.</li>
              <li>
                Game result will be published at the end of the countdown timer.
              </li>
            </ul>
          </div>
          <strong style={{ color: "var(--humber-primary)" }}>
            Word Scramble
          </strong>{" "}
          <br />
          <div className={styles.myp}>
            <div
              style={{
                padding: "5px 0",
                fontSize: "16px",
                color: "#000",
              }}
            >
              In the Word Scramble game, players are to unscramble a word within
              a limited time of 20 seconds. The Word Scramble game costs 5
              Tokens per play. Player earns coins and points for every correct
              word found.
            </div>
          </div>
          <div style={{ margin: "10px 0" }}>
            <ul className={styles.myp}>
              <li>Player selects Scramble game.</li>
              {/* <li>
                {" "}
                System shall display Word Scramble game landing page which shall
                show: O Game Categories
              </li>
              <li>
                Player shall select any category and click ‘Play’ to initiate
                game play.
              </li> */}
              <li>
                System displays cost of game, scrambled word and the countdown timer of 20
                secs.
              </li>
              {/* <li>Player can click on ‘Hint’ at a cost while the game is on</li> */}
              {/* <li>The timer pauses.</li> */}
              {/* <li>
                If Player selects continue, System deducts tokens and gives
                player a missing letter.
              </li>
              <li>
                If Player selects Return, the system goes back to the game
                instance and continues the game.
              </li> */}
              <li>Player unscrambles word within the time given.</li>
              <li>
                Game result is displayed when a player submits or game instance
                times out.
              </li>
              <li>Players can select ‘play again’ or ‘quit’.</li>
              <li>
                If player select ‘quit’ system takes player back to the homepage
                to consider playing another game.
              </li>
            </ul>
          </div>
          <strong className={styles.title}>LEADERBOARD</strong>
          <div
            style={{
              padding: "5px 0",
              fontSize: "16px",
              color: "#000",
            }}
          >
            The leaderboard shows the ranking of every player in Biggies's
            Game.
          </div>
          <div style={{ margin: "10px 0" }}>
            <ul className={styles.myp}>
              <li>
                Player gets points for every activity done on the Games
                platform.
              </li>
              <li> Your "Points" get you a position on the Leaderboard.</li>
              <li>
                Players on the leaderboard will be eligible for amazing "FLASH"
                rewards from time to time.
              </li>
            </ul>
          </div>
          <strong className={styles.title}>REDEEM PRIZES</strong>
        <div
            style={{
              padding: "5px 0",
              fontSize: "16px",
            }}
          >
            You can redeem prizes with your{" "}
            <strong style={{ fontSize: "1rem" }}> Coins</strong> and 
            <strong style={{ fontSize: "1rem" }}> Points </strong>. Click on
            “Redeem Prize” as they appear on your profile page. Select prizes
            that your coins or points cover accordingly and follow the steps
            displayed to get prizes.
          </div>
        </div>
      </div>
    </>
  );
};

export default Howtoplay;
