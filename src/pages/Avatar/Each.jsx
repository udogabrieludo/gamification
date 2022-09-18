import React from "react";
import checkmark from "../../assets/images/checkmark.svg";
import dp2 from "../../assets/images/dp2.svg"

import "./each.css";
import Modal from "../../components/Modal"

const Each = (props) => {
  const { avatar } = props;
  const [selected, setSelected] = React.useState(false)

  const handleSelected = () => {
    setSelected(true)
  }
  const closeSelected = () => {
    setSelected(false)
  }
  
  return (
    <React.Fragment>
    <div className="select-avatar" key={avatar.id} onClick={handleSelected}>
      <div className="avart-head">
        <img 
          // src={avatar.image}
          src={dp2}
          alt="mary" />
        <div className="select-avatar-head">
          <div>
          <span className="avatar-name">{avatar.label}</span>
          <br/>
          {/* <span className="avatar-id">Contestant {avatar.contestantId}</span> */}
          </div>
        </div>
      </div>
      <div className="ul-wrapper">
        <ul>
          <li>
            Name: <strong>{avatar.label}</strong>
          </li>
          <li>
            Sex: <strong>{avatar.sex}</strong>
          </li>
          <li>
            State: <strong>{avatar.state}</strong>
          </li>
          <li>
            Lifestyle: <strong>{avatar.lifestyle}</strong>
          </li>
          <li>
            Favorite: <strong>{avatar.favorite}</strong>
          </li>
          <li>
            Strenght: <strong>{avatar.strenght}</strong>
          </li>
          <li>
            status: <strong>{avatar.meta.status}</strong>
          </li>
          <li>
            Weakness: <strong>{avatar.weakness}</strong>
          </li>
        </ul>
      </div>
      <div className="pts-check">
        <div className="select-points">
          {avatar.value}
          <span>Pts</span>
        </div>
        <img className="check-mark" src={checkmark} alt="checkmark" />
      </div>
    </div>
    
      {
        selected && <Modal closeModal={closeSelected}>
        <div style={{textAlign: 'center'}}>
        <p>icon here</p>
        <p>
        Name: <strong>{avatar.label}</strong>
        </p>
          <p>
          status: <strong>{avatar.meta.status}</strong>
          </p>
        </div>
        </Modal>
      }
      </React.Fragment>
  );
};

export default Each;
