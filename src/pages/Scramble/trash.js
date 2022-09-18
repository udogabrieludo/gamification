<div
        style={{ padding: "20px 0", display: "flex", justifyContent: "center" }}
      >
       

        {true && (
          <>
            <Modal
              dialogClassName="guessGame"
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={true}
            >
              <div className={newguess.alreadyguessed}>
                <img
                  src={successcheck}
                  style={{ width: "65px" }}
                  alt="successcheck"
                />
                <div className={newguess.guessmade}>Guess Recorded</div>
                <div className={newguess.guessdesc}>
                  Count down to review result{" "}
                  <Countdown
                  
                    value={new Date(guessgames?.endDateTime)}
                    onFinish={onFinish}
                  
                    valueStyle={{ color: "#cf1322" }}
                  />
                </div>
              

                <div className={`${newguess.btnwrapper} mb-3`}>
                  <button className={newguess.smallbtn} onClick={playagain}>
                    {" "}
                    Play Again{" "}
                  </button>
                  <button
                    onClick={() => history.push("/dashboard")}
                    
                    className={`${newguess.smallbtn} ${newguess.nobtn}`}
                  >
                    
                    Quit
                  </button>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
      {false && (
        <Modalb
          setTopUp={setTopUp}
          closeModal={() => setTopUp(false)}
          space={{ maxWidth: "776px" }}
          cancelIcon={true}
        >
          <Payments />
        </Modalb>
      )}


      const ScrambleWord = () => {
        // setUnscramble("");
        const words = [
          "andrew",
          "humber",
          "maxwell",
          "mitchel",
          "chidiebere",
          "demola",
          "emmanuel",
          "tunde",
          "celestina",
          "princess",
        ];
        const sortWord = words.sort((a, b) => 0.5 - Math.random());
        const array = [];
        sortWord.forEach((item) => {
          const temp = item.split("");
          temp.sort((a, b) => 0.5 - Math.random());
          const temp1 = temp.join("");
          array.push(temp1);
        });
    
        const rndInt = Math.floor(Math.random() * words.length - 1) + 1;
    
        // setWord(array[rndInt]);
      };