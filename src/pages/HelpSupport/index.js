import React from "react";
import { Breadcrumb, Collapse } from "antd";
import styles from "./style.module.css";
import HeaderNav from "../../components/HeaderNav";
import Faq from '../Help/Faq'
import Navbar from '../../pages/landingPage/MainMenu/Navbar'
import { BreadCrumb } from "../../components";


const { Panel } = Collapse;
const HelpSupport = () => {
  return (
    <>
      {/* <HeaderNav toplay={true} landing={true} /> */}
      <div className="help">
      <Navbar />
      
      <BreadCrumb  title='Help & Support Center'  subtitle='Learn more about the bIGGIES Games'/>       
         <Faq />
      </div>
    
    </>
  );
};

export default HelpSupport;
