import React from "react";
import Styles from "./rewardcard.module.css";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";


const maskAccount = (string) => {
  var str = string;

  var trailingCharsIntactCount = 4;

  str =
    new Array(str.length - trailingCharsIntactCount + 1).join("x") +
    str.slice(-trailingCharsIntactCount);

  return str;
};
const Select = ({ account, selectedAccount, setSelected, setOpenType }) => {

  React.useEffect(()=>{
    if(account.length > 0) {
      setSelected(account[0])
    }
  },[])
 
  const SelectedAccount = (acc) => {
    if(setSelected){
      setSelected(acc);
    }
   
    
  };
  return (
    <div class="mt-3">
      {account.length > 0 && (
        <div
          style={{
            marginTop: "-33px",
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          className="text-center"
        >
          {account.length > 1 ? 'Select account' : 'Your account'}
        </div>
      )}
      <>
        {account.length > 0 ? (
          <>
            {account.map((acc, i) => (
              <div
              key={i + 'account'}
                onClick={() => SelectedAccount(acc)}
                className={` p-2 rounded ${
                  selectedAccount.accountNumber === acc.accountNumber
                    ? Styles.form_check_selected
                    : Styles.form_check
                }`}
              >
                <div class="form-check d-flex justify-content-between ">
                  {" "}
                  {/* <input 
            class="form-check-input"
            type="radio"
            checked={true}
            value=""
            id="flexCheckDefault-1"
          />{" "} */}
                  <label
                    style={{ flexDirection: "column", display: "flex" }}
                    class=" d-flex  newsletter form-check-label"
                    for="flexCheckDefault-1"
                  >
                    <span style={{ fontWeight: "bold" }}>
                      {acc?.accountName}
                    </span>
                    <span>{maskAccount(acc?.accountNumber)}</span>
                    <span>{acc?.bankName}</span>
                  </label>{" "}
                  {selectedAccount.accountNumber === acc.accountNumber && (
                    <FeatherIcon color="green" icon="check-circle" />
                  )}
                </div>
                
              </div>
            ))}
          </>
        ) : (
          <div  className="d-flex alert alert-warning  ">
            <div style={{fontSize: 18}} className="">
              <div>
              Bank details not found on your profile !!
              </div>
              <div >
                Click <Link style={{ color: "blue" }} to="/profile">
                Here
              </Link> to add an account
              </div>
             
            </div>
          </div>
        )}
      </>
    <div className="d-flex justify-content-end mt-3">
   {account.length !== 0 && (
    <button className={`${Styles.continue}`} onClick={()=>setOpenType("redeem")} >continue</button>
   )}
    </div>
    </div>
  );
};

export default Select;
