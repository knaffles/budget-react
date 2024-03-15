import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { AppContext } from "./hooks/useAppContext";
import BudgetModel, { IBudgetModel } from "./models/BudgetModel";
import CategoryModel, { ICategoryModel } from "./models/CategoryModel";
import Budget from "./pages/Budget";
import Expenses from "./pages/Expenses";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Upload from "./pages/Upload";
import { db } from "./services/firebase";
import { IBudget } from "./types/Budget";
import { ICategory } from "./types/Category";
import { AppContextType } from "./types/types.global";

function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [theme, setTheme] = useState<string>("light");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBudget, setLoadingBudget] = useState(true);
  const [categoryModel, setCategoryModel] = useState({} as ICategoryModel);
  const [budgetModel, setBudgetModel] = useState({} as IBudgetModel);
  const [budgetData, setBudgetData] = useState<AppContextType["budgetData"]>(
    {} as AppContextType["budgetData"]
  );
  const user = "user1";

  // Get Categories.
  useEffect(() => {
    const fetchData = async () => {
      setLoadingCategories(true);
      const qCategories = query(collection(db, `user/${user}/category`));
      const querySnapshotCategories = await getDocs(qCategories);
      const categoriesResult = querySnapshotCategories.docs.map((doc) => {
        const result = doc.data() as ICategory;
        result.nodeId = doc.id;
        return result;
      });

      const categoriesModel = new CategoryModel(categoriesResult);
      setCategoryModel(categoriesModel);
      setLoadingCategories(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loadingCategories) {
      return;
    }

    // Create the budget model with empty data for now.
    const budgetsModel = new BudgetModel(categoryModel, [], year);
    setBudgetModel(budgetsModel);

    const qBudget = query(collection(db, `user/${user}/budget`));

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

    return unsubscribe;
  }, [user, year, loadingCategories, categoryModel]);

  return (
    <AppContext.Provider
      value={{
        year,
        setYear,
        user,
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
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              {/* TODO: Add some additional context so that budget and category data are not passed to the upload page. */}
              <Route path="budget" element={<Budget />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="upload" element={<Upload />} />

              {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
