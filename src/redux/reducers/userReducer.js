const initialState = {
    user: 'taofik',
    balance: 100,
    email: 'bidemi64@gmail.com'
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_BALANCE':
            return state.balance
        default:
            return state
            // break;
    }
}

export default userReducer