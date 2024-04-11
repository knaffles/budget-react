import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FC, ReactNode, useEffect, useState } from "react";
import "./App.css";
import AppContext from "./contexts/AppContext";
import useAuthContext from "./hooks/useAuthContext";
import BudgetModel, { IBudgetModel } from "./models/BudgetModel";
import CategoryModel, { ICategoryModel } from "./models/CategoryModel";
import { db } from "./services/firebase";
import { IBudget } from "./types/Budget";
import { ICategory } from "./types/Category";
import { AppContextType } from "./types/types.global";

interface IDataWrapper {
  children: ReactNode | null;
}

const DataWrapper: FC<IDataWrapper> = ({ children }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [theme, setTheme] = useState<string>("light");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBudget, setLoadingBudget] = useState(true);
  const [categoryModel, setCategoryModel] = useState({} as ICategoryModel);
  const [budgetModel, setBudgetModel] = useState({} as IBudgetModel);
  const [budgetData, setBudgetData] = useState<AppContextType["budgetData"]>(
    {} as AppContextType["budgetData"]
  );
  const { user } = useAuthContext();

  // TODO - Move all of this logic for fetching category and transaction data into a hook. This component needs to be much cleaner.
  {
    /* TODO: Add additional context so that budget and category data are not loaded on all routes. */
  }
  // Get Categories.
  useEffect(() => {
    if (!user) {
      return;
    }

    const qCategories = query(collection(db, `user/${user.uid}/category`));
    const unsubscribe = onSnapshot(qCategories, (querySnapshot) => {
      setLoadingCategories(true);
      const categoriesResult = querySnapshot.docs.map((doc) => {
        const result = doc.data() as ICategory;
        result.nodeId = doc.id;
        return result;
      });

      const categoriesModel = new CategoryModel(categoriesResult);
      setCategoryModel(categoriesModel);
      setLoadingCategories(false);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (loadingCategories || !user) {
      return;
    }

    console.log("loading budget");

    // Create the budget model with empty data for now.
    const budgetsModel = new BudgetModel(categoryModel, [], year);
    setBudgetModel(budgetsModel);

    const qBudget = query(
      collection(db, `user/${user.uid}/budget`),
      where("year", "==", year)
    );

    // TODO: the query for budget data does not need to be rerun because of a change in the categoryModel.
    const unsubscribe = onSnapshot(
      qBudget,
      (querySnapshot) => {
        setLoadingBudget(true);
        const budgetResult = querySnapshot.docs.map((doc) => {
          const result = doc.data() as IBudget;
          result.nodeId = doc.id;
          return result;
        });
        budgetsModel.rows = budgetResult; // TODO: Use a setter here?
        budgetsModel.buildBudgetData();
        setBudgetData({
          budgetExpenses: budgetsModel.budgetExpenses,
          budgetIncome: budgetsModel.budgetIncome,
          totalExpenses: budgetsModel.totalExpenses,
          totalIncome: budgetsModel.totalIncome,
          budgetDiff: budgetsModel.budgetDiff,
        });
        setLoadingBudget(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [user, year, loadingCategories, categoryModel]);

  return (
    <AppContext.Provider
      value={{
        year,
        setYear,
        theme,
        setTheme,
        budgetModel,
        categoryModel,
        loadingCategories,
        loadingBudget,
        budgetData,
      }}
    >
      <div
        data-theme={theme}
        className="p-4 flex flex-col w-full min-h-[100vh]"
      >
        <div className="w-full max-w-[90rem] mx-auto mr-auto grow">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default DataWrapper;
