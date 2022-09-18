import { combineReducers } from 'redux'
import productReducer, { walletBalanceReducer, fetchPointsBalanceReducer, getTriviaBalanceReducer, getPredictionBalanceReducer, getAvatarBalanceReducer, getAvatarRankReducer } from './productReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    balance: walletBalanceReducer,
    points: fetchPointsBalanceReducer,
    trivia: getTriviaBalanceReducer,
    prediction: getPredictionBalanceReducer,
    avatar: getAvatarBalanceReducer,
    rank: getAvatarRankReducer
})

export default rootReducer