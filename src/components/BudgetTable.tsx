import { FC } from "react";
import { IBudgetRowEntry, ITotals } from "../models/BudgetModel";
import { IBudget } from "../types/Budget";
import styles from "./BudgetTable.module.css";
import FormattedData from "./FormattedData";

export interface IBudgetTable {
  label: string;
  data: IBudgetRowEntry[];
  totals: ITotals;
  firstColLabel?: string;
  onCellClick(
    nodeId: IBudget["nodeId"],
    initialValue: number,
    month: number
  ): void;
  onDelete(nodeId: IBudget["nodeId"]): void;
}

export interface IBudgetDiff {
  label: string;
  data: ITotals;
}

const monthsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const BudgetTable: FC<IBudgetTable> = ({
  label,
  data,
  totals,
  firstColLabel = "",
  onCellClick,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table table-xs ${styles["budget-table"]}`}>
        <caption className="text-left">{label}</caption>
        <thead>
          <tr>
            <th>{firstColLabel}</th>
            {/* TODO - Add lookkup for envelope value. */}
            {/* <th>Envelope</th> */}
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
                  <td>
                    <div className="flex items-center justify-between group/cat">
                      {category.displayCategory}
                      <button
                        className="btn btn-neutral btn-xs opacity-0 group-hover/cat:opacity-100"
                        onClick={() => onDelete(category.nodeId)}
                      >
                        (delete)
                      </button>
                    </div>
                  </td>
                  {monthsArray.map((month) => (
                    <td key={month}>
                      <button
                        onClick={() => {
                          onCellClick(
                            category.nodeId,
                            category.amount[month],
                            month
                          );
                        }}
                      >
                        <FormattedData data={category.amount[month]} />
                      </button>
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
                <FormattedData data={totals.amount[month]} />
              </td>
            ))}
            <td>
              <FormattedData data={totals.total} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export const BudgetDiff: FC<IBudgetDiff> = ({ label, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table table-xs ${styles["budget-table"]}`}>
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
                <FormattedData data={data.amount[month]} />
              </td>
            ))}
            <td>
              <FormattedData data={data.total} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
