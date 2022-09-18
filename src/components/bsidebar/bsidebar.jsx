import { Modal } from "react-bootstrap";

import { slide as Menu } from "react-burger-menu";
// import sidebarstyle from  "./siderbar.module.css"
import homeicon from "../../assets/images/home-icon.svg";
import profileicon from "../../assets/images/profile-icon.svg";
import leaderboardicon from "../../assets/images/leaderboard-icon.svg";
import helpicon from "../../assets/images/help-icon.svg";
import gameicon from "../../assets/images/games-icon.svg";
import sandbox from "../../assets/images/png/codesandbox.png";
import { Link, useHistory} from "react-router-dom";
import sidebarstyle from "./sidebar.module.css";
import { useState, useEffect , useRef} from "react";


const SideBar = (props) => {
  const [openSub, setOpenSub] = useState(false);
  const [userData, setUser] = useState(false);
  const [closeBar, setClose] = useState(false);
  const showandhideMenu = () => {
    setOpenSub(!openSub);
  };

  const handleLogout = () => {
 
    localStorage.removeItem("user");

    window.location = "/";
  };

  const closeSideBar = () => {
    setTimeout(() => {
      setClose(false);
    }, 1000);
  };
  useEffect(() => {
    let user = window.localStorage.getItem("user");
    if (user == null) {
      return;
    } else {
      setUser(JSON.parse(user));
    }
   

    const userType = navigator.userAgent;
    const burgers = document.querySelectorAll(".bm-burger-bars");
    // window.addEventListener('scroll', function($event){
    //   burgers.forEach((node)=>{
    //     if($event.path[1].scrollY > 145){
    //         node.classList.add('bg-danger')
    //       }else{
    //         node.classList.remove('bg-danger')

    //       }
    //   })

    // })
  }, []);

  return (
    <Menu bugger right outerContainerId={"App"}>
      <div className="mt-5">
        <ul className={` ${sidebarstyle.list_group}`}>
          <Link
            onClick={() => setClose(false)}
            to="/dashboard"
            className={`${sidebarstyle.list_group_item} d-flex align-items-center  `}
          >
            {" "}
            <img src={homeicon} /> Home{" "}
          </Link>
          {userData && (
            <li
              type="button"
              onClick={showandhideMenu}
              className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
            >
              {" "}
              <img src={gameicon} /> Games <i className="fas fa-chevron-down"></i>{" "}
            </li>
          )}
          {openSub && (
            <ul
              className={` list-group list-group-flush ${sidebarstyle.list_group_sub}`}
            >
              <li
                onClick={() => {
                  setClose((close) => !close);
                  
                }}
                to="/avatars"
                className={`${sidebarstyle.list_group_item_sub}`}
              >
                {" "}
                <img src={sandbox} /> Avatar{" "}
              </li>
              <li
                to="/trivia-game"
                className={`${sidebarstyle.list_group_item_sub}`}
              >
                {" "}
                <img src={sandbox} /> Trivia
              </li>
              <li
                to="/guess-game"
                className={`${sidebarstyle.list_group_item_sub}`}
              >
                {" "}
                <img src={sandbox} /> Guess
              </li>
            </ul>
          )}
          <li
            onClick={closeSideBar}
            to={userData ? "/leaderboard" : "/"}
            className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
          >
            {" "}
            <img style={{ height: "18px" }} src={leaderboardicon} /> Leaderboard
          </li>
          <li
            onClick={closeSideBar}
            to={userData ? "/help" : "/help-support"}
            className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
          >
            {" "}
            <img src={helpicon} /> Help
          </li>
          {/* if there is a user show profile */}
          {userData ? (
            <li
              to="/profile"
              className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
            >
              {" "}
              <img src={profileicon} /> Profile
            </li>
          ) : (
            <li
              type="button"
              onClick={() => {
                props.openModal();
                setClose(false);
              }}
              className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
            >
              {" "}
              <i
                style={{ fontSize: `27px` }}
                className="fas fa-sign-out-alt"
              ></i>{" "}
              Log in{" "}
            </li>
          )}
          {userData && (
            <li
              type="button"
              onClick={handleLogout}
              className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
            >
              {" "}
              <i
                style={{ fontSize: `27px` }}
                className="fas fa-sign-out-alt"
              ></i>{" "}
              Logout{" "}
            </li>
          )}
        </ul>
      </div>
      {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
    </Menu>
  );
};

const SideBar2 = (props) => {
  const [widthbox, setWidth] = useState('0px')
  const [openSub, setOpenSub] = useState(false);
  const [userData, setUser] = useState(false);
  const [closeBar, setClose] = useState(false);
  const history = useHistory()
  const showandhideMenu = () => {
    setOpenSub(!openSub);
  };
  

  const handleLogout = () => {
  
    localStorage.removeItem("user");

    window.location = "/";
    setWidth('0px')
  };
  const closeSideBar = () => {
    setWidth('0px')
  };
  const setWithMarging = () => {
    setWidth('300px')
  }
  const Close = () => {
    setWidth('0px')
  }
  useEffect(() => {
    let user = window.localStorage.getItem("user");
    if (user == null) {
      return;
    } else {
      setUser(JSON.parse(user));
    }
    

    const userType = navigator.userAgent;
    const burgers = document.querySelectorAll(".bm-burger-bars");
    // window.addEventListener('scroll', function($event){
    //   burgers.forEach((node)=>{
    //     if($event.path[1].scrollY > 145){
    //         node.classList.add('bg-danger')
    //       }else{
    //         node.classList.remove('bg-danger')

    //       }
    //   })

    // })
  }, []);
  return (
    <>
      <div  onClick={setWithMarging} className={`${sidebarstyle.burger} position-fixed`}><div></div>
<div></div>
<div></div></div>
   
      <div id="mySidenav" style={{width:widthbox}} className={`${sidebarstyle.sidenav}`}>
        <a className="closebtn" onClick={Close}>&times;</a>
        <div className="">
        <ul className={` ${sidebarstyle.list_group}`}>
           
          <li
            onClick={() => {
              history.push('/dashboard');
              closeSideBar();

            }}
            
            className={`${sidebarstyle.list_group_item} d-flex align-items-center  `}
          >
            {" "}
            <img src={homeicon} /> Home{" "}
          </li>
          {userData && (
            <li
              type="button"
              onClick={showandhideMenu}
              className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
            >
              {" "}
              <img src={gameicon} /> Games <i className="fas fa-chevron-down"></i>{" "}
            </li>
          )}
          {openSub && (
            <ul
              className={` list-group list-group-flush ${sidebarstyle.list_group_sub}`}
            >
              <li
                onClick={() => {
              history.push('/dashboard');
              closeSideBar();

            }}
                to="/avatars"
                className={`${sidebarstyle.list_group_item_sub}`}
              >
                {" "}
                <img src={sandbox} /> Avatar{" "}
              </li>
              <li 
              onClick={() => {
              history.push('/trivia-game');
              closeSideBar();

            }}
                
                className={`${sidebarstyle.list_group_item_sub}`}
              >
                {" "}
                <img src={sandbox} /> Trivia
              </li>
              <li
                
                className={`${sidebarstyle.list_group_item_sub}`}
                onClick={() => {
              history.push('/guess-game');
              closeSideBar();

            }}
              >
                
                <img src={sandbox} /> Guess
              </li>
            </ul>
          )}
          <li
            onClick={() => {
              history.push(userData ? "/leaderboard" : "/");
              closeSideBar();

            }}
            to={userData ? "/leaderboard" : "/"}
            className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
          >
            {" "}
            <img style={{ height: "18px" }} src={leaderboardicon} /> Leaderboard
          </li>
          <li
            onClick={() => {
              history.push(userData ? "/help" : "/help-support");
              closeSideBar();

            }}
            
            className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
          >
            {" "}
            <img src={helpicon} /> Help
          </li>
          {/* if there is a user show profile */}
          {userData ? (
            <li
              to="/profile"
              className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
              onClick={() => {
              history.push("/profile");
              closeSideBar();

            }}
            >
              {" "}
              <img src={profileicon} /> Profile
            </li>
          ) : (
            <li
              type="button"
              onClick={() => {
                props.openModal();
                setClose(false);
                closeSideBar();
              }}
              className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
            >
              {" "}
              <i
                style={{ fontSize: `27px` }}
                className="fas fa-sign-out-alt"
              ></i>{" "}
              Log in{" "}
            </li>
          )}
          {userData && (
            <li
              type="button"
              onClick={handleLogout}
              className={`${sidebarstyle.list_group_item} d-flex align-items-center `}
            >
              {" "}
              <i
                style={{ fontSize: `27px` }}
                className="fas fa-sign-out-alt"
              ></i>{" "}
              Logout{" "}
            </li>
          )}
        </ul>
      </div>
      </div>
     
    </>
  );
};

export default SideBar2;
