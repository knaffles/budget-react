import { parseDate, sort } from "../lib/utils";
import { ITransaction } from "../types/Transaction";
import { IBudgetModel } from "./BudgetModel";
import { ICategoryModel } from "./CategoryModel";

export interface ITransactionsRow {
  fullCategory: string;
  category: string;
  actual: number;
  budget: number;
  difference: number;
  YTD: number;
  budgetYTD: number;
  differenceYTD: number;
}

export interface ITransactionsEnvelopeRow {
  fullCategory: string;
  category: string;
  YTD: number;
  budget: number;
  remaining: number;
  overage: number;
}

export interface ITransactionsTotals {
  budget: number;
  actual: number;
  difference: number;
  YTD: number;
  budgetYTD: number;
  differenceYTD: number;
}

export interface ITransactionsEnvelopeTotals {
  budget: number;
  YTD: number;
  remaining: number;
  overage: number;
}

export interface ITransactionsOverUnder {
  month: number;
  ytd: number;
}

export interface ITransactionsNoBudgetRow {
  fullCategory: string;
  category: string;
  sum: number;
}

export interface ITransactionsModel {
  budgetModel: IBudgetModel;
  categoryModel: ICategoryModel;
  rows: ITransaction[];
  finalExpenses: ITransactionsRow[];
  finalIncome: ITransactionsRow[];
  finalEnvelope: ITransactionsEnvelopeRow[];
  totalExpenses: ITransactionsTotals;
  totalEnvelope: ITransactionsEnvelopeTotals;
  totalIncome: ITransactionsTotals;
  overUnder: ITransactionsOverUnder;
  noBudget: ITransactionsNoBudgetRow[];
  calculateOverUnder(): void;
  getUniqueCategories(month: number, year: number): void;
  getTransactionsInMonthYear(
    category: string,
    month: number,
    year: number
  ): void;
  getTransactionsYTD(category: string, month: number, year: number): void;
  getSum(dataSet: ITransaction[]): void;
  filterTo(
    category: string,
    month: number,
    year: number,
    ytd: boolean
  ): { sortedResult: ITransaction[]; total: number };
  filterToMonth(budgetMonth: number, budgetYear: number): void;
}

class TransactionsModel implements ITransactionsModel {
  budgetModel: IBudgetModel;
  categoryModel: ICategoryModel;
  rows: ITransaction[];
  finalExpenses: ITransactionsRow[];
  finalIncome: ITransactionsRow[];
  finalEnvelope: ITransactionsEnvelopeRow[];
  totalExpenses: ITransactionsTotals;
  totalIncome: ITransactionsTotals;
  totalEnvelope: ITransactionsEnvelopeTotals;
  overUnder: ITransactionsOverUnder;
  noBudget: ITransactionsNoBudgetRow[];

  constructor(
    budgetModel: IBudgetModel,
    categoryModel: ICategoryModel,
    rows: ITransaction[]
  ) {
    this.budgetModel = budgetModel;
    this.categoryModel = categoryModel;
    this.rows = rows;
    this.finalExpenses = [];
    this.finalIncome = [];
    this.finalEnvelope = [];
    this.totalExpenses = {} as ITransactionsTotals;
    this.totalIncome = {} as ITransactionsTotals;
    this.totalEnvelope = {} as ITransactionsEnvelopeTotals;
    this.overUnder = {} as ITransactionsOverUnder;
    this.noBudget = [];
  }

  // Get all the categories associated with all transactions in a given month and year.
  getUniqueCategories(month: number, year: number) {
    // Reduce the transactions and sum the total for each category.

    const result = this.rows.reduce(function (
      allCategories: string[],
      transaction
    ) {
      const parsedDate = parseDate(transaction.postedOn),
        thisMonth = parsedDate.month - 1,
        thisYear = parsedDate.year;

      if (allCategories.indexOf(transaction.category) > -1) {
        return allCategories;
      } else {
        if (thisYear === year && thisMonth === month) {
          allCategories.push(transaction.category);
        }

        return allCategories;
      }
    },
    []);

    return result;
  }

  getTransactionsInMonthYear(category: string, month: number, year: number) {
    const dataSet = this.rows.filter((transaction) => {
      const transactionDate = new Date(Date.parse(transaction.postedOn));
      const thisMonth = transactionDate.getMonth(),
        thisYear = transactionDate.getFullYear();

      let categoryFamily = [category];

      if (thisYear != year || thisMonth != month) {
        return false;
      }

      // Is the category a parent (top-level)?
      // If so, get all of its children, and when testing the categories below,
      // check to see if the transaction.Category equals the parent or any of its children.
      // If not, just proceed as normal.
      const parent = this.categoryModel.getParent(category);
      if (parent) {
        // Do nothing
      } else {
        // The category is itself a parent.
        const children = this.categoryModel.getChildren(category);
        categoryFamily = categoryFamily.concat(children);
      }

      if (categoryFamily.indexOf(transaction.category) > -1) {
        return true;
      }
    });

    return dataSet;
  }

