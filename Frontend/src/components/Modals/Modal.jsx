/* eslint-disable react/prop-types */
import {
  Modal as NextModal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";

export function Modal({
  children,
  header,
  isOpen,
  onOpen,
  onOpenChange,
  buttonText,
  buttonStyle,
  size,
}) {
  return (
    <>
      <button onClick={onOpen} className={`${buttonStyle}`}>
        {buttonText}
      </button>
      <NextModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={size}
        placement="center"
        scrollBehavior="outside"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 font-bold">
              {header}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </>
        </ModalContent>
      </NextModal>
    </>
  );
}
