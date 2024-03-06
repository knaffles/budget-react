import { FC } from "react";
import { IBudgetRowEntry, ITotals } from "../models/BudgetModel";
import { IMonths } from "../models/BudgetModel";
import styles from "./BudgetTable.module.css";
import { roundTwoDigits } from "../models/utils";

export interface IBudgetTable {
  label: string;
  data: IBudgetRowEntry[];
  totals: ITotals;
  firstColLabel?: string;
}

export interface IBudgetDiff {
  label: string;
  data: ITotals;
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

export const BudgetTable: FC<IBudgetTable> = ({
  label,
  data,
  totals,
  firstColLabel = "",
}) => {
  const monthsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <table className={`table ${styles["budget-table"]}`}>
      <caption className="text-left">{label}</caption>
      <thead>
        <tr>
          <th>{firstColLabel}</th>
          <th>JAN</th>
          <th>FEB</th>
          <th>MAR</th>
          <th>APR</th>
          <th>MAY</th>
          <th>JUN</th>
          <th>JUL</th>
          <th>AUG</th>
          <th>SEP</th>
          <th>OCT</th>
          <th>NOV</th>
          <th>DEC</th>
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {data.map((category) => {
          {
            return (
              <tr key={category.category}>
                <td>{category.displayCategory}</td>
                {monthsArray.map((month) => (
                  <td key={month}>
                    <FormattedData
                      data={category[("month" + month) as keyof IMonths]}
                    />
                  </td>
                ))}
                <td>
                  <FormattedData data={category.total} />
                </td>
              </tr>
            );
          }
        })}
      </tbody>
      <tfoot>
        <tr className="font-bold">
          <td>TOTALS</td>
          {monthsArray.map((month) => (
            <td key={month}>
              <FormattedData
                data={totals[("month" + month) as keyof IMonths]}
              />
            </td>
          ))}
          <td>
            <FormattedData data={totals.total} />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export const BudgetDiff: FC<IBudgetDiff> = ({ label, data }) => {
  const monthsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <table className={`table ${styles["budget-table"]}`}>
      <caption className="text-left">{label}</caption>
      <thead>
        <tr>
          <th></th>
          <th>JAN</th>
          <th>FEB</th>
          <th>MAR</th>
          <th>APR</th>
          <th>MAY</th>
          <th>JUN</th>
          <th>JUL</th>
          <th>AUG</th>
          <th>SEP</th>
          <th>OCT</th>
          <th>NOV</th>
          <th>DEC</th>
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          {monthsArray.map((month) => (
            <td key={month}>
              <FormattedData data={data[("month" + month) as keyof IMonths]} />
            </td>
          ))}
          <td>
            <FormattedData data={data.total} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
