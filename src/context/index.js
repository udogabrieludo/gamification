import React, { createContext, useReducer } from "react";

export const StatsContext = createContext();

const Initial = {
  stat: {},
  openModal: false,
  account:[],
  loading:false
};

const CartInitial = {
  cart: [],
  avatars: [],
  avatarActivities: {},
};


const statsReducer = (state, action) => {
  switch (action.type) {
    case "STATS":
      return {
        ...state,
        stat: action.payload,
      };
    case "OPEN_MODAL":
      return { ...state, openModal: action.payload };
    case "ADD_ACCOUNT":
        return {...state, account:action.payload };
    case "SET_LOADING":
      return {...state, loading:action.payload }
      
 
    default:
      return state;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_AVATAR":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "GET_ALL_AVATARS":
      return { ...state, avatars: action.payload };
    case "GET_ACTIVITIES":
      return { ...state, avatarActivities: action.payload };
    case "REMOVE_FROM_AVATAR":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "REMOVE_ALL_FROM_AVATAR":
      return { ...state, cart: [] };

    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(statsReducer, Initial);
  const [cartState, cartDispatch] = useReducer(reducer, CartInitial);
  return (
    <StatsContext.Provider value={{ state, dispatch, cartState, cartDispatch }}>
      {children}
    </StatsContext.Provider>
  );
};
