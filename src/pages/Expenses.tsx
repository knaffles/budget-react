import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import TransactionsModel, {
  ITransactationsTotals,
  ITransactionsRow,
} from "../models/TransactionsModel";
import { db } from "../services/firebase";
import { ITransaction } from "../types/Transaction";
import { TransactionsTable } from "../components/TransactionsTable";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Expenses = () => {
  const appContext = useContext(AppContext);
  const [month, setMonth] = useState<number>(0);
  const [expenses, setExpenses] = useState<ITransactionsRow[]>([]);
  const [income, setIncome] = useState<ITransactionsRow[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(
    {} as ITransactationsTotals
  );
  const [totalIncome, setTotalIncome] = useState({} as ITransactationsTotals);

  useEffect(() => {
    if (!appContext || appContext?.loadingCategories) {
      return;
    }

    // Create the budget model with empty data for now.
    const transactionsModel = new TransactionsModel(
      appContext.budgetModel,
      appContext.categoryModel,

      []
    );

    const qBudget = query(
      collection(db, `user/${appContext?.user}/transaction`)
    );

    const unsubscribe = onSnapshot(
      qBudget,
      (querySnapshot) => {
        const transactionsResult = querySnapshot.docs.map((doc) => {
          const result = doc.data() as ITransaction;
          result.nodeId = doc.id;
          return result;
        });
        transactionsModel.rows = transactionsResult;

        transactionsModel.filterToMonth(month, 2024); // TODO: Hardcoded month and year.
        setExpenses(transactionsModel.finalExpenses);
        setIncome(transactionsModel.finalIncome);
        setTotalExpenses(transactionsModel.totalExpenses);
        setTotalIncome(transactionsModel.totalIncome);
      },
      (error) => {
        console.log(error);
      }
    );

    return unsubscribe;
  }, [appContext, month]);

  return (
    <>
      <h1>Expenses & Income</h1>

      <label className="flex items-center my-4">
        <div className="label">
          <span className="label-text">Select the month:</span>
        </div>
        <select
          className="select select-bordered select-sm"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            console.log(event.target.value);
            setMonth(parseInt(event.target.value));
          }}
          value={month}
        >
          {months.map((value, index) => {
            return (
              <option value={index} key={index}>
                {value}
              </option>
            );
          })}
        </select>
      </label>

      <TransactionsTable
        data={expenses}
        totals={totalExpenses}
        label="Expenses"
      />
      <TransactionsTable data={income} totals={totalIncome} label="Income" />
    </>
  );
};

export default Expenses;
