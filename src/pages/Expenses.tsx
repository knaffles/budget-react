import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { EnvelopeTable } from "../components/EnvelopeTable";
import ExpensesModal from "../components/ExpensesModal";
import { NoBudgetTable } from "../components/NoBudgetTable";
import { OverUnderTable } from "../components/OverUnderTable";
import { TransactionsTable } from "../components/TransactionsTable";
import { months } from "../data/constants";
import useAppContext from "../hooks/useAppContext";
import TransactionsModel, {
  ITransactionsEnvelopeRow,
  ITransactionsEnvelopeTotals,
  ITransactionsModel,
  ITransactionsNoBudgetRow,
  ITransactionsOverUnder,
  ITransactionsRow,
  ITransactionsTotals,
} from "../models/TransactionsModel";
import { db } from "../services/firebase";
import { ITransaction } from "../types/Transaction";

// TODO: Verify envelope categories are displaying correctly (positive vs. negative).

const Expenses = () => {
  const {
    user,
    year,
    loadingBudget,
    loadingCategories,
    budgetModel,
    categoryModel,
  } = useAppContext();
  const [loadingTransactions, setLoadingTransactions] = useState<boolean>(true);
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [model, setModel] = useState({} as ITransactionsModel);
  const [modalData, setModalData] = useState<{
    sortedResult: ITransaction[];
    total: number;
  }>({
    sortedResult: [],
    total: 0,
  });

  const handleCategoryClick = (category: string) => {
    const categoryData = model.filterTo(category, month, year, false);
    setShowModal(true);
    setModalData(categoryData);
  };

  useEffect(() => {
    if (loadingCategories || loadingBudget) {
      return;
    }

    setLoadingTransactions(true);

    // Create the transactions model with empty data for now.
    const transactionsModel = new TransactionsModel(
      budgetModel,
      categoryModel,
      []
    );
    setModel(transactionsModel);

    const qBudget = query(
      collection(db, `user/${user}/transaction`),
      where("year", "==", year)
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
        setLoadingTransactions(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [
    budgetModel,
    categoryModel,
    loadingCategories,
    loadingBudget,
    year,
    user,
  ]);

  // Once the data has been fetched, process all the data.
  useEffect(() => {
    if (loadingTransactions) {
      return;
    }

    model.filterToMonth(month, year);
    setExpenses(model.finalExpenses);
    setIncome(model.finalIncome);
    setTotalExpenses(model.totalExpenses);
    setTotalIncome(model.totalIncome);
    setEnvelopeExpenses(model.finalEnvelope);
    setEnvelopeTotals(model.totalEnvelope);

    // Calculate over/under totals.
    model.calculateOverUnder();
    setOverUnder(model.overUnder);

    // Find transactions with no associated budget.
    model.getTransactionsWithNoBudget(month, year);
    setNoBudget(model.noBudget);
  }, [loadingTransactions, month, model, year]);

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
        onCategoryClick={handleCategoryClick}
      />
      <TransactionsTable
        data={income}
        totals={totalIncome}
        label="Income"
        onCategoryClick={handleCategoryClick}
      />
      <EnvelopeTable data={envelopeExpenses} totals={envelopeTotals} />
      <OverUnderTable data={overUnder} />
      <NoBudgetTable data={noBudget} />

      {showModal && (
        <ExpensesModal
          onClose={() => {
            setShowModal(false);
          }}
          data={modalData}
        />
      )}
    </>
  );
};

export default Expenses;
