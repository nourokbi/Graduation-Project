import { useDisclosure } from "@nextui-org/react";
import OutputModal from "../../../components/Modals/OutputModal";
import { Bolt } from "lucide-react";
import { useState } from "react";

export default function EditIndexModal() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [index, setIndex] = useState({});

  const buttonText = (
    <>
      <Bolt size={20} /> Edit
    </>
  );

  return (
    <div>
      <OutputModal
        buttonText={buttonText}
        buttonStyle="edit-index-modal"
        header="Edit Index"
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div className="edit-index-form">
          <form>
            <div className="form-group">
              <label htmlFor="threshold">Threshold</label>
              <input type="text" id="threshold" name="threshold" />
            </div>
            <div className="btn-group">
              <button className="cancel" type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save">Save</button>
            </div>
          </form>
        </div>
      </OutputModal>
    </div>
  );
}
