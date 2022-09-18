import React from "react";
import { Link } from "react-router-dom";
import stack from "./stack.module.css";
import MyPoints from "./MyPoints";

import coin from "../../assets/images/coin.svg";
import coinbank from "../../assets/images/coinbank.svg";
import positiondown from "../../assets/svg/positiondown.svg";
import correctrightarrow from "../../assets/svg/correctrightarrow.svg";

import Position from './Position'
import MyMyPoints from './MyMyPoints'
import Wallet from './Wallet'


const Stack = () => {
  return (
    <div className={stack.stackwrapper}>
      <div className={stack.pointswrap}>
        <MyPoints />
      </div>
      <div className={stack.walletwrapper}>
        <Wallet />
      </div>
      <div className={stack.positionwrapper}>
        <MyMyPoints />
      </div>
      <div className={stack.positionwrapper}>
        <Position />
      </div>
    </div>
  );
};

export default Stack;
