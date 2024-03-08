import { FC, useEffect, useRef, useState } from "react";
import { IBudget } from "../types/Budget";

export interface IModal {
  handleUpdate(value: IBudget["amount"]): void | Promise<void>;
  showModal: boolean;
  handleClose(): void;
  initialValue: IBudget["amount"];
}

const Modal: FC<IModal> = ({
  handleUpdate,
  showModal,
  handleClose,
  initialValue,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [budgetValue, setBudgetValue] = useState<number>(0);

  const closeModal = () => {
    modalRef.current?.close();
    handleClose();
  };

  const handleSubmit = () => {
    handleUpdate(budgetValue);
  };

  useEffect(() => {
    if (showModal) {
      modalRef.current?.showModal();
      setBudgetValue(initialValue);
    }
  }, [showModal, initialValue]);

  return (
    <dialog className="modal" ref={modalRef} onClose={closeModal}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action justify-start">
          <form method="dialog" onSubmit={handleSubmit}>
            <input
              className="input input-bordered w-full max-w-xs"
              step=".01"
              type="number"
              value={budgetValue}
              name="budgetValue"
              onChange={(event) =>
                setBudgetValue(
                  event.target.value ? parseFloat(event.target.value) : 0
                )
              }
            />

            <div className="flex gap-2 mt-4">
              <button className="btn btn-primary" type="submit">
                Update
              </button>

              <button className="btn" type="button" onClick={closeModal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
