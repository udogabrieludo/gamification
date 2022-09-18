import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import Spinner from '../../components/Spinner'
import position from './position.module.css'
import { getPositionInWords } from '../../utils/utils'

import positiondown from "../../assets/svg/positiondown.svg";
import correctrightarrow from "../../assets/svg/correctrightarrow.svg";
import {isAuthenticated} from '../../utils/authdata'

import { useQuery } from "react-query";

const colorSelect = (data) =>{
  if(data == 1 ){
    return '#09b233'
  }
  else if (data == 2) {
    return '#99B233'
  }
  else if (data == 3) {
    return '#A2B233'
  }
  else if (data == 4) {
    return '#C3B233'
  }else if (data == 5) {
    return '#FFB833'
  }else if (data == 6 ){
    return '#FF8C33'
  }else if (data == 7) {
    return '#FF6933'
  }else if (data == 8) {
    return '#FF4F33'
  }else if (data == 9) {
    return '#FF2333'
  }else {
    return '#D61E2A'
  }
}



const Position = () => {


  const {token} = isAuthenticated()

  const fetchMyPoints = async () => {

  
      try{
        const res = await axios.get(`${process.env.REACT_APP_AUTH_URL}/api/v1/position`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      
        return res.data
      }catch(error) {
        // console.log('error from getting points: ', error)
      }
    }
    

  const {data, status } = useQuery('myPoints', fetchMyPoints, {
    staleTime: 20000
  } )
  // console.log('data is data', data)

    return (
        <div
      className={`${position.stackcard} ${position.myposition}`}
      style={{ width: "100%", height: "100%" }}
    >
      <div className={position.pointstitle}>Position</div>
      <div className={position.positionnumber}>
      {status === "loading" && <Spinner cz="20px" />}
        {status === "success" && <>
        {data?.obj || 0}
        <span className={position.suffix}>{getPositionInWords(data?.obj)}</span>
        </>}
       
        <i style={{fontSize: '20px',color: 'green'}} className="fas fa-caret-up " ></i>
        
      </div>
      <HashLink to="/leaderboard" className={position.viewleaderboard}>
        View leaderboard&nbsp; &nbsp; 
        <img src={correctrightarrow} alt="correct right arrow" />
      </HashLink>
    </div>
    )
}

export default Position
