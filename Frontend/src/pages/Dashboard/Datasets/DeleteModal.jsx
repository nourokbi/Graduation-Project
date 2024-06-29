import { Button, useDisclosure } from "@nextui-org/react";
import OutputModal from "../../../components/Modals/OutputModal";
import { Trash2 } from "lucide-react";

export default function DeleteModal() {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  const buttonText = (
    <>
      <Trash2 size={20} />
    </>
  );

  const handleDelete = () => {
    console.log("Deleted");
    onClose();
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
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </OutputModal>
  );
}
