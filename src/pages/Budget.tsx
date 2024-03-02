import { DocumentData, collection, getDocs, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import BudgetModel from "../models/BudgetModel";
import CategoryModel from "../models/CategoryModel";
import { db } from "../services/firebase";

const Budget = () => {
  const appContext = useContext(AppContext);
  const [budget, setBudget] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const qBudget = query(collection(db, `user/${appContext?.user}/budget`));
      const querySnapshotBudget = await getDocs(qBudget);
      const budgetResult = querySnapshotBudget.docs.map((doc) => {
        const result = doc.data();
        result.nodeId = doc.id;
        return result;
      });

      const qCategories = query(
        collection(db, `user/${appContext?.user}/category`)
      );
      const querySnapshotCategories = await getDocs(qCategories);
      const categoriesResult = querySnapshotCategories.docs.map((doc) => {
        const result = doc.data();
        result.nodeId = doc.id;
        return result;
      });

      const categoriesModel = new (CategoryModel as any)(categoriesResult);
      const budgetModel = new (BudgetModel as any)(
        categoriesModel,
        budgetResult,
        appContext?.year
      );
      console.log(budgetModel);
      budgetModel.buildBudgetData();
      console.log(budgetModel);
      setBudget(budgetModel.budgetExpenses);
    };

    fetchData();
  }, [appContext?.user, appContext?.year]);

  return (
    <>
      <h1>Budget</h1>
      <p>This is the Budget page.</p>
      {JSON.stringify(budget)}
    </>
  );
};

export default Budget;
