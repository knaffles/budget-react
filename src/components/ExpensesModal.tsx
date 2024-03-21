import Modal from "./Modal";
import { FC } from "react";
import FormattedData from "./FormattedData";
import { ITransaction } from "../types/Transaction";

export interface IExpensesModal {
  onClose(): void;
  data: {
    sortedResult: ITransaction[];
    total: number;
  };
}

const ExpensesModal: FC<IExpensesModal> = ({ onClose, data, ...props }) => {
  return (
    <Modal onClose={onClose} {...props}>
      <table className="table table-zebra table-xs">
        <thead>
          <tr>
            <th>Date</th>
            <th>Payee</th>
            <th>Notes</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.sortedResult.map((item) => {
            console.log(item);
            return (
              <tr>
                <td>{item.postedOn}</td>
                <td>{item.payee}</td>
                <td>{item.notes}</td>
                <td className="text-right">
                  <FormattedData data={item.amount} />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <span className="font-bold">TOTAL:</span>
            </td>
            <td colSpan={4} className="text-right">
              <FormattedData data={data.total} />
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-end mt-4">
        <tr>
          <td>
            <button className="btn btn-primary" type="button" onClick={onClose}>
              Close
            </button>
          </td>
        </tr>
      </div>
    </Modal>
  );
};

export default ExpensesModal;
