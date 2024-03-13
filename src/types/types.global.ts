import { ICategoryModel } from "../models/CategoryModel";
import { IBudgetModel, ITotals } from "../models/BudgetModel";
import { IBudgetRowEntry } from "../models/BudgetModel";

export type AppContextType = {
  year: number | null;
  setYear: (year: number) => void;
  user: string | null;
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
