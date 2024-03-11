import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import TransactionsModel from "../models/TransactionsModel";
import { db } from "../services/firebase";
import { ITransaction } from "../types/Transaction";

const Expenses = () => {
  const appContext = useContext(AppContext);

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

    console.log(transactionsModel.rows.length);

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
        console.log(transactionsModel.rows);
      },
      (error) => {
        console.log(error);
      }
    );

    return unsubscribe;
  }, [
    appContext,
    appContext?.user, // TODO: All these possibly null values don't seem right.
    appContext?.year,
    appContext?.loadingCategories,
    appContext?.categoryModel,
    appContext?.loadingCategories,
  ]);

  return <h1>Expenses</h1>;
};

export default Expenses;
