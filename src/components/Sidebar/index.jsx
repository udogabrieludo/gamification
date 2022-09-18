import React, { useState, useEffect,useRef } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { sidebarroute } from "./sidebar";
import sidestyle from "./style.module.css";
import naijaidol from "../../assets/images/nigerian-idol.png";
import bbnaija from "../../assets/images/bbnaija.png";
import biggiesgame from "../../assets/images/Biggiess.png";
// import biggieslogo from "../../assets/images/biggieslogo.png";
import biggieslogo from "../../assets/images/logo-white.png";
import gulder_logo from "../../assets/images/gulder_logo.png";
import IdleTimer from "react-idle-timer";
import { signout } from "../../utils/authdata";

const Sidebar = () => {
  const history = useHistory();
  const [submenu, setSubMenu] = useState(false);
  const idleTimerRef = useRef(); 

  const handleLogout = () => {
    localStorage.removeItem("user");

    window.location = "/";
  };

  const handleSubMenu = (args) => {
    if (args === "games") {
      setSubMenu(!submenu);
    }
  };
  const hideSubMenu = (args) => {
    setSubMenu(false);
  };

  const logout =()=>{
    signout(()=>{
        history.push('/')
    })
} 
  return (
   <IdleTimer  ref={idleTimerRef}  timeout={1000 * 60 * 15} onIdle={logout}>
      <div className={sidestyle.sidebar}>
      <div>
        <div className={sidestyle.logoWrapper}>
        <img
          onClick={() => history.push("/")}
          className={sidestyle.logoImg}
          src={biggieslogo}
          alt="logo"
          style={{cursor: 'pointer'}}
        />
        </div>
        {sidebarroute.map((route) => {
          return (
            <div key={route.id} style={{ position: "relative" }}>
              <div style={{ boxSizing: "border-box" }}>
                {route.name === "logout" ? (
                  <div
                    className={sidestyle.newnavlink}
                    onClick={
                      route.name === "logout"
                        ? handleLogout
                        : () => handleSubMenu(route.name)
                        
                    }
                  >
                    <img
                      style={{ width: "20px", height: "20px" }}
                      src={route.icon}
                      alt={route.title}
                    />
                    {route.name}
                  </div>
                ) : route.name === "games" ? (
                  <div
                    className={sidestyle.newnavlink}
                    onClick={() => handleSubMenu(route.name)}
                  >
                    <img
                      style={{ width: "20px", height: "20px" }}
                      src={route.icon}
                      alt={route.title}
                    />
                    {route.name}
                  </div>
                ) : (
                  <NavLink
                    activeStyle={{
                      fontWeight: "bold",
                      background: "var(--humber-button-color)",
                      color: "#FFFFFF",
                    }}
                    to={route.link}
                    className={sidestyle.navlink}
                    style={{ boxSizing: "border-box" }}
                    onClick={
                      route.name === "logout"
                        ? handleLogout
                        : () => handleSubMenu(route.name)
                    }
                  >
                    <img
                      style={{ width: "20px", height: "20px" }}
                      src={route.icon}
                      alt={route.title}
                    />
                    <div>{route.name}</div>
                  </NavLink>
                )}
              </div>

              {route.sub ? (
                <div
                  onClick={hideSubMenu}
                  onMouseLeave={hideSubMenu}
                  className={`${submenu ? sidestyle.sideSubmenu : sidestyle.hideSubMenu}`}
                >
                  {route.sub.map((sub) => (
                    <Link
                      to={sub.link}
                      className={sidestyle.hoverEffect}
                      style={{
                        color: "#FFFFFF",
                        padding: "15px 0 15px 20px",
                        display: "flex",
                        borderBottom: "1px solid #FFF",
                        textDecoration: "none",    
                      }}
                      // onMouseOver={(e) => e.target.style.background = '#fff' }
                      key={sub.id}
                    >
                      <img src={sub?.icon} alt={sub?.name} />
                      <div style={{ paddingLeft: "10px" }}>{sub?.name} </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
   </IdleTimer>
  );
};

export default Sidebar;
