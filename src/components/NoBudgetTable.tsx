import { FC } from "react";
import { ITransactionsNoBudgetRow } from "../models/TransactionsModel";
import styles from "./BudgetTable.module.css";
import FormattedData from "./FormattedData";

export interface INoBudgetTable {
  data: ITransactionsNoBudgetRow[];
}

export const NoBudgetTable: FC<INoBudgetTable> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table table-xs ${styles["budget-table"]}`}>
        <caption className="text-left">Transactions with no budget</caption>
        <thead>
          <tr>
            <th>Category</th>
            <th>Actual</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            {
              return (
                <tr key={item.category}>
                  {/* <td>{buildCategoryLink(item.category, 1, 2024)}</td> */}
                  <td>{item.fullCategory}</td>
                  <td>
                    <FormattedData data={item.sum} />
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};
