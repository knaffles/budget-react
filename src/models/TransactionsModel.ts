import { parseDate } from "./utils";
import { ICategoryModel } from "./CategoryModel";
import { ITransaction } from "../types/Transaction";
import { sort } from "./utils";
import { IBudgetModel } from "./BudgetModel";

export interface ITransactionsModel {
  budgetModel: IBudgetModel;
  categoryModel: ICategoryModel;
  rows: ITransaction[];
  cleanData(): void;
  getUniqueCategories(month: number, year: number): void;
  getTransactionsInMonthYear(
    category: string,
    month: number,
    year: number
  ): void;
  getTransactionsYTD(category: string, month: number, year: number): void;
  getSum(dataSet: any): void;
  filterToMonth(filters: any): void;
}

class TransactionsModel implements ITransactionsModel {
  budgetModel: IBudgetModel;
  categoryModel: ICategoryModel;
  rows: ITransaction[];

  constructor(
    budgetModel: IBudgetModel,
    categoryModel: ICategoryModel,
    rows: ITransaction[]
  ) {
    this.budgetModel = budgetModel;
    this.categoryModel = categoryModel;
    this.rows = rows;
  }

  // Remove commas and convert amounts to floats.
  cleanData() {
    for (let i = 0; i < this.rows.length; i++) {
      // We are assuming that .Amount comes in as a float.
      // this.rows[i].Amount = this.rows[i].Amount.replace(/,/g, ''); // Remove commas.
      // this.rows[i].amount = parseFloat(this.rows[i].amount);
      // TODO: Remove the dollar sign at the start:
    }
  }

