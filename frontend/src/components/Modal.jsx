// Modal.js
import React from "react";

const Modal = ({ handleConfirm }) => {
  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Logout</h3>
          <p className="py-4">Are you sure you want to log out?</p>
          <div className="modal-action">
            <button className="btn" onClick={handleConfirm}>
              Yes
            </button>
            <button className="btn" onClick={() => document.getElementById("my_modal_5").close()}>
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
