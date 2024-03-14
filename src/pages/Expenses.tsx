import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { EnvelopeTable } from "../components/EnvelopeTable";
import { NoBudgetTable } from "../components/NoBudgetTable";
import { OverUnderTable } from "../components/OverUnderTable";
import { TransactionsTable } from "../components/TransactionsTable";
import { months } from "../data/constants";
import useAppContext from "../hooks/useAppContext";
import TransactionsModel, {
  ITransactionsEnvelopeRow,
  ITransactionsEnvelopeTotals,
  ITransactionsNoBudgetRow,
  ITransactionsOverUnder,
  ITransactionsRow,
  ITransactionsTotals,
} from "../models/TransactionsModel";
import { db } from "../services/firebase";
import { ITransaction } from "../types/Transaction";

const Expenses = () => {
  const {
    user,
    year,
    loadingBudget,
    loadingCategories,
    budgetModel,
    categoryModel,
  } = useAppContext();
  const [month, setMonth] = useState<number>(0);
  const [expenses, setExpenses] = useState<ITransactionsRow[]>([]);
  const [income, setIncome] = useState<ITransactionsRow[]>([]);
  const [totalExpenses, setTotalExpenses] = useState({} as ITransactionsTotals);
  const [totalIncome, setTotalIncome] = useState({} as ITransactionsTotals);
  const [envelopeExpenses, setEnvelopeExpenses] = useState<
    ITransactionsEnvelopeRow[]
  >([]);
  const [envelopeTotals, setEnvelopeTotals] = useState(
    {} as ITransactionsEnvelopeTotals
  );
  const [overUnder, setOverUnder] = useState({} as ITransactionsOverUnder);
  const [noBudget, setNoBudget] = useState<ITransactionsNoBudgetRow[]>([]);

  useEffect(() => {
    if (loadingCategories || loadingBudget) {
      return;
    }

    // Create the budget model with empty data for now.
    const transactionsModel = new TransactionsModel(
      budgetModel,
      categoryModel,

      []
    );

    const qBudget = query(collection(db, `user/${user}/transaction`));

    const unsubscribe = onSnapshot(
      qBudget,
      (querySnapshot) => {
        const transactionsResult = querySnapshot.docs.map((doc) => {
          const result = doc.data() as ITransaction;
          result.nodeId = doc.id;
          return result;
        });
        transactionsModel.rows = transactionsResult;

        transactionsModel.filterToMonth(month, year);
        setExpenses(transactionsModel.finalExpenses);
        setIncome(transactionsModel.finalIncome);
        setTotalExpenses(transactionsModel.totalExpenses);
        setTotalIncome(transactionsModel.totalIncome);
        setEnvelopeExpenses(transactionsModel.finalEnvelope);
        setEnvelopeTotals(transactionsModel.totalEnvelope);

        // Calculate over/under totals.
        transactionsModel.calculateOverUnder();
        setOverUnder(transactionsModel.overUnder);

        // Find transactions with no associated budget.
        transactionsModel.getTransactionsWithNoBudget(month, year);
        setNoBudget(transactionsModel.noBudget);
      },
      (error) => {
        console.log(error);
      }
    );

    return unsubscribe;
  }, [
    budgetModel,
    categoryModel,
    loadingCategories,
    loadingBudget,
    month,
    year,
    user,
  ]);

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
      <EnvelopeTable data={envelopeExpenses} totals={envelopeTotals} />
      <OverUnderTable data={overUnder} />
      <NoBudgetTable data={noBudget} />
    </>
  );
};

export default Expenses;
