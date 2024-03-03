import { sort } from "./utils";
import { ICategoryModel } from "./CategoryModel";

class BudgetModel {
  categoryModel: ICategoryModel;
  rows: any;
  thisYear: number;
  budgetExpenses = [];
  budgetIncome = [];
  budgetDiff = [];
  totalExpenses = {};
  totalIncome = {};

  constructor(categoryModel: ICategoryModel, rows: any, thisYear: number) {
    this.categoryModel = categoryModel;
    this.rows = rows;
    this.thisYear = thisYear;
  }

  buildBudgetData() {
    // Set everything to empty.
    this.budgetExpenses = [];
    this.budgetIncome = [];
    this.budgetDiff = [];
    this.totalExpenses = [];
    this.totalIncome = [];

    // TODO: Move this to an init function, probably.
    const categories = this.getCategoryList(this.thisYear);

    // Initialize totals
    for (let month = 1; month <= 12; month++) {
      this.totalExpenses["month" + month] = this.totalIncome[
        "month" + month
      ] = 0;
    }
    this.totalExpenses.total = this.totalIncome.total = 0;

    for (let i = 0; i < categories.length; i++) {
      const entry = {};

      // Income or expense?
      const catType = this.categoryModel.getType(categories[i]);
      console.log("catType: ", catType);

      entry.category = categories[i];
      entry.total = 0;
      entry.displayCategory = categories[i];
      entry.nodeId = categories[i].nodeId;

      for (let month = 1; month <= 12; month++) {
        // Get the nodeId
        const nodeId = this.getNodeId(categories[i], month, this.thisYear);

        entry["month" + month] = this.getCategory(
          categories[i],
          month,
          this.thisYear
        );
        entry.total += entry["month" + month];
        entry["nodeId" + month] = nodeId;

        if (catType == "Income") {
          this.totalIncome["month" + month] += entry["month" + month];
        } else if (catType == "Expense") {
          this.totalExpenses["month" + month] += entry["month" + month];
        }
      }

      if (catType == "Income") {
        this.budgetIncome.push(entry);
      } else if (catType == "Expense") {
        this.budgetExpenses.push(entry);
      }
    }

    // Calculate totals for entire year.
    for (let month = 1; month <= 12; month++) {
      this.totalExpenses.total += this.totalExpenses["month" + month];
      this.totalIncome.total += this.totalIncome["month" + month];
    }

    this.budgetExpenses = sort(this.budgetExpenses, "displayCategory");
    this.budgetIncome = sort(this.budgetIncome, "displayCategory");

    // Calculate Income - Expenses
    for (let month = 1; month <= 12; month++) {
      this.budgetDiff["month" + month] =
        this.totalIncome["month" + month] - this.totalExpenses["month" + month];
    }

    this.budgetDiff.yearTotal =
      this.totalIncome.total - this.totalExpenses.total;

    console.log("built budget model");
  }

  // Convert months and years to integers and then remove commas and convert amounts to floats.
  cleanData() {
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i].month = parseInt(this.rows[i].month);
      this.rows[i].year = parseInt(this.rows[i].year);
      this.rows[i].amount = this.rows[i].amount.replace(/,/g, ""); // Remove commas.
      this.rows[i].amount = parseFloat(this.rows[i].amount);
    }
  }

  // Does the budget have any entries for this category?
  hasCategory(category, year) {
    const result = this.rows.filter(function (element) {
      return element.category === category && element.year === year;
    });

    return result.length;
  }

  // Get the list of all categories in the budget for a given year.
  getCategoryList(year) {
    const result = this.rows.reduce(function (allCategories, element) {
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
  getCategory(category, month, year) {
    const budgetAmount = this.rows.find(function (element) {
      return (
        element.category === category &&
        element.month === month &&
        element.year === year
      );
    });

    if (budgetAmount) {
      console.log("budgetAmount: ", budgetAmount);
      return budgetAmount.amount;
    } else {
      return 0;
    }
  }

  // Get the YTD budget for a category/month/year
  getCategoryYTD(category, month, year) {
    const budgetYTD = this.rows.reduce(function (sum, element) {
      if (
        element.category === category &&
        element.month <= month &&
        element.year === year
      ) {
        return sum + element.amount;
      } else {
        return sum;
      }
    }, 0);

    return budgetYTD;
  }

  getNodeId(category, month, year) {
    const nodeId = this.rows.find(function (element) {
      return (
        element.category === category &&
        element.month === month &&
        element.year === year
      );
    });

    if (nodeId) {
      return nodeId.nodeId;
    } else {
      return null;
    }
  }
}

export default BudgetModel;
