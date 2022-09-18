import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {isAuthenticated} from './authdata'
import { StatsContext } from '../context/'



 


export const useFetchStat = () => {
    const [userCoins, setCoins]= useState()
    const [userPoints, setPoints]= useState()
    const [userTokens, setTokens]= useState()
    const [guessStats, setGuess] = useState()
    const [ triviaStats, setTrivia ] = useState();
    const [loading, setLoading] = useState(false)
    const [scramble, setScramble] = useState(true)
    const {  dispatch } = useContext(StatsContext)
    const [loading1, setLoading1] = useState(false)

    const {token} = isAuthenticated()
 
    const fetchUserAccount = async () =>{
        dispatch({
            type:'SET_LOADING',
            payload:true
        })
        
        setLoading(true)
        try{
            const response = await axios.get(`${process.env.REACT_APP_PAYMENT_URL}/api/bank-accounts`, {
                headers: { 'Authorization': `Bearer ${token}`}
            })
            setLoading(false)
            
            dispatch({
                type:"ADD_ACCOUNT",
                payload:response?.data?.obj
            })
            dispatch({
                type:'SET_LOADING',
                payload:false
            })
            
        }catch(error){
            setLoading(false)
            dispatch({
                type:'SET_LOADING',
                payload:false
            })
           
        }
    }

    const fetchUserStat = async () => {
        setLoading(true)
        try{
            const response = await axios.get(`${process.env.REACT_APP_PAYMENT_URL}/api/points/user-stat`, {
                headers: { 'Authorization': `Bearer ${token}`}
            })
            setLoading(false)
            
            dispatch({
                type:"STATS",
                payload:response?.data
            })
            setCoins(response.data.COINS)
            setPoints(response.data.POINTS)
            setTokens(response.data.TOKEN)
        }catch(error){
            setLoading(false)
           
        }
    }

    const fetchGuess = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_GUESS_GAME_URL}/guess-game-answer/game-stat`,{
                headers: { 'Authorization': `${token ? token :''}`}
            })
            // console.log(response)
            const guessstats = response.data.obj.guessGame
            setGuess(guessstats)
        }catch(err){
           

        }
    }
    const fetCHScramble =  async  () => {
        try {  
            const response = await axios.get(`${process.env.REACT_APP_GUESS_GAME_URL}/crossword-game-answer/game-stat`,{
                headers: { 'Authorization': `${token ? token :''}`}
            })
            
            const scrambleStat = response.data.obj.crossWordGame
            setScramble(scrambleStat)
            
        }catch(err){
           
        }
    }
    const fetChTrivial = async  () => {
        try {   
            const response = await axios.get(`${process.env.REACT_APP_GUESS_GAME_URL}/trivia-game-answer/game-stat`,{
                headers: { 'Authorization': `${token ? token :''}`}
            })
            // setTrivia
            const trivials = response.data.obj.triviaGame
            // console.log(response)
            
            setTrivia(trivials )
        }catch(err){
          
        }
    }
    useEffect(() => {
        fetchUserStat()
        fetchGuess()
        fetChTrivial()
        fetCHScramble()
        fetchUserAccount()
    }, [])
    
    // console.log('my token is ', userTokens)

    return {
        userCoins, 
        userPoints, 
        userTokens,
        guessStats,
        triviaStats,
        loading,
        scramble
    }
}

