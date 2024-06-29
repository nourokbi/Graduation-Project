/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, useDisclosure } from "@nextui-org/react";
import { Modal } from "./Modal";

export function FormModal({ children, buttonText,buttonStyle,header, isOpen, onOpen, onOpenChange}) {

  return (
    <div>
      <Modal
        buttonText={buttonText}
        buttonStyle={buttonStyle}
        header={header}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onclose}
        onOpenChange={onOpenChange}
        size={"xl"}
      >
        <>
          {children}
        </>
      </Modal>
    </div>
  );
}
