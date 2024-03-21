import { FC, ReactNode, useEffect, useRef } from "react";

export interface IModal {
  children: ReactNode;
  onClose(): void;
}

const Modal: FC<IModal> = ({ onClose, children, ...props }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    modalRef.current?.showModal();
  }, []);

  return (
    <dialog className="modal" ref={modalRef} onClose={onClose} {...props}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <div className="modal-action flex-col justify-start">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
