import { FC, ReactNode, useEffect, useRef } from "react";

export interface IModal {
  children: ReactNode;
  onClose(): void;
}

const Modal: FC<IModal> = ({ children, onClose, ...props }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    modalRef.current?.showModal();
  }, []);

  return (
    <dialog className="modal" ref={modalRef} onClose={onClose} {...props}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action justify-start">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
