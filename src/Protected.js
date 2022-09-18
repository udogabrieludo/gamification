
import {Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from './utils/authdata'


export const Protected = ({component: Component, ...rest }) => (

    <Route {...rest } render={props => isAuthenticated()? (
        <Component {...props} />
 
    ) : (
       <Redirect to={{pathname: "/",  state: { from: props.location }}} />
 
    )} />
    
)
 



// import React from "react";
// import { Route, Redirect } from "react-router-dom";

// const getAuthToken = () => {
//   const myUser = JSON.parse(localStorage?.getItem("user"));
//   const token = myUser?.token;
//   return token;
// };
// const isAuthenticated = getAuthToken();

// function Protected(props) {
//   if (isAuthenticated) {
//     return (
//       <Route exact={props.exact} path={props.path}>
//         {props.children}
//       </Route>
//     );
//   } else return <Redirect to="/" />
// }

// export default Protected;

