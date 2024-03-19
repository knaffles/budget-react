import Modal from "./Modal";
import { FC, useState } from "react";

export interface IBudgetModal {
  onUpdate(value: number): void | Promise<void>;
  onClose(): void;
  initialValue: number;
  onYearUpdate(value: number): void;
}

const BudgetModal: FC<IBudgetModal> = ({
  onUpdate,
  onClose,
  initialValue,
  onYearUpdate,
  ...props
}) => {
  const [budgetValue, setBudgetValue] = useState<number>(initialValue);

  const handleSubmit = () => {
    onUpdate(budgetValue);
  };

  const handleYearClick = () => {
    onYearUpdate(budgetValue);
    onClose();
  };

  return (
    <Modal onClose={onClose} {...props}>
      <form method="dialog" onSubmit={handleSubmit}>
        <input
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

          <button className="btn" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BudgetModal;
