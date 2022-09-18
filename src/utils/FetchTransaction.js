
import axios from 'axios'
import { isAuthenticated } from './authdata'



export const useFetchPointHistory = async () =>{
    const {token} = isAuthenticated();
  
    // process.env.REACT_APP_PAYMENT}/wallet/wallet-transactions?wallettype=COINS
    // process.env.REACT_APP_AUTH_URL}/api/v1/point-history
    // https://staging.api.biggies.humbergames.com/auth/api/v1/point-history

    try{
        const pointsResponse = await axios.get(`${process.env.REACT_APP_PAYMENT_URL}/api/points/point-history`, {
            headers: { 'Authorization': `Bearer ${token}`}
        })
        // console.log(pointsResponse)
       
        return pointsResponse
    }catch(error){
        console.log('error getting points history', error)
    }
}

export const fetchpointhistory = async () => {
const {token} = isAuthenticated();

    try{
        const points = await axios.get(`${process.env.REACT_APP_AUTH_URL}/api/v1/point-history`, {
            headers: { 'Authorization': `Bearer ${token}`}
        })
        return points
    }catch(error){
        console.log('error getting points history', error)
    }
}







export const useFetchCoinToken = async (params) =>{
    const {token} = isAuthenticated();
   // staging.api.biggies.humbergames.com/payment/api/wallet/wallet-transactions?wallettype=TOKENS
    // process.env.REACT_APP_AUTH_URL}/api/v1/wallet/wallet-transactions?${params}
    // process.env.REACT_APP_PAYMENT}/wallet/wallet-transactions?wallettype=COINS
    try{
        const coinTokenResponse = await axios.get(`${process.env.REACT_APP_PAYMENT_URL}/api/wallet/wallet-transactions?wallettype=TOKENS`, {
            headers: { 'Authorization': `Bearer ${token}`}
        })
    
        
        return coinTokenResponse
    }catch(error){
        console.log('error getting points history', error)
    }
}

export const fetchtokenhistory = async (params) =>{
    const {token} = isAuthenticated();
   
    try{
        const myTokens = await axios.get(`${process.env.REACT_APP_AUTH_URL}/api/v1/wallet/wallet-transactions?wallettype=TOKENS`, {
            headers: { 'Authorization': `Bearer ${token}`}
        })

        // console.log('what i got from my token endpoint', myTokens)
    
        
        return myTokens
    }catch(error){
        console.log('error getting points history', error)
    }
}

// process.env.REACT_APP_PAYMENT}/wallet/wallet-transactions?wallettype=COINS
export const useFetchCoin = async (params) =>{
    const {token} = isAuthenticated();
    // console.log(params)
    try{
        const coinTokenResponse = await axios.get(`${process.env.REACT_APP_PAYMENT_URL}/api/wallet/wallet-transactions?wallettype=COINS`, {
            headers: { 'Authorization': `Bearer ${token}`}
        })

        // console.log('from coins', coinTokenResponse)
        
        
        return coinTokenResponse ? coinTokenResponse : ''
    }catch(error){
        console.log('error getting points history', error)
    }
}

export const fetchcoinhistory = async (params) =>{
    const {token} = isAuthenticated();
    try{
        const cointransactionres = await axios.get(`${process.env.REACT_APP_AUTH_URL}/api/v1/wallet/wallet-transactions?wallettype=COINS`, {
            headers: { 'Authorization': `Bearer ${token}`}
        })
        // console.log('the actual log is', cointransactionres)

        return cointransactionres
    }catch(error){
        console.log('error getting points history', error)
    }
}

