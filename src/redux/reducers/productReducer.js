
const productServiceState = {
    loading: true,
    data: [],
    error: ''
}
export const FETCH_PRODUCT_REQUEST = "FETCH_PRODUCT_REQUEST"
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS"
export const FETCH_PRODUCT_FAILURE = "FETCH_PRODUCT_FAILURE"
export const FETCH_WALLET_BALANCE = "FETCH_WALLET_BALANCE"
export const FETCH_POINTS_BALANCE = "FETCH_POINTS_BALANCE"
export const GET_TRIVIA_BALANCE = "GET_TRIVIA_BALANCE"
export const GET_PREDICTION_BALANCE = "GET_PREDICTION_BALANCE"
export const GET_AVATAR_BALANCE = "GET_AVATAR_BALANCE"
export const GET_RANK = "GET_RANK"

export const fetchWalletBalance = (balance) => {
    return {
        type: FETCH_WALLET_BALANCE,
        payload: balance,
    }
}
export const fetchPointsBalance = (points) => {
    return {
        type: FETCH_POINTS_BALANCE,
        payload: points,
    }
}
export const getTriviaBalance = (trivia) => {
    return {
        type: GET_TRIVIA_BALANCE,
        payload: trivia
    }
}
const sims = {
    trivia: ''
}
export const getTriviaBalanceReducer = (state=sims, action) => {
    switch(action.type) {
        case GET_TRIVIA_BALANCE:
            return {...state, trivia: action.payload}
        default:
            return state
    }
}
export const getPredictionBalance = (prediction) => {
    return {
        type: GET_TRIVIA_BALANCE,
        payload: prediction
    }
}
const pims = {
    prediction: ''
}
export const getPredictionBalanceReducer = (state=pims, action) => {
    switch(action.type) {
        case GET_TRIVIA_BALANCE:
            return {...state, prediction: action.payload}
        default:
            return state
    }
}

export const getAvatarBalance = (avatar) => {
    return {
        type: GET_TRIVIA_BALANCE,
        payload: avatar
    }
}
const aims = {
    avatar: ''
}
export const getAvatarBalanceReducer = (state=aims, action) => {
    switch(action.type) {
        case GET_TRIVIA_BALANCE:
            return {...state, avatar: action.payload}
        default:
            return state
    }
}

export const getRank = (rank) => {
    return {
        type: GET_RANK,
        payload: rank
    }
}
const rims = {
    rank: ''
}
export const getAvatarRankReducer = (state=rims, action) => {
    switch(action.type) {
        case GET_RANK:
            return {...state, rank: action.payload}
        default:
            return state
    }
}

const pointsinit = {
    points: ''
}
export const fetchPointsBalanceReducer = (state = pointsinit, action) => {
    switch(action.type) {
        case FETCH_POINTS_BALANCE:
            return {
                ...state, points: action.payload
            }
        default: 
            return state
    }
}

export const fetchProductRequest = () => {
    return {
        type: FETCH_PRODUCT_REQUEST
    }
}
export const fetchProductSuccess = (users) => {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload: users
    }
}
export const fetchProductFailure = (error) => {
    return {
        type: FETCH_PRODUCT_FAILURE,
        payload: error
    }
}
const balinit = {
    balance: ''
}
export const walletBalanceReducer = (state = balinit, action) => {
    switch(action.type) {
        case FETCH_WALLET_BALANCE:
            return {
                ...state,
                balance: action.payload
            }
        default:
            return {state}
    }
}
const productReducer = (state=productServiceState, action) => {
    switch(action.type) {
        case FETCH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_PRODUCT_SUCCESS:
            return {
                loading: false,
                data: action.payload
            }
        case FETCH_PRODUCT_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        default:
            return {...state}
    }
}


// export const fetchTheProducts = () => {
//     return function(dispatch){
//         dispatch(fetchProductRequest())
//         axios.get(`${process.env.REACT_APP_BASE_URL}/products/v1/product?type=subscription`)
//             .then(response => {
//                 const products = response.data
//                 console.log(products)
//                 dispatch(fetchProductSuccess(products))
//             })
//             .catch(error => {
//                 dispatch(fetchProductFailure(error.message))
//             })
//     }
// }

export default productReducer