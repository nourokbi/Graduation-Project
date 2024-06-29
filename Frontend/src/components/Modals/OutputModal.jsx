/* eslint-disable react/prop-types */
import { Modal } from "./Modal";

export default function OutputModal({
  buttonText,
  buttonStyle,
  header,
  children,
  isOpen,
  onOpen,
  onOpenChange,
  size,
}) {
  return (
    <div>
      <Modal
        buttonText={buttonText}
        buttonStyle={buttonStyle}
        header={header}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        size={size}
      >
        <>{children}</>
      </Modal>
    </div>
  );
}
/* 
    Usage:
  import { useDisclosure } from "@nextui-org/react";
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  and start using the modal by passing all props.
*/
