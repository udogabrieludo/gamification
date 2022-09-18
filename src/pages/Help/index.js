import React, { useState } from "react";
import { Tabs } from "@feuer/react-tabs";
import { Collapse } from "antd";
import HowToPlayComponent from "../../components/HowToPlayComponent";
import "antd/dist/antd.css";
import "./style.css";
import Howtoplay from "./Howtoplay";
import Faq from './Faq'
import Terms from './Terms'

const { Panel } = Collapse;

const Help = () => {
  const [mytabs, setMytabs] = useState(1);
  const tabone = "Frequently Asked Question";
  const tabtwo = "Terms and Condition";
  const tabthree = "How to play";
  return (
    <div className="zoom" style={{ minHeight: "500px", paddingBottom: "50px" }}>
      <div className="zoom ownee-wrap">
        <div className="ownee">
          {mytabs === 1
            ? tabthree
            : mytabs === 2
            ? tabone
            : mytabs === 3
            ? tabtwo
            : ""}
        </div>
        <ul className="myultabs">
          <li
            onClick={() => setMytabs(1)}
            className={`myultabs-li ${mytabs === 1 && "tabactive"}`}
          >
            How To Play
          </li>
          <li
            onClick={() => setMytabs(2)}
            className={`myultabs-li ${mytabs === 2 && "tabactive"}`}
          >
            FAQ
          </li>
          <li
            onClick={() => setMytabs(3)}
            className={`myultabs-li ${mytabs === 3 && "tabactive"}`}
          >
            T & C's
          </li>
        </ul>
      </div>
      <div className="deep">
        {mytabs === 1 && <Howtoplay />}
        {mytabs === 2 && (
          <div style={{width: '100%'}}><Faq /></div>
        )}
        {mytabs === 3 && (
          <Terms />
        )}
      </div>
    </div>
  );
};

export default Help;
