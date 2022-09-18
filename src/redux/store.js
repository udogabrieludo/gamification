import { createStore } from 'redux'
import rootReducer from './reducers'

// import { composeWithDevTools } from 'redux-devtools-extension';
// const storeEnhancers = () => {
//     return {
//         applyMiddleware(thunkMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     }
// }
// const enhancer = (composeEnhancers) => (
//     applyMiddleware(thunkMiddleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
//     // other store enhancers if any
//   )
const store = createStore(
    rootReducer,
    // applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store