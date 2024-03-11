import { FC } from "react";
import { roundTwoDigits } from "../models/utils";
import styles from "./BudgetTable.module.css";
import {
  ITransactionsEnvelopeRow,
  ITransactionsEnvelopeTotals,
} from "../models/TransactionsModel";

export interface IEnvelopeTable {
  data: ITransactionsEnvelopeRow[];
  totals: ITransactionsEnvelopeTotals;
}

const FormattedData = ({ data }: { data: number }) => {
  return (
    <>
      {data < 0 && (
        <span className={styles.negative}>{roundTwoDigits(data)}</span>
      )}
      {data >= 0 && <span>{roundTwoDigits(data)}</span>}
    </>
  );
};

export const EnvelopeTable: FC<IEnvelopeTable> = ({ data, totals }) => {
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
                  {/* <td>{buildCategoryLink(item.category, 1, 2024)}</td> */}
                  <td>{item.category}</td>
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