import { FC, useEffect, useRef, useState } from "react";

export interface IModal {
  onUpdate(value: number): void | Promise<void>;
  onClose(): void;
  initialValue: number;
  onYearUpdate(value: number): void;
}

const Modal: FC<IModal> = ({
  onUpdate,
  onClose,
  initialValue,
  onYearUpdate,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [budgetValue, setBudgetValue] = useState<number>(initialValue);

  const closeModal = () => {
    onClose();
  };

  const handleSubmit = () => {
    onUpdate(budgetValue);
  };

  const handleYearClick = () => {
    onYearUpdate(budgetValue);
    closeModal();
  };

  useEffect(() => {
    modalRef.current?.showModal();
  }, []);

  return (
    <dialog className="modal" ref={modalRef} onClose={closeModal}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action justify-start">
          <form method="dialog" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className="input input-bordered w-full max-w-xs"
              step="1"
              type="number"
              value={budgetValue}
              name="budgetValue"
              onFocus={(event) => {
                event.target.select();
              }}
              onChange={(event) => {
                setBudgetValue(
                  event.target.value ? parseFloat(event.target.value) : 0
                );
              }}
            />

            <div className="flex gap-2 mt-4">
              <button className="btn btn-primary" type="submit">
                Update
              </button>

              <button className="btn" type="button" onClick={handleYearClick}>
                Update Entire Year
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
