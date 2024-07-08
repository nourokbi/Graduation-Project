/* eslint-disable react/prop-types */
import { useDisclosure } from "@nextui-org/react";
import OutputModal from "../../../components/Modals/OutputModal";
import { Trash2 } from "lucide-react";
import { useAuth } from "../../../contexts/authContext";

export default function DeleteModal({ id, onDelete }) {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
  const { userData } = useAuth();
  const DELETE_URL = `http://127.0.0.1:5000/delete_dataset/${userData.access}/${id}`;

  const buttonText = (
    <>
      <Trash2 size={20} />
    </>
  );

  const handleDelete = async () => {
    try {
      const response = await fetch(DELETE_URL, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onDelete(id);
      console.log("Deleted");
      onClose();
    } catch (error) {
      console.error("There was a problem deleting the dataset:", error);
    }
  };

  return (
    <OutputModal
      onOpen={onOpen}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      header={"Delete Dataset"}
      buttonText={buttonText}
      buttonStyle={"delete-btn"}
    >
      <div className="delete-form">
        <h2>Are you sure you want to delete this dataset?</h2>
        <div className="flex justify-end gap-4 mb-4 mt-4">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </OutputModal>
  );
}
