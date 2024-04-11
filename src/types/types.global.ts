import { User as FirebaseUser } from "firebase/auth";
import { SetStateAction } from "react";
import { IBudgetModel, IBudgetRowEntry, ITotals } from "../models/BudgetModel";
import { ICategoryModel } from "../models/CategoryModel";

export type AppContextType = {
  year: number;
  setYear: (year: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
  categoryModel: ICategoryModel;
  budgetModel: IBudgetModel;
  loadingCategories: boolean;
  loadingBudget: boolean;
  budgetData: {
    budgetExpenses: IBudgetRowEntry[];
    budgetIncome: IBudgetRowEntry[];
    totalExpenses: ITotals;
    totalIncome: ITotals;
    budgetDiff: ITotals;
  };
};

// TODO: Fix <any> below.
// See https://stackoverflow.com/questions/59432133/how-to-type-state-and-dispatch-for-usereducer-typescript-and-react
export type AuthContextType = {
  authIsReady: boolean;
  user: FirebaseUser | null;
  //eslint-disable-next-line
  dispatch: React.Dispatch<SetStateAction<any>>;
};
