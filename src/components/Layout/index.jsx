import React from "react";
import IdleTimer from "react-idle-timer";
import DashboardMenu from "../../pages/landingPage/DashboardMenu/dashboard-menu";
import Navbar from "../../pages/landingPage/MainMenu/Navbar";
import HeaderNav from "../HeaderNav";
import Sidebar from "../Sidebar";
import styles from "./style.module.css";

const index = (props) => {
  const { children } = props;

 

  return (
    <>
      <div>
        <Sidebar />
        <div className={styles.bodyContainer}>
          {/* <HeaderNav /> */}
          <DashboardMenu  showOnDashboard={true} />
          {children}
        </div>
      </div>
    </>
  );
};

export default index;
