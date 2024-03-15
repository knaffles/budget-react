import { FC } from "react";
import {
  ITransactionsRow,
  ITransactionsTotals,
} from "../models/TransactionsModel";
import FormattedData from "./FormattedData";
import styles from "./TransactionsTable.module.css";

export interface ITransactionsTable {
  label: string;
  data: ITransactionsRow[];
  totals: ITransactionsTotals;
}

export const TransactionsTable: FC<ITransactionsTable> = ({
  label,
  data,
  totals,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table table-xs ${styles["transactions-table"]}`}>
        <caption className="text-left">{label}</caption>
        <thead>
          <tr>
            <th>Category</th>
            <th>Budget</th>
            <th>Actual</th>
            <th>Difference</th>
            <th>Budget YTD</th>
            <th>Actual YTD</th>
            <th>Difference YTD</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            {
              return (
                <tr key={item.category}>
                  {/* <td>{buildCategoryLink(item.category, 1, 2024)}</td> */}
                  <td>{item.category}</td>
                  <td>
                    <FormattedData data={item.budget} />{" "}
                  </td>
                  <td>
                    <FormattedData data={item.actual} />{" "}
                  </td>
                  <td>
                    <FormattedData data={item.difference} />{" "}
                  </td>
                  <td>
                    <FormattedData data={item.budgetYTD} />{" "}
                  </td>
                  <td>
                    <FormattedData data={item.YTD} />{" "}
                  </td>
                  <td>
                    <FormattedData data={item.differenceYTD} />{" "}
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
              <FormattedData data={totals.budget} />{" "}
            </td>
            <td>
              <FormattedData data={totals.actual} />{" "}
            </td>
            <td>
              <FormattedData data={totals.difference} />{" "}
            </td>
            <td>
              <FormattedData data={totals.budgetYTD} />{" "}
            </td>
            <td>
              <FormattedData data={totals.YTD} />{" "}
            </td>
            <td>
              <FormattedData data={totals.differenceYTD} />{" "}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
