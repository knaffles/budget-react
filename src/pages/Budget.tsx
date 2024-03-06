// TODO: Move data fetching to a hook.
// TODO: Add additional error handling.

import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { BudgetTable, BudgetDiff } from "../components/BudgetTable";
import BudgetModel, { IBudgetRowEntry, ITotals } from "../models/BudgetModel";
import CategoryModel from "../models/CategoryModel";
import { db } from "../services/firebase";
import { IBudget } from "../types/Budget";
import { ICategory } from "../types/Category";

const Budget = () => {
  const appContext = useContext(AppContext);
  const [budgetExpenses, setBudgetExpenses] = useState<IBudgetRowEntry[]>([]);
  const [budgetIncome, setBudgetIncome] = useState<IBudgetRowEntry[]>([]);
  const [totalExpenses, setTotalExpenses] = useState({} as ITotals);
  const [totalIncome, setTotalIncome] = useState({} as ITotals);
  const [budgetDiff, setBudgetDiff] = useState({} as ITotals);
  const [categoryModel, setCategoryModel] = useState({} as CategoryModel);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Get Categories.
  useEffect(() => {
    const fetchData = async () => {
      setLoadingCategories(true);
      const qCategories = query(
        collection(db, `user/${appContext?.user}/category`)
      );
      const querySnapshotCategories = await getDocs(qCategories);
      const categoriesResult = querySnapshotCategories.docs.map((doc) => {
        const result = doc.data() as ICategory;
        result.nodeId = doc.id;
        return result;
      });

      // TODO: Fix default value of appcontext?,year
      const categoriesModel = new CategoryModel(categoriesResult);
      setCategoryModel(categoriesModel);
      setLoadingCategories(false);
    };

    fetchData();
  }, [appContext?.user]);

  useEffect(() => {
    if (loadingCategories) {
      return;
    }

    // Create the budget model with empty data for now.
    const budgetModel = new BudgetModel(
      categoryModel,
      [],
      appContext?.year ?? 0
    );

    const qBudget = query(
      collection(db, `user/${appContext?.user}/budget`),
      where("year", "==", appContext?.year)
    );

    const unsubscribe = onSnapshot(
      qBudget,
      (querySnapshot) => {
        const budgetResult = querySnapshot.docs.map((doc) => {
          const result = doc.data() as IBudget;
          result.nodeId = doc.id;
          return result;
        });
        budgetModel.rows = budgetResult; // TODO: Use a setter here?
        budgetModel.buildBudgetData();

        setBudgetExpenses(budgetModel.budgetExpenses);
        setBudgetIncome(budgetModel.budgetIncome);
        setTotalExpenses(budgetModel.totalExpenses);
        setTotalIncome(budgetModel.totalIncome);
        setBudgetDiff(budgetModel.budgetDiff);
      },
      (error) => {
        console.log(error);
      }
    );

    return unsubscribe;
  }, [appContext?.user, appContext?.year, categoryModel, loadingCategories]);

  return (
    <>
      <h1>Budget</h1>

      {budgetExpenses.length > 0 && (
        <BudgetTable
          label="Expenses"
          data={budgetExpenses}
          totals={totalExpenses}
          firstColLabel="Category"
        />
      )}

      {budgetIncome.length > 0 && (
        <BudgetTable
          label="Income"
          data={budgetIncome}
          totals={totalIncome}
          firstColLabel="Category"
        />
      )}

      {/* TODO: Fix this conditional. Should be checking to see if budgetDiff is populated. */}
      {budgetExpenses.length && budgetIncome.length && (
        <BudgetDiff label="Income - Expenses" data={budgetDiff} />
      )}
    </>
  );
};

export default Budget;
