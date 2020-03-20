import base from "../base";

// A library that defines our budget data model.
class BudgetModel {
  constructor(ready) {
    this.rows = [];

    // Fetch the data from firebase.
    base.fetch('amounts', {
      context: this,
      asArray: true,
      then(data) {
        this.rows = data;

        if (ready) {
          ready();  
        }
      }
    });
  }

  // Get the budget amount for a category/month/year.
  getCategory(category, month, year) {
    var budgetAmount = this.rows.find(function(element) {
      return (
        element.Category  === category  &&
        element.Month     === month     &&
        element.Year      === year
      );
    });

    if (budgetAmount) {
      return budgetAmount.Amount;  
    } else {
      return 0;
    }
  }

  // Get the YTD budget for a category/month/year
  getCategoryYTD(category, month, year) {
    var budgetYTD = this.rows.reduce(function(sum, element) {
      if (
        element.Category  === category &&
        element.Month     <=  month    &&
        element.Year      === year
      ) {
        return sum + element.Amount;
      } else {
        return sum;
      }
    }, 0);

    return budgetYTD;
  }

  // Get the list of all categories in the budget for a given year.
  getCategoryList(year) {
    var result = this.rows.reduce(function(allCategories, element) {
      if (allCategories.indexOf(element.Category) > -1) {
        return allCategories;
      } else {
        if (parseInt(element.Year) === parseInt(year)) {
          allCategories.push(element.Category);
        }

        return allCategories;
      }
    }, []);

    return result;
  }

  // Given a category, get all the amounts for that category.
  getAmountsByCategory(category) {
    const amountsByCategory = this.rows.filter(item => {
      return (item.Category === category);
    });

    return amountsByCategory;
  }

  // Get all the amounts for a given month.
  getAmountsByMonth(month) {
    const amountsByMonth = this.rows.filter(item => {
      return (parseInt(item.Month) === parseInt(month));
    });

    return amountsByMonth;
  }
}

export default BudgetModel;