  // Get all the categories associated with all transactions in a given year.
  getUniqueCategories(month: number, year: number) {
    // Reduce the transactions and sum the total for each category.

    const result = this.rows.reduce(function (
      allCategories: string[],
      transaction
    ) {
      const parsedDate = parseDate(transaction.postedOn),
        thisMonth = parsedDate.month,
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
    const dataSet = this.rows.filter(function (transaction) {
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
    const dataSet = [];

    for (let i = 1; i <= month; i++) {
      dataSet = dataSet.concat(
        this.getTransactionsInMonthYear(category, i, year)
      );
    }

    return dataSet;
  }

  // TODO: Update so that the model doesn't need to have all data from all years at all times.
  filterToMonth(
    filters = [
      { id: "budget__month", val: "1" },
      { id: "budget__year", val: "2024" },
    ]
  ) {
    let budgetMonth = 0,
      budgetYear = 0,
      finalExpenses = [],
      finalIncome = [],
      finalNoBudget = [], // All categories which are not budgeted.
      finalEnvelope = []; // Envelope budgets.

    for (const key in filters) {
      if (filters[key].id == "budget__month") {
        budgetMonth = parseInt(filters[key].val);
      }
      if (filters[key].id == "budget__year") {
        budgetYear = parseInt(filters[key].val);
      }
    }

    // Get the list of all categories for this budget year.
    const categories = this.budgetModel.getCategoryList(budgetYear);

    // For each category in the budget:
    for (let i = 0; i < categories.length; i++) {
      const theCategory = categories[i];

      // Get the budget for this month/year
      const catBudget = this.budgetModel.getCategory(
        theCategory,
        budgetMonth,
        budgetYear
      );

      // Get the sum of all the transactions in this month/year
      const catActual = this.getTransactionsInMonthYear(
        theCategory,
        budgetMonth,
        budgetYear
      );
      let catActualAmount = this.getSum(catActual);

      // Get YTD budget up to this month/year
      const catBudgetYTD = this.budgetModel.getCategoryYTD(
        theCategory,
        budgetMonth,
        budgetYear
      );

      // Get the YTD transactions in this month/year
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
      const catDiff = catBudget - catActualAmount;
      const catDiffYTD = catBudgetYTD - catActualYTDAmount;

      if (catType == "Income") {
        // Add this data to finalIncome
        finalIncome.push({
          fullCategory: theFullCategory,
          category: theCategory,
          sum: catActualAmount,
          budget: catBudget,
          difference: -1 * catDiff,
          YTD: catActualYTDAmount,
          budgetYTD: catBudgetYTD,
          differenceYTD: -1 * catDiffYTD,
        });
      } else if (catType == "Expense") {
        // Add this data to finalExpenses
        finalExpenses.push({
          fullCategory: theFullCategory,
          category: theCategory,
          sum: catActualAmount,
          budget: catBudget,
          difference: catDiff,
          YTD: catActualYTDAmount,
          budgetYTD: catBudgetYTD,
          differenceYTD: catDiffYTD,
        });
      } else {
        // TODO - the category has no type
      }
    }

    // Get all the categories associated with transactions in this budget year.
    const allCategories = this.getUniqueCategories(budgetMonth, budgetYear);

    // Loop through all those categories and test to see if they have an entry in finalExpenses.
    for (let i = 0; i < allCategories.length; i++) {
      // Is this an expense or income category.
      const categoryType = this.categoryModel.getType(allCategories[i]);
      let thisCategory;

      if (categoryType == "Income") {
        thisCategory = finalIncome.findIndex(function (element) {
          return element.category === allCategories[i];
        });
      } else {
        thisCategory = finalExpenses.findIndex(function (element) {
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
            parentIndex = finalIncome.findIndex(function (element) {
              return element.category === catParent;
            });
          } else {
            parentIndex = finalExpenses.findIndex(function (element) {
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

    // Sort and then render.
    finalExpenses = sort(finalExpenses, "fullCategory");
    finalIncome = sort(finalIncome, "fullCategory");
    finalEnvelope = sort(finalEnvelope, "fullCategory");

    // this.renderBudgetTable(finalExpenses, budgetMonth, budgetYear, "expenses");
    // this.renderBudgetTable(finalIncome, budgetMonth, budgetYear, "income");
    // this.renderEnvelopeTable(finalEnvelope, budgetMonth, budgetYear);
    // this.renderNoBudgetTable(finalNoBudget, budgetMonth, budgetYear);

    // // Calculate income vs expense
    // // TODO come up with a better way to get these values
    // var expensesDiff = parseFloat(
    //   $("#expenses .totals td:nth-child(4)").text()
    // );
    // var incomeDiff = parseFloat($("#income .totals td:nth-child(4)").text());
    // var totalDiff = incomeDiff + expensesDiff;

    // var expensesDiffYTD = parseFloat(
    //   $("#expenses .totals td:nth-child(7)").text()
    // );
    // var incomeDiffYTD = parseFloat($("#income .totals td:nth-child(7)").text());
    // var totalOverage = parseFloat($("#envelope .totals td:last-child").text());
    // var totalDiffYTD = incomeDiffYTD + expensesDiffYTD + totalOverage;

    // // Clear the over-under table.
    // $('#over-under tbody').html('');

    // // Append the over-under total for this month.
    // var row = $('<tr class="totals"></tr>');
    // row.append('<td>Over/under this month</td>');
    // row.append('<td>' + formatData(totalDiff) + '</td>');
    // row.appendTo('#over-under tbody');

    // // Append the over-under total YTD.
    // row = $('<tr class="totals"></tr>');
    // row.append('<td>Over/under year-to-date</td>');
    // row.append('<td>' + formatData(totalDiffYTD) + '</td>');
    // row.appendTo('#over-under tbody');
  }

  // Get the sum of all Amount in a series of transactions.
  // TODO: Technically, doesn't need to be a method on this object.
  getSum(dataSet: any) {
    let sum = 0;

    $(dataSet).each(function (key, val) {
      const catType = this.categoryModel.getType(val["Category"]);

      if (val["Transaction Type"] == "debit") {
        if (catType == "Expense") {
          sum += val.Amount;
        } else if (catType == "Income") {
          sum -= val.Amount;
        }
      } else {
        if (catType == "Expense") {
          sum -= val.Amount;
        } else if (catType == "Income") {
          sum += val.Amount;
        }
      }
    });

    return sum;
  }
}

export default TransactionsModel;
