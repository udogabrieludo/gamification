import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import FeatherIcon from "feather-icons-react";




const Success = ({setSuccessModal, amountAdded }) => {

    const formatNumber = (x) => {
        if (x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return x;
      };
  return (
    <>
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
      
    </>
  );
};

export default Success;
