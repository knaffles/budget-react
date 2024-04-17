import { FC } from "react";
import {
  ITransactionsEnvelopeRow,
  ITransactionsEnvelopeTotals,
} from "../models/TransactionsModel";
import styles from "./BudgetTable.module.css";
import FormattedData from "./FormattedData";

export interface IEnvelopeTable {
  data: ITransactionsEnvelopeRow[];
  totals: ITransactionsEnvelopeTotals;
  onCategoryClick: (category: string, ytd: boolean) => void;
}

export const EnvelopeTable: FC<IEnvelopeTable> = ({
  data,
  totals,
  onCategoryClick,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table table-xs ${styles["budget-table"]}`}>
        <caption className="text-left">Envelope Expenses</caption>
        <thead>
          <tr>
            <th>Category</th>
            <th>Annual Budget</th>
            <th>Actual YTD</th>
            <th>Remaining</th>
            <th>Overage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            {
              return (
                <tr key={item.category}>
                  <td>
                    <button
                      className="btn btn-xs btn-ghost"
                      onClick={() => onCategoryClick(item.category, true)}
                    >
                      {item.category}
                    </button>
                  </td>
                  <td>
                    <FormattedData data={item.budget} />
                  </td>
                  <td>
                    <FormattedData data={item.YTD} />
                  </td>
                  <td>
                    <FormattedData data={item.remaining} />
                  </td>
                  <td>
                    <FormattedData data={item.overage} />
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td>TOTAL</td>
            <td>
              <FormattedData data={totals.budget} />
            </td>
            <td>
              <FormattedData data={totals.YTD} />
            </td>
            <td>
              <FormattedData data={totals.remaining} />
            </td>
            <td>
              <FormattedData data={totals.overage} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
