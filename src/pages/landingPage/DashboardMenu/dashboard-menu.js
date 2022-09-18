import React, { useState } from "react";
import { HomeSidebar, Menu } from "../../../components";
// import biggieslogo from "../../../assets/images/biggies-logo.svg";
import biggieslogo from "../../../assets/images/logo.png";
import FeatherIcon from "feather-icons-react";
import { useHistory, NavLink } from "react-router-dom";
import { isAuthenticated } from "../../../utils/authdata";

const DashboardMenu = ({ setShowModal, showModal, showOnDashboard }) => {
  const [toggle, setToggle] = useState(false);

  const { token, name } = isAuthenticated();

  let history = useHistory();

  const routeProfile = () => {
    history.push("/profile");
  };
  const AvartImages = (name) => {
    const userProfilename = name?.split(" ");

    const firstLetter = userProfilename ? userProfilename[0]?.charAt(0) : "";
    return firstLetter;
  };

  return (
    <>
      <HomeSidebar
        setToggle={setToggle}
        toggle={toggle}
        token={token}
        showOnDashboard={showOnDashboard}
        setShowModal={setShowModal}
      />
      <Menu>
        <Menu.Wrapper>
          <Menu.Group showMobile="flex" showDesktop="none">
            <Menu.Logo>
              <NavLink to="/">
                {" "}
                <img src={biggieslogo} alt="log" />
              </NavLink>
            </Menu.Logo>
          </Menu.Group>

          <Menu.Group showMobile="none" showDesktop="flex"></Menu.Group>

          <Menu.Group showMobile="none" showDesktop="flex">
            <Menu.LinkItem>
              <div className="user-avatar-box" onClick={routeProfile}>
                <div style={{ textTransform: "capitalize" }} className="avatar">
                  {" "}
                  {AvartImages(name)}{" "}
                </div>{" "}
                <div className="desc">Hi, {name?.split(" ")[0]}</div>
              </div>
            </Menu.LinkItem>
          </Menu.Group>
          <Menu.Group
            showMobile="flex"
            showDesktop="none"
            onClick={() => setToggle(true)}
          >
            <FeatherIcon icon="menu" color="#fff" size="40px" />
          </Menu.Group>
        </Menu.Wrapper>
      </Menu>
    </>
  );
};

export default DashboardMenu;
