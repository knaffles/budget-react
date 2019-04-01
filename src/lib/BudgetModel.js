// A library that defines our budget data model.
class BudgetModel {
  constructor() {
    this.rows = [];
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
