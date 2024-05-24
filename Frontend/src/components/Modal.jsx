/* eslint-disable react/prop-types */
import { Modal as FlowModal } from "flowbite-react";

export function Modal({ buttonText,buttonClass,openModal, setOpenModal, children }) {

  return (
    <>
    <button
        onClick={() => {
          setOpenModal(true);
        }}
        className={buttonClass}
      >
        {buttonText}
      </button>
      <FlowModal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="modal"
      >
        <div className="modal-content">
          <FlowModal.Header className="modal-header"></FlowModal.Header>
          <FlowModal.Body className="modal-body">{children}</FlowModal.Body>
        </div>
      </FlowModal>
    </>
  );
}
