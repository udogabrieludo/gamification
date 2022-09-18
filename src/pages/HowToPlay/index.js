import React from "react";
import { BreadCrumb } from "../../components";
import HeaderNav from "../../components/HeaderNav";
import Howtoplay from "../../pages/Help/Howtoplay";
import Navbar from '../../pages/landingPage/MainMenu/Navbar'
import { Main } from "../../components";
import style from './style.module.css'

const HowToPlay = () => {
  return (
    <>
      {/* <HeaderNav landing={true} toplay={true} /> */}
     <div className="help">
     <Navbar />
      <BreadCrumb  title='How To Play'  subtitle='Learn more about Biggie’s game'/> 
       <Main >
       <Howtoplay />
       </Main>
     </div>
    </>
  );
};

// style={{border: "1px solid var(--humber-primary)",
//     borderRadius: "10px"}}
export default HowToPlay;
