import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./style.module.css"
import topup from '../../assets/svg/top-up-icon.svg'
import Button from '../Button'
import Spinner from '../Spinner'

export const ProductCardSuccess = () => {
  return (
    <div
      style={{
        position: "relative",
        background: "blue",
        width: "100%",
        textAlign: "center",
      }}
    >
      <div style={{ paddingTop: "20px" }}>Subscription</div>
      
      <div style={{ padding: "30px" }}>
        <h4>Complete your subscription and click continue to proceed!</h4>
        <button>continue</button>
      </div>
    </div>
  );
};
const productBtn = {
  boxShadow: '0px 0px 85px rgba(0, 0, 0, 0.05)', 
  cursor: 'pointer',
  border: 'none',
  color: 'white',
  backgroundColor: '#1290DF',
      padding: '12px 15px',
      backgroundImage: 'linear-gradient( #1290DF, #2C6BA5 )'
}
const ProductCard = (props) => {
  const token = localStorage.getItem('token')
  const myUserId = JSON.parse(localStorage.getItem('user'))
  const userId = myUserId.userId
  const myphoneNumber = myUserId.phoneNumber

  const { productsService } = props
  const [step, setStep] = useState(1)
  const [selectSub, setSelectSub] = useState(false)
  const [selectSub1, setSelectSub1] = useState(false)
  const [selectSub2, setSelectSub2] = useState(false)
  const products = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  // console.log("product card component", products);
  // console.log("a user list", user);

  const [subscribeOption, setSubscribeOption] = useState({productId: '', phoneNumber: myphoneNumber})
  const pickSubscription = (prodId) => {
    setSubscribeOption({
      ...subscribeOption,
      productId: prodId,
    })
  }
 

  const onSubscribe = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/yello-star-ms/v1/subscriptions`, {
      productId: subscribeOption.productId,
      phoneNumber: subscribeOption.phoneNumber
    }, {
      headers: {
        "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
      }
    })
      .then((response) => {
        
        setStep(2)
      })
      .catch((error) => {
        // console.log('error form subscription', error)
      })
  }
  const onComplete = (id) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/subscriptions/v1/subscriptions?userId=${userId}`,
    {
      headers : {
        "client-id": `${process.env.REACT_APP_CLIENT_ID}`,
      "authorization": `Bearer ${token}`
  }})
      .then((response => {
     
        if(!response.data.length) {
          alert('You have not completed your subscripton!')
        }else {
          alert('Subscription confirmed')
        }
      }))
      .catch((error) => {
        // console.log('onComplete err', error)
      })
  }
  return (
    <>
    {step === 1 && 
      <>
      <div className={styles.container}>
      <div className={styles.title}>Choose an Active Subscription</div>
      <div className={styles.prodWrap}>
      {productsService.loading ? <Spinner /> : productsService.data.data.map(prods => {
          return (
            <div key={prods.id} className={`${styles.oneCard} ${prods.id === subscribeOption.productId ? styles.clicked : ''}`} onClick={()=> pickSubscription(prods.id)}>
            <img src={topup} alt="top up icon" />
            <div>{prods.amount}</div>
            <div>{prods.description}</div>
            </div>
            )
        })}
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <Button dstyles={productBtn} title="Subscribe" onClick={onSubscribe} />
      </div>
    </div>
      </>
    }

    <div>

    {step === 2 && 
      <>
        <h3>Subscription</h3>
        <p>
        Complete your subscription and click continue to proceed!
        </p>
      <Button dstyles={productBtn} title="Continue" onClick={()=> onComplete('60de3c86c1c2d9001ce711e3')} />
      </>
    }
    
    </div>
    </>
  );
};

export default ProductCard;
