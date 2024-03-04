import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import BudgetModel from "../models/BudgetModel";
import CategoryModel from "../models/CategoryModel";
import { db } from "../services/firebase";
import { ICategory } from "../types/Category";
import { IBudget } from "../types/Budget";
import { IBudgetRowEntry } from "../models/BudgetModel";

const Budget = () => {
  const appContext = useContext(AppContext);
  const [budget, setBudget] = useState<IBudgetRowEntry[]>([]);
  const [model, setModel] = useState({} as BudgetModel);

  useEffect(() => {
    const fetchData = async () => {
      const qBudget = query(
        collection(db, `user/${appContext?.user}/budget`),
        where("year", "==", appContext?.year)
      );
      const querySnapshotBudget = await getDocs(qBudget);
      const budgetResult = querySnapshotBudget.docs.map((doc) => {
        const result = doc.data() as IBudget;
        result.nodeId = doc.id;
        return result;
      });

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
      const budgetModel = new BudgetModel(
        categoriesModel,
        budgetResult,
        appContext?.year ?? 0
      );
      budgetModel.buildBudgetData();
      setBudget(budgetModel.budgetExpenses);
      setModel(budgetModel);
    };

    fetchData();
  }, [appContext?.user, appContext?.year]);

  return (
    <>
      <h1>Budget</h1>
      <p>This is the Budget page.</p>
      <p>Budget Rows: {model.rows?.length}</p>
      {JSON.stringify(budget)}
    </>
  );
};

export default Budget;
