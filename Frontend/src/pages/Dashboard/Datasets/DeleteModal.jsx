import { Trash2 } from "lucide-react";
import { Modal } from "../../../components/Modal";
import { useState } from "react";

export default function DeleteModal() {
  const [openModal, setOpenModal] = useState(false);

  const buttonText = (
    <>
      <Trash2 />
    </>
  );

  const handleDelete = () => {
    //! Delete dataset from database
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Modal
        buttonText={buttonText}
        buttonClass="delete-btn"
        setOpenModal={setOpenModal}
        openModal={openModal}
      >
        <div className="delete-modal">
          <h2>Are you sure you want to delete this dataset?</h2>
          <div className="delete-modal-btns column">
            <button className="delete-modal-btn" onClick={handleDelete}>
              Delete
            </button>
            <button className="cancel-modal-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
