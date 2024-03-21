import { FC } from "react";
import styles from "./BudgetTable.module.css";
import { ITransactionsOverUnder } from "../models/TransactionsModel";
import FormattedData from "./FormattedData";

export interface IOverUnderTable {
  data: ITransactionsOverUnder;
}

export const OverUnderTable: FC<IOverUnderTable> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table table-xs ${styles["budget-table"]}`}>
        <caption className="text-left">Over/Under</caption>

        <tbody>
          <tr>
            <th>Over/under this month</th>
            <td>
              <FormattedData data={data.month} />
            </td>
          </tr>
          <tr>
            <th>Over/under YTD</th>
            <td>
              <FormattedData data={data.ytd} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
