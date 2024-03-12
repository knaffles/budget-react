import { FC } from "react";
import { roundTwoDigits } from "../models/utils";
import styles from "./BudgetTable.module.css";
import { ITransactionsNoBudgetRow } from "../models/TransactionsModel";

export interface INoBudgetTable {
  data: ITransactionsNoBudgetRow[];
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
