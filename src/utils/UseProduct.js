import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  // fetchTheProducts,
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  fetchWalletBalance,
  fetchPointsBalance,
  getTriviaBalance,
  getPredictionBalance,
  getAvatarBalance,
  getRank
} from "../redux/reducers/productReducer";


const UseProduct = (Component) => {
  
  
  const NewComponent = (props) => {
   
    const dispatch = useDispatch();
  const prod = useSelector((state) => state.prod)


  const token = localStorage.getItem("token");
const myUserId = JSON.parse(localStorage?.getItem("user"));
const userId = myUserId?.userId;

  const fetchTheProducts = () => {
    dispatch(fetchProductRequest());
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/products/v1/product?type=subscription`,
        {
          headers: {
            "client-id": "local_0bd7bb6cbe99ef6e37f5",
          },
        }
      )
      .then((response) => {
        const products = response.data;
       
        dispatch(fetchProductSuccess(products));
      })
      .catch((error) => {
        dispatch(fetchProductFailure(error.message));
      });
  };
  // https://sandbox.api.humbergames.com/predictions/user
  // https://sandbox.api.humbergames.com/trivia/user
  // https://sandbox.api.humbergames.com/avatars/user
  // `loyalty/points/leaderboard?schemeId=${process.env.REACT_APP_LOYALTY_SCHEME_ID}&userId=${userId}`,

  
  // useEffect(() => {
  //   getPosition()
  // }, [])
  

  const fetcher = (url, dispatcher) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/${url}/user`, {
      headers: {
        "client-id": process.env.REACT_APP_CLIENT_ID,
        "user-id": `${userId}`,
        authorization: `Bearer ${token}`,
      }
    }).then(res => {
      dispatch(dispatcher(res.data))
      
    }).catch(err => {
      
    })
  }
  const getPosition =()=> {
    axios.get(`${process.env.REACT_APP_BASE_URL}/loyalty/points/leaderboard?schemeId=${process.env.REACT_APP_SCHEME_ID}&userId=${userId}`, {
      headers: {
        "client-id": process.env.REACT_APP_CLIENT_ID,
        "user-id": `${userId}`,
        authorization: `Bearer ${token}`
      }
    }).then(res => {
      dispatch(getRank(res.data))
    
    }).catch(err => {
     
    })
  }

  

  useEffect(() => {
    fetcher('predictions', getPredictionBalance)
    fetcher('trivia', getTriviaBalance)
    fetcher('avatars', getAvatarBalance)
    getPosition()
  }, [])
  const fetchWallet = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/loyalty/points/balance?schemeId=${process.env.REACT_APP_SCHEME_ID}&userId=${userId}`, {
      headers: {
        "client-id": process.env.REACT_APP_CLIENT_ID,
        "user-id": `${userId}`,
        authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
    
        dispatch(fetchPointsBalance(response.data.pointBalance))
      })
      .catch(err => {
        
      })
  }
  const walletBalance = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/billings/wallets?customerId=${userId}&projection=walletWithDetails`, {
      headers: { 
        'Content-Type': 'application/json',
        "client-id": process.env.REACT_APP_CLIENT_ID,
        "user-id": `${userId}`,
        authorization: `Bearer ${token}`
      }
    }).then(response => {
      dispatch(fetchWalletBalance(response.data._embedded.wallets[0].balance))
      
    }).catch(err => {
      
    })
  }
    // const handleAuth = () => {
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     history.replace("/");
    //   }
    // }

    // handleAuth();

    useEffect(() => {
      walletBalance()
    }, [])

    useEffect(() => {
      fetchWallet()
    }, [])

    useEffect(() => {
      // handleAuth()
        fetchTheProducts()
    }, [])

    const user = useSelector((state) => state.user);
    const show = user.balance < 50 ? true: false
    const product = useSelector((state) => state.product);
    const [productModal, setProductModal] = useState(show);

    const closeModal = () => {
      setProductModal(false)
    }

    // if (user.balance > 50) {
    //     setProductModal(true)
    // }
    return <Component {...props} product={product} productModal={productModal} closeModal={closeModal} setProductModal={setProductModal}  />;
  };
  return NewComponent;
};

export default UseProduct;
