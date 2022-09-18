import React from 'react'
import './style.css'

const Wrapper = ({children}) => {
    return (
        <div className="tha-wrapper">
        {children}
        </div>
    )
}
export const WrapperContainer = ({children}) => {
    return (
        <div className="wrapper-conatiner">
        {children}
        </div>
    )
}
export const HomeWrapper = ({children}) => {
    return (
        <div className="home-tha-wrapper">
        {children}
        </div>
    )
}


export const Topping = ({children}) => {
    return (
        <div className="topping">
        {children}
        </div>
    )
}
export const SubWrapper = ({children}) => {
    
    return (
        <div className="tha-sub-wrapper">{children}</div>
    )
}
export const SectOne = ({children}) => {
    
    return (
        <div className="sect-one-wrapper">{children}</div>
    )
}
export const SectTwo = ({children}) => {
    
    return (
        <div className="sect-two-wrapper">{children}</div>
    )
}

export default Wrapper