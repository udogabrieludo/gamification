import React from 'react'
import { NavLink } from "react-router-dom";


const SubMenu = ({menu}) => {
    return (
        <NavLink
                    to={menu.route}
                    style={{
                      color: "#FFFFFF",
                      padding: "15px 0 15px 20px",
                      display: "flex",
                      borderBottom: "1px solid #FFF",
                      textDecoration: "none"
                    }}
                  >
                    <img  src={menu.icon} alt={menu.name} />
                    <div style={{ paddingLeft: "10px" }}>{menu.name}</div>
        </NavLink>
    )
}

export default SubMenu