  getTransactionsYTD(category: string, month: number, year: number) {
    let dataSet: ITransaction[] = [];

    for (let i = 0; i <= month; i++) {
      dataSet = dataSet.concat(
        this.getTransactionsInMonthYear(category, i, year)
      );
    }

    return dataSet;
  }

  // TODO: Update so that the model doesn't need to have all data from all years at all times.
  filterToMonth(budgetMonth: number, budgetYear: number) {
    const finalExpenses = [],
      finalIncome = [],
      finalEnvelope = []; // All categories which are not budgeted.

    // Get all the categories in the budget for the selected year.
    const categories = this.budgetModel.getCategoryList(budgetYear);

    // For each category in the budget:
    for (let i = 0; i < categories.length; i++) {
      const theCategory = categories[i];

      // Get the budget for this category/month/year.
      const catBudget = this.budgetModel.getCategory(
        theCategory,
        budgetMonth,
        budgetYear
      );

      // Get the sum of all the transactions in this category/month/year.
      const catActual = this.getTransactionsInMonthYear(
        theCategory,
        budgetMonth,
        budgetYear
      );
      let catActualAmount = this.getSum(catActual);

      // Get YTD budget for this category/month/year.
      const catBudgetYTD = this.budgetModel.getCategoryYTD(
        theCategory,
        budgetMonth,
        budgetYear
      );

      // Get the YTD transactions for this category/month/year.
      const catActualYTD = this.getTransactionsYTD(
        theCategory,
        budgetMonth,
        budgetYear
      );
      let catActualYTDAmount = this.getSum(catActualYTD);

      // Is this Income or Expense?
      const catType = this.categoryModel.getType(theCategory);

      // Get the parent category.
      let catParent = this.categoryModel.getParent(theCategory);
      catParent = !catParent ? theCategory : catParent;

      let theFullCategory = catParent + ": " + theCategory;

      // If this is an envelope budget, do some further processing.
      const catEnvelope = this.categoryModel.isEnvelope(theCategory);
      if (catEnvelope) {
        // Calculate the entire year budget
        const envBudget = this.budgetModel.getCategoryYTD(
          theCategory,
          12,
          budgetYear
        );

        // Calculate the amount spend YTD
        const envActualYTD = catActualYTDAmount;

        // Calculat amount of envelope budget remaining.
        const envRemaining = envBudget - envActualYTD;

        // Calculate any overage
        let envOverage = 0;
        if (envActualYTD > envBudget) {
          envOverage = envBudget - envActualYTD;
        }

        // Reset actual and budget amounts for the Expenses table.
        catActualAmount = catBudget;
        catActualYTDAmount = catBudgetYTD;
        theFullCategory += " (E)";

        // Push to the Envelope table.
        finalEnvelope.push({
          fullCategory: theFullCategory,
          category: theCategory,
          YTD: envActualYTD,
          budget: envBudget,
          remaining: envRemaining,
          overage: envOverage,
        });
      }

      // Calculate differences
      const catDiff = catBudget - -1 * catActualAmount;
      const catDiffYTD = catBudgetYTD - -1 * catActualYTDAmount;

      if (catType == "Income") {
        // Add this data to finalIncome
        finalIncome.push({
          fullCategory: theFullCategory,
          category: theCategory,
          actual: -1 * catActualAmount,
          budget: catBudget,
          difference: -1 * catDiff,
          YTD: -1 * catActualYTDAmount,
          budgetYTD: catBudgetYTD,
          differenceYTD: -1 * catDiffYTD,
        });
      } else if (catType == "Expense") {
        // Add this data to finalExpenses
        finalExpenses.push({
          fullCategory: theFullCategory,
          category: theCategory,
          actual: -1 * catActualAmount,
          budget: catBudget,
          difference: catDiff,
          YTD: -1 * catActualYTDAmount,
          budgetYTD: catBudgetYTD,
          differenceYTD: catDiffYTD,
        });
      } else {
        // TODO - the category has no type
      }
    }

    // Sort and then render.
    this.finalExpenses = sort(finalExpenses, "fullCategory");
    this.finalIncome = sort(finalIncome, "fullCategory");
    this.finalEnvelope = sort(finalEnvelope, "fullCategory");
    this.totalExpenses = this.calculateTotals(finalExpenses);
    this.totalIncome = this.calculateTotals(finalIncome);
    this.totalEnvelope = this.calculateEnvelopeTotals(finalEnvelope);
  }

