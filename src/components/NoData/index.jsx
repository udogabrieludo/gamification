import React from 'react'
import FeatherIcon from "feather-icons-react";

const NoData = (props) => {
    return (
        <div
           style={{
             flexDirection: "column",
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             height: '150px'
           }}
         >
           <div>
             <FeatherIcon  size={props.size ? props.size : "35px"} color="var(--humber-primary)" icon="inbox" />
           </div>
           <div style={{color:"var(--humber-black)"}}>{props?.text ? props?.text : 'No Prizes available yet!'}</div>
         </div>
    )
}

export default NoData
