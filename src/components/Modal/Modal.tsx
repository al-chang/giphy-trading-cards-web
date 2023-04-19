import { PropsWithChildren, useEffect } from "react";

import "./index.css";

export type TModal = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<PropsWithChildren<TModal>> = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      className="Modal__container"
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        onClose();
      }}
    >
      <div className="Modal__content">{children}</div>
    </div>
  );
};

export default Modal;
