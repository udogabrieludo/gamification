import React, { useState } from 'react'
import axios from 'axios'
import {isAuthenticated} from './authdata'
import { useQuery } from "react-query";



export const useMyFetchStuffs = () => {
    const {token} = isAuthenticated()

    const fetchMyStat = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_PAYMENT_URL}/api/points/user-stat`, {
                headers: { 'Authorization': `Bearer ${token}`}
            })
           const mycoins = response.data.COINS
           const mytoken = response.data.TOKEN
           const mypoints = response.data.POINTS
            return {
                mycoins, mytoken, mypoints
            }
            
        }catch(error){
        }
    }
    const { data, status} = useQuery('new tboy token query', fetchMyStat)

    return {data, status}
}