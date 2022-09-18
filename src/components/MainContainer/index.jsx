import React from 'react'
import './style.css'

const MainContainer = (props) => {
    const { children } = props
    return (
        <div className="maincontainer">
            <h1>Welcome</h1>
            { children }
        </div>
    )
}

export default MainContainer
