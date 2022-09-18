<><div className={styles.formwrapper}>
  <div className={styles.inputblock}>
    <input
      type="number"
      id="amount"
      value={amountToSend}
      onChange={(e) => handleAmount(e.target.value)}
      style={{ padding: "23px" }} />

    <div>Min 100</div>
  </div>
  {/* <button>finish</button> */}
  {/* {amountToSend < 100 ? 'amount cant be less than 100 naira' : 'okay'} */}
  {modulus && "amount has to be divisible by 10"}
  {/* <PaystackButton {...componentProps}  /> */}
  <PaystackHookExample />
</div><div style={{ width: "90%", margin: "0 auto", textAlign: "center" }}>
    <div className={styles.depositamount}>
      Deposit Amount (<span>&#8358;</span>)
    </div>
    <div className={`d-flex  justify-content-between align-items-center ${styles.formwrapper}`}>
      <div className={styles.inputblock}>
        <input
          className="form-control"
          type="number"
          id="amount"
          value={amountToSend}
          onChange={(e) => handleAmount(e.target.value)}
          style={{ padding: "23px" }} />

        <div>Min 100</div>
      </div>
      <PaystackHookExample />
    </div>

    

  <div className={styles.description}>
      {/* <p>
      There is no <strong>fee for deposits</strong> with this payment
      method. If your transaction is authorized, your account will be
      credited immediately.
    </p>
    <p>
      You can <strong>cancel withdrawals</strong> that have not yet
      been processed.
    </p> */}
    </div>
  </div></>