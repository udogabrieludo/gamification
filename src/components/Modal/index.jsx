import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch} from 'react-redux'
import styles from "./style.module.css";
import useProduct from "../../utils/UseProduct";
import cancelicon from "../../assets/svg/cancel-icon.svg";
import EventMitter from "../../utils/emitter.js";
import './modal.css'

import { Modal } from "react-bootstrap";

export const BModal = (props) => {
  const { children, closeModal, space, cancelIcon, noCancelIcon, style } = props;
  // const dispatch= useDispatch()
  // const products = useSelector(state => state.product)

  const { user, product } = useProduct();


  return (
    <div className={styles.modalOverlay} style={style}>
      <div className={styles.modalWidth} style={space}>
        {cancelIcon ? (
          <img
            src={cancelicon}
            onClick={closeModal}
            className={styles.cancel}
            alt="cancel"
          />
        ) : noCancelIcon ? (
          ""
        ) : (
          ""
        )}
        <div style={{ marginTop: "40px" }}>{children}</div>
      </div>
    </div>
  );
};

const BBModal = ({ children, closeModal,modalClass, dialogClassName, closeButton = true }) => {
  const [modal, setModal] = useState(true);

  return (
    <Modal contentClassName={`${modalClass ? modalClass : 'auth_modal'}`}
      show={modal}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={closeModal}
      dialogClassName={dialogClassName}
    >
      <Modal.Header closeButton = {closeButton}>
        {/* <Modal.Title>Modal heading</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
    </Modal>
  );
};

export default BBModal;
