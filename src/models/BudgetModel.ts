import { sort } from "./utils";
import { ICategoryModel } from "./CategoryModel";
import { IBudget } from "../types/Budget";

export interface IMonths {
  month1: number;
  month2: number;
  month3: number;
  month4: number;
  month5: number;
  month6: number;
  month7: number;
  month8: number;
  month9: number;
  month10: number;
  month11: number;
  month12: number;
}

export interface INodeIds {
  nodeId1: string;
  nodeId2: string;
  nodeId3: string;
  nodeId4: string;
  nodeId5: string;
  nodeId6: string;
  nodeId7: string;
  nodeId8: string;
  nodeId9: string;
  nodeId10: string;
  nodeId11: string;
  nodeId12: string;
}

export interface IBudgetRowEntry {
  category: string;
  nodeId: string;
  total: number;
  displayCategory: string;
  amount: number[];
}

export interface ITotals {
  amount: number[];
  total: number;
}

export interface IBudgetModel {
  categoryModel: ICategoryModel;
  rows: IBudget[];
  thisYear: number;
  budgetExpenses: IBudgetRowEntry[];
  budgetIncome: IBudgetRowEntry[];
  budgetDiff: ITotals;
  totalExpenses: ITotals;
  totalIncome: ITotals;
  buildBudgetData(): void;
  cleanData(): void;
  hasCategory(category: string, year: number): void;
  getCategoryList(year: number): void;
  getCategory(category: string, month: number, year: number): void;
  getCategoryYTD(category: string, month: number, year: number): void;
  getNodeId(category: string, month: number, year: number): void;
}

class BudgetModel implements IBudgetModel {
  categoryModel: ICategoryModel;
  rows: IBudget[];
  thisYear: number;
  budgetExpenses: IBudgetRowEntry[] = [];
  budgetIncome: IBudgetRowEntry[] = [];
  budgetDiff = {} as ITotals;
  totalExpenses = {} as ITotals;
  totalIncome = {} as ITotals;

  constructor(
    categoryModel: ICategoryModel,
    rows: IBudget[],
    thisYear: number
  ) {
    this.categoryModel = categoryModel;
    this.rows = rows;
    this.thisYear = thisYear;
  }

  buildBudgetData() {
    // Set everything to empty.
    this.budgetExpenses = [];
    this.budgetIncome = [];
    this.budgetDiff = { amount: [], total: 0 };
    this.totalExpenses = { amount: [], total: 0 };
    this.totalIncome = { amount: [], total: 0 };

    // TODO: Move this to an init function, probably.
    const categories = this.getCategoryList(this.thisYear);

    // Initialize totals
    for (let month = 0; month <= 11; month++) {
      this.totalExpenses.amount[month] = this.totalIncome.amount[month] = 0;
    }
    this.totalExpenses.total = this.totalIncome.total = 0;

    for (let i = 0; i < categories.length; i++) {
      const entry = {} as IBudgetRowEntry;

      // Income or expense?
      const catType = this.categoryModel.getType(categories[i]);

      entry.amount = [];
      entry.category = categories[i];
      entry.total = 0;
      entry.displayCategory = categories[i];
      const nodeId = this.getNodeId(categories[i], this.thisYear) ?? "";

      for (let month = 0; month <= 11; month++) {
        // Get the nodeId

        entry.amount[month] = this.getCategory(
          categories[i],
          month,
          this.thisYear
        );
        entry.total += entry.amount[month];
        entry.nodeId = nodeId;

        if (catType == "Income") {
          this.totalIncome.amount[month] += entry.amount[month];
        } else if (catType == "Expense") {
          this.totalExpenses.amount[month] += entry.amount[month];
        }
      }

      if (catType == "Income") {
        this.budgetIncome.push(entry);
      } else if (catType == "Expense") {
        this.budgetExpenses.push(entry);
      }
      console.log(catType);
    }

    // Calculate totals for entire year.
    for (let month = 0; month <= 11; month++) {
      this.totalExpenses.total += this.totalExpenses.amount[month];
      this.totalIncome.total += this.totalIncome.amount[month];
    }

    this.budgetExpenses = sort(this.budgetExpenses, "displayCategory");
    this.budgetIncome = sort(this.budgetIncome, "displayCategory");

    // Calculate Income - Expenses
    for (let month = 0; month <= 11; month++) {
      this.budgetDiff.amount[month] =
        this.totalIncome.amount[month] - this.totalExpenses.amount[month];
    }

    this.budgetDiff.total = this.totalIncome.total - this.totalExpenses.total;

    console.log("built budget model");
  }

  // Convert months and years to integers and then remove commas and convert amounts to floats.
  cleanData() {
    // TODO: Confirm we no longer need this method. Verify that all data is being imported in the correct type.
    // for (let i = 0; i < this.rows.length; i++) {
    //   this.rows[i].month = parseInt(this.rows[i].month);
    //   this.rows[i].year = parseInt(this.rows[i].year);
    //   this.rows[i].amount = this.rows[i].amount.replace(/,/g, ""); // Remove commas.
    //   this.rows[i].amount = parseFloat(this.rows[i].amount);
    // }
  }

  // Does the budget have any entries for this category?
  hasCategory(category: string, year: number) {
    const result = this.rows.filter(function (element) {
      return element.category === category && element.year === year;
    });

    return result.length;
  }

  // Get the list of all categories in the budget for a given year.
  getCategoryList(year: number) {
    const result = this.rows.reduce((allCategories: string[], element) => {
      if (allCategories.indexOf(element.category) > -1) {
        return allCategories;
      } else {
        if (element.year === year) {
          allCategories.push(element.category);
        }

        return allCategories;
      }
    }, []);

    return result;
  }

  // Get the budget amount for a category/month/year.
  getCategory(category: string, month: number, year: number) {
    const budgetAmount = this.rows.find(function (element) {
      return element.category === category && element.year === year;
    });

    if (budgetAmount) {
      return budgetAmount.amount[month];
    } else {
      return 0;
    }
  }

  // Get the YTD budget for a category/month/year
  getCategoryYTD(category: string, month: number, year: number) {
    const categoryBudget = this.rows.find(function (element) {
      return element.category === category && element.year === year;
    });

    if (!categoryBudget) return 0;

    const budgetYTD = categoryBudget.amount.reduce(function (
      sum,
      element,
      index
    ) {
      if (index <= month) {
        return sum + element;
      } else {
        return sum;
      }
    },
    0);

    return budgetYTD;
  }

  getNodeId(category: string, year: number) {
    const nodeId = this.rows.find(function (element) {
      return element.category === category && element.year === year;
    });

    if (nodeId) {
      return nodeId.nodeId;
    } else {
      return null;
    }
  }
}

export default BudgetModel;