  // Get all transactions in a given category/month/year. This is for the expenses category modal.
  filterTo(
    category: string,
    month: number,
    year: number,
    ytd: boolean = false
  ) {
    let result: ITransaction[] = [];

    if (ytd) {
      result = this.getTransactionsYTD(category, month, year);
    } else {
      result = this.getTransactionsInMonthYear(category, month, year);
    }

    const sortedResult = sort(result, "postedOn");
    const total = this.getSum(sortedResult);

    return { sortedResult, total };
  }

  // Get all transactions with no associated budget.
  getTransactionsWithNoBudget(budgetMonth: number, budgetYear: number) {
    const finalNoBudget: ITransactionsNoBudgetRow[] = [];

    // Get all the categories associated with transactions in this budget year.
    const allCategories = this.getUniqueCategories(budgetMonth, budgetYear);

    // Loop through all those categories and test to see if they have an entry in finalExpenses.
    for (let i = 0; i < allCategories.length; i++) {
      // Is this an expense or income category.
      const categoryType = this.categoryModel.getType(allCategories[i]);
      let thisCategory;

      if (categoryType == "Income") {
        thisCategory = this.finalIncome.findIndex(function (element) {
          return element.category === allCategories[i];
        });
      } else {
        thisCategory = this.finalExpenses.findIndex(function (element) {
          return element.category === allCategories[i];
        });
      }

      if (thisCategory < 0) {
        // Check to see if each one has a parent category that is in the budget
        // If so, add to the parent category
        // Find the category's parent
        const catParent = this.categoryModel.getParent(allCategories[i]);
        const catActual = this.getTransactionsInMonthYear(
          allCategories[i],
          budgetMonth,
          budgetYear
        );
        const catActualAmount = this.getSum(catActual);

        if (catParent) {
          let parentIndex;

          if (categoryType == "Income") {
            parentIndex = this.finalIncome.findIndex(function (element) {
              return element.category === catParent;
            });
          } else {
            parentIndex = this.finalExpenses.findIndex(function (element) {
              return element.category === catParent;
            });
          }

          // If a record exists already for the parent, then do nothing
          if (parentIndex >= 0) {
            // Do nothing
          } else {
            // This is a category with a parent that is not in the budget.
            // Add it to the No Budget table
            finalNoBudget.push({
              fullCategory: catParent + ": " + allCategories[i],
              category: allCategories[i],
              sum: catActualAmount,
            });
          }
        } else {
          // This is a category with no parent that is not in the budget.
          // Put it in the "No Budget" table.
          finalNoBudget.push({
            fullCategory: allCategories[i] + ": " + allCategories[i],
            category: allCategories[i],
            sum: catActualAmount,
          });
        }
      }
    }

    this.noBudget = finalNoBudget;
  }

  calculateOverUnder() {
    const expensesDiff = this.totalExpenses.difference;
    const incomeDiff = this.totalIncome.difference;
    const totalDiffMonth = incomeDiff + expensesDiff;

    const expensesDiffYTD = this.totalExpenses.differenceYTD;
    const incomeDiffYTD = this.totalIncome.differenceYTD;
    const totalOverage = this.totalEnvelope.overage;
    const totalDiffYTD = incomeDiffYTD + expensesDiffYTD + totalOverage;

    this.overUnder = { month: totalDiffMonth, ytd: totalDiffYTD };
  }

  // Get the sum of all Amount in a series of transactions.
  // TODO: Technically, doesn't need to be a method on this object.
  getSum(dataSet: ITransaction[]) {
    let sum = 0;

    dataSet.forEach((item) => {
      const catType = this.categoryModel.getType(item.category);

      if (catType == "Expense") {
        sum += item.amount;
      } else if (catType == "Income") {
        sum -= item.amount;
      }
    });

    return sum;
  }

  calculateTotals(dataSet: ITransactionsRow[]) {
    const total = {
      budget: 0,
      actual: 0,
      difference: 0,
      YTD: 0,
      budgetYTD: 0,
      differenceYTD: 0,
    };

    dataSet.forEach((item) => {
      total.budget += item.budget;
      total.actual += item.actual;
      total.difference += item.difference;
      total.YTD += item.YTD;
      total.budgetYTD += item.budgetYTD;
      total.differenceYTD += item.differenceYTD;
    });

    return total;
  }

  calculateEnvelopeTotals(dataSet: ITransactionsEnvelopeRow[]) {
    const total = {
      budget: 0,
      YTD: 0,
      remaining: 0,
      overage: 0,
    };

    dataSet.forEach((item) => {
      total.budget += item.budget;
      total.YTD += item.YTD;
      total.remaining += item.remaining;
      total.overage += item.overage;
    });

    return total;
  }
}

export default TransactionsModel;
