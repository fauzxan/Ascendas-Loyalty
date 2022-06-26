import React from "react";
import "./styles/Modal.css";

function Modal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>Continue?</h1>
        </div>
        <div className="body">
          <p>Next page is good</p>
        </div>
        <div className="footer">
          <button onClick={() => closeModal(false)}> Cancel </button>
          <button> Continue </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
