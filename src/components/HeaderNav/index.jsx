import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import headernav from "./style.module.css";
import patriciagames from "../../assets/svg/patriciagames.svg";
import danger from "../../assets/images/danger.svg";
import bbnaija from "../../assets/images/bbnaija.png";
import biggiesgame from "../../assets/images/Biggiess.png";
import biggieslogo from "../../assets/images/biggieslogo.png";
import { sidebarroute } from "../Sidebar/sidebar";
import { landingRoutes } from "../Sidebar/sidebar";
import dp from "../../assets/images/dp2.svg";
import EventMitter from "../../utils/emitter.js";
import Bsidebar from "../../components/bsidebar/bsidebar.jsx";
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { slide as Menu } from "react-burger-menu";
import { Drawer, Button, Radio, Space } from 'antd';


const HeaderNav = (props) => {
  const { landing, toplay } = props;
  
  const userObj = JSON.parse(localStorage.getItem("user"));
  const name = userObj?.name;
  const [mobileNav, setMobileNav] = useState(false);
  const [submenu, setSubMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const history = useHistory();
  const username = JSON.parse(localStorage.getItem("user"));
  const [bar, setBar] = useState(false)
  const namer = username?.profile?.name;
  // console.log("ololo", username?.profile?.name);

  const handleSubMenu = (args) => {
    if (args === "games") {
      setSubMenu(!submenu);
    }
  };

  const AvartImages = (name) => {
    const userProfilename = name?.split(" ");
    
    const firstLetter = userProfilename[0].charAt(0);
    return firstLetter
  };

  const showMobileNav = () => {
    setMobileNav(!mobileNav);
  };
  const showProfile = () => {
    setProfile(!profile);
  };

  const handleLogout = () => {
  
    localStorage.removeItem("user");
    history.push("/");
  };

  const emittEvent = () => {
    EventMitter.emit("closeLandingCard");
  };

  // console.log("name got from local", name);
  return (
    <React.Fragment>
      <nav
        className={`${headernav.navWrapper} ${
          !landing && headernav.nolanding
        } ${toplay && headernav.nolanding} ${landing && headernav.blackbg}`}
      >
        {/* <img src={patriciagames} className={`${headernav.brand} ${landing ? headernav.rmmargl : ''}` } alt="patricia logo" /> */}
        {/* <img
            onClick={() => history.push("/")}
            src={biggiesgame}
            className={`${headernav.brand} ${landing ? headernav.rmmargl : ""}`}
            style={{
              width: "100px",
              objectFit: "contain",
              margin: "40px 0 30px 40px",
              imageRendering: "pixelated ",
              height: "fit-content",
            }}
            alt="biggies game"
          /> */}
          {!landing && (
          <img
            onClick={() => history.push("/")}
            src={biggieslogo}
            className={`${headernav.brand} ${!landing ? headernav.img_mobile : ""}`}
            style={{
              width: "100px",
              objectFit: "contain",
              margin: "40px 0 30px 40px",
              imageRendering: "pixelated ",
              height: "fit-content",
            }}
            alt="biggies game"
          />
        )}
        {landing && (
          <img
            onClick={() => history.push("/")}
            src={biggieslogo}
            className={`${headernav.brand} ${landing ? headernav.rmmargl : ""}`}
            style={{
              width: "100px",
              objectFit: "contain",
              margin: "40px 0 30px 40px",
              imageRendering: "pixelated ",
              height: "fit-content",
            }}
            alt="biggies game"
          />
        )}
        {landing ? (
          <>
            <ul className={headernav.navUl}>
              <li>
                <Link to="/how-to-play">How to play</Link>
              </li>
              <li>
                <Link to="/prizes">Prizes</Link>
              </li>
              <li>
                <Link to="/help-support">help & support</Link>
              </li>
              {userObj ? (
                <button
                  onClick={() => history.push("/dashboard")}
                  style={{
                    cursor: "pointer",
                    height: "50px",
                    margin: "-8px 0 0 30px",
                    backgroundColor: "#2B9FDD",
                    borderRadius: "30px",
                    border: "none",
                    padding: "10px 30px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.openModal();
                    emittEvent();
                  }}
                  style={{
                    cursor: "pointer",
                    height: "50px",
                    margin: "-8px 0 0 30px",
                    backgroundColor: "#2B9FDD",
                    borderRadius: "30px",
                    border: "none",
                    padding: "10px 30px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Login 
                </button>
              )}
            </ul>
          </>
        ) : (
          ""
        )}

        {!landing && (
          <div className={headernav.welcomeProf}>
            <div className={headernav.prof}>
              {/* <img
                src={dp}
                className="mydp"
                onMouseOver={showProfile}
                alt="new img"
              /> */}
              <Avatar type='button' onClick={()=>{
                history.push('/profile')
              }} size={60}>
                <div styles={{fontSize: '35px!important',
                fontWeight: '900',
                fontFamily: 'Poppins'}}>
                  {AvartImages(name?.toUpperCase())}
              </div></Avatar>
            </div>
            <div className={headernav.welcome}>
              <div
                className="username"
                style={{ fontSize: "23px", textTransform: "capitalize" }}
              >
                <strong>Hi, {name?.split(' ')[0]}</strong>
              </div>
              {/* <div className="welcome-text" style={{ fontSize: "12px" }}>
                This is your Biggies Game Dashboardtr
              </div> */}
            </div>
          </div>
        )}

        <div className=" ">
          {/* <img
            style={{ width: "80px", objectFit: 'contain',  margin: '40px 0 40px 40px' }}
            src={biggiesgame}
            alt="logo"
          /> */}
          {/* <div className={headernav.burger} onClick={showMobileNav}>
          <div className={headernav.hamSub}></div>
          <div className={headernav.hamSub}></div>
          <div className={headernav.hamSub}></div>
          <div className={headernav.hamSub}></div>
        </div> */}
        </div>
      </nav>

      {/* side bar for mobile */}
      <Bsidebar openModal={props.openModal} />
       

      {!landing && mobileNav && (
        <div className={headernav.mobileMenu}>
          <div onClick={showMobileNav} className={headernav.closeMobileNav}>
            <img
              src={danger}
              className={headernav.mobileNavIconClose}
              alt="close"
            />
            <div
              className="close-text"
              style={{ color: "white", paddingLeft: "10px" }}
            >
              close
            </div>
          </div>
          {sidebarroute.map((link) => (
            <div key={link.id} className={headernav.subLinkWrapper}>
              <Link
                to={link.link}
                onClick={() => handleSubMenu(link.name)}
                className={headernav.mobNavLink}
              >
                <img
                  className={headernav.mobileNavIconClose}
                  src={link.icon}
                  alt={link.name}
                />
                <div onClick={link.name === "logout" ? handleLogout : ""}>
                  {link.name}
                </div>
              </Link>
              {link.sub ? (
                <ul
                  className={`${
                    submenu ? headernav.mobileSubLink : headernav.hideSubMenu
                  } `}
                >
                  {link.sub.map((sub) => (
                    <Link to={sub.link} className={headernav.subLinkClass}>
                      <li>
                        {sub.name}
                        <img
                          className="mobileNavIconClose"
                          src={sub.icon}
                          alt={sub.name}
                        />
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      )}
      {landing && mobileNav && (
        <div className={headernav.mobileMenu}>
          <div onClick={showMobileNav} className={headernav.closeMobileNav}>
            <img
              src={danger}
              className={headernav.mobileNavIconClose}
              alt="close"
            />
            <div
              style={{ color: "white", paddingLeft: "10px" }}
              className="close-text"
            >
              close
            </div>
          </div>
          {landingRoutes.map((link) => (
            <div key={link.id} style={{ width: "100%" }}>
              <Link
                to={link.route}
                onClick={() => handleSubMenu(link.name)}
                style={{
                  textDecoration: "none",
                  color: "white",
                  textTransform: "capitalize",
                  marginBottom: "10px",
                  padding: "15px 0",
                  width: "100%",
                  display: "block",
                }}
              >
                {link.name}
              </Link>
            </div>
          ))}
          <button
            onClick={props.openModal}
            style={{
              cursor: "pointer",
              height: "50px",
              margin: "-8px 0 0 30px",
              backgroundColor: "#2B9FDD",
              borderRadius: "30px",
              border: "none",
              padding: "10px 30px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Sign Up / Login
          </button>
        </div>
      )}
    </React.Fragment>
  );
};


export default HeaderNav;
