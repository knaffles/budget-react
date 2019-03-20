import React from 'react';
import * as Helpers from './lib/Helpers.js';
import BudgetRow from './BudgetRow';

class BudgetTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      amounts: [],
      year: this.props.year,
    }

    // this.transactions = new Transactions();
    // // TODO - Replace with call to firebase to load data. See componentDidMount.
    // this.transactions.assignRows(sampleAmounts);
    this.state.amounts = sampleAmounts;

    // An array of the sample amounts, just to make handling them easier.
    this.amountsArray = Helpers.convertObjToArray(sampleAmounts);
    this.categoryArray = [];
  }

  componentWillMount() {
    // Loop through all entries and construct an array of unique budget
    // categories.
    this.categoryArray = this.getCategoryList(this.state.year);
  }

  componentDidMount() {
    // TODO this is where fetch the amounts from firebase.
    // See docs where it says data should be loaded in componentDidMount:
    // https://reactjs.org/docs/react-component.html#componentdidmount
  }

  // Get the list of all categories in the budget for a given year.
  getCategoryList(year) {
    var result = this.amountsArray.reduce(function(allCategories, element) {
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
    const amountsByCategory = this.amountsArray.filter(item => {
      return (item.Category === category);
    });

    return amountsByCategory;
  }

  // Get all the amounts for a given month.
  getAmountsByMonth(month) {
    const amountsByMonth = this.amountsArray.filter(item => {
      return (parseInt(item.Month) === parseInt(month));
    });

    return amountsByMonth;
  }

  changeBudget = (key, value) => {
    console.log(value);
    // 1. Take a copy of the existing state
    const amounts = { ...this.state.amounts };
    // 2. Update the amount that is passed in.
    amounts[key].Amount = value;
    // 3. Set the new amounts object to state
    this.setState({ amounts });
  }

  render() {
    const monthArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const monthTotals = {
      income:   [],
      expenses:  []
    };
    let grandTotal = {
      income: 0,
      expenses: 0
    };
    let _this = this;

    for (var month = 1; month <= 12; month++) {
      var income = 0;
      var expenses = 0;

      // Get all the amounts for this month.
      var thisMonth = this.getAmountsByMonth(month);

      // Loop through all the amounts and add to either the income or expense
      // totals depending on the category type.
      thisMonth.forEach(function(currValue) {
        if (
          parseInt(currValue.Month) === month &
          parseInt(currValue.Year) === parseInt(_this.state.year)
        ) {
          if (currValue.Category) {
            if (_this.props.categoryLookup.getType(currValue.Category) == 'Income') {
              income += parseFloat(currValue.Amount);
            } else {
              expenses += parseFloat(currValue.Amount);
            }            
          }
        }
      });

      // Round off the totals and add to the monthTotals.
      monthTotals.income.push(income.toFixed(2));
      monthTotals.expenses.push(expenses.toFixed(2));

      // Add to the grand totals.
      grandTotal.income += income;
      grandTotal.expenses += expenses;
    }

    // Round off the grand totals.
    grandTotal.income = grandTotal.income.toFixed(2);
    grandTotal.expenses = grandTotal.expenses.toFixed(2);

    return (
      <div>
      <table id="expenses" className="table table-striped table-bordered table-budget">
        <caption>Expenses</caption>
        <thead>
          <tr>
            <th>Category</th>
            <th>JAN</th>
            <th>FEB</th>
            <th>MAR</th>
            <th>APR</th>
            <th>MAY</th>
            <th>JUN</th>
            <th>JUL</th>
            <th>AUG</th>
            <th>SEP</th>
            <th>OCT</th>
            <th>NOV</th>
            <th>DEC</th>
            <th className="totals">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          { this.categoryArray.map(key =>
            this.props.categoryLookup.getType(key) === 'Expense' &&
            <BudgetRow
              category={ key }
              categoryLookup={ this.props.categoryLookup }
              amounts={ this.getAmountsByCategory(key) }
              year= { this.props.year }
              changeBudget={ this.changeBudget }
              key={ key }/>
          )}
          <tr className="totals">
            <td>Totals:</td>
            { monthArray.map(key => 
              <td key={ key }>{ monthTotals.expenses[key - 1] }</td>
            )}
            <td>{ grandTotal.expenses }</td>
          </tr>
        </tbody>
      </table>
      <table id="income" className="table table-striped table-bordered table-budget">
        <caption>Income</caption>
        <thead>
          <tr>
            <th>Category</th>
            <th>JAN</th>
            <th>FEB</th>
            <th>MAR</th>
            <th>APR</th>
            <th>MAY</th>
            <th>JUN</th>
            <th>JUL</th>
            <th>AUG</th>
            <th>SEP</th>
            <th>OCT</th>
            <th>NOV</th>
            <th>DEC</th>
            <th className="totals">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          { this.categoryArray.map(key =>
            this.props.categoryLookup.getType(key) === 'Income' &&
            <BudgetRow
              category={ key }
              categoryLookup={ this.props.categoryLookup }
              amounts={ this.getAmountsByCategory(key) }
              year={ this.props.year }
              key={ key }/>
          )}
          <tr className="totals">
            <td>Totals:</td>
            { monthArray.map(key => 
              <td key={ key }>{ monthTotals.income[key - 1] }</td>
            )}
            <td>{ grandTotal.income }</td>
          </tr>
        </tbody>
      </table>
      </div>
    );
  }
}

const sampleAmounts = {
  "Auto%20Insurance102017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 10,
    "Year" : 2017
  },
  "Auto%20Insurance102018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 10,
    "Year" : 2018
  },
  "Auto%20Insurance112017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 11,
    "Year" : 2017
  },
  "Auto%20Insurance112018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 11,
    "Year" : 2018
  },
  "Auto%20Insurance12017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 1,
    "Year" : 2017
  },
  "Auto%20Insurance12018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 1,
    "Year" : 2018
  },
  "Auto%20Insurance122017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 12,
    "Year" : 2017
  },
  "Auto%20Insurance122018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 12,
    "Year" : 2018
  },
  "Auto%20Insurance22017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 2,
    "Year" : 2017
  },
  "Auto%20Insurance22018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 2,
    "Year" : 2018
  },
  "Auto%20Insurance32017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 3,
    "Year" : 2017
  },
  "Auto%20Insurance32018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 3,
    "Year" : 2018
  },
  "Auto%20Insurance42017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 4,
    "Year" : 2017
  },
  "Auto%20Insurance42018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 4,
    "Year" : 2018
  },
  "Auto%20Insurance52017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 5,
    "Year" : 2017
  },
  "Auto%20Insurance52018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 5,
    "Year" : 2018
  },
  "Auto%20Insurance62017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 6,
    "Year" : 2017
  },
  "Auto%20Insurance62018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 6,
    "Year" : 2018
  },
  "Auto%20Insurance72017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 7,
    "Year" : 2017
  },
  "Auto%20Insurance72018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 7,
    "Year" : 2018
  },
  "Auto%20Insurance82017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 8,
    "Year" : 2017
  },
  "Auto%20Insurance82018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 8,
    "Year" : 2018
  },
  "Auto%20Insurance92017" : {
    "Amount" : 85,
    "Category" : "Auto Insurance",
    "Month" : 9,
    "Year" : 2017
  },
  "Auto%20Insurance92018" : {
    "Amount" : 92.25,
    "Category" : "Auto Insurance",
    "Month" : 9,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare102017" : {
    "Amount" : 984,
    "Category" : "Babysitter & Daycare",
    "Month" : 10,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare102018" : {
    "Amount" : 750,
    "Category" : "Babysitter & Daycare",
    "Month" : 10,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare112017" : {
    "Amount" : 984,
    "Category" : "Babysitter & Daycare",
    "Month" : 11,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare112018" : {
    "Amount" : 750,
    "Category" : "Babysitter & Daycare",
    "Month" : 11,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare12017" : {
    "Amount" : 984,
    "Category" : "Babysitter & Daycare",
    "Month" : 1,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare12018" : {
    "Amount" : -4250,
    "Category" : "Babysitter & Daycare",
    "Month" : 1,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare122017" : {
    "Amount" : -4016,
    "Category" : "Babysitter & Daycare",
    "Month" : 12,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare122018" : {
    "Amount" : 750,
    "Category" : "Babysitter & Daycare",
    "Month" : 12,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare22017" : {
    "Amount" : 984,
    "Category" : "Babysitter & Daycare",
    "Month" : 2,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare22018" : {
    "Amount" : 750,
    "Category" : "Babysitter & Daycare",
    "Month" : 2,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare32017" : {
    "Amount" : 984,
    "Category" : "Babysitter & Daycare",
    "Month" : 3,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare32018" : {
    "Amount" : 750,
    "Category" : "Babysitter & Daycare",
    "Month" : 3,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare42017" : {
    "Amount" : 984,
    "Category" : "Babysitter & Daycare",
    "Month" : 4,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare42018" : {
    "Amount" : 750,
    "Category" : "Babysitter & Daycare",
    "Month" : 4,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare52017" : {
    "Amount" : 984,
    "Category" : "Babysitter & Daycare",
    "Month" : 5,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare52018" : {
    "Amount" : 0,
    "Category" : "Babysitter & Daycare",
    "Month" : 5,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare62017" : {
    "Amount" : 984,
    "Category" : "Babysitter & Daycare",
    "Month" : 6,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare62018" : {
    "Amount" : 0,
    "Category" : "Babysitter & Daycare",
    "Month" : 6,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare72017" : {
    "Amount" : 984,
    "Category" : "Babysitter & Daycare",
    "Month" : 7,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare72018" : {
    "Amount" : 0,
    "Category" : "Babysitter & Daycare",
    "Month" : 7,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare82017" : {
    "Amount" : 984,
    "Category" : "Babysitter & Daycare",
    "Month" : 8,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare82018" : {
    "Amount" : 750,
    "Category" : "Babysitter & Daycare",
    "Month" : 8,
    "Year" : 2018
  },
  "Babysitter%20%26%20Daycare92017" : {
    "Amount" : 984,
    "Category" : "Babysitter & Daycare",
    "Month" : 9,
    "Year" : 2017
  },
  "Babysitter%20%26%20Daycare92018" : {
    "Amount" : 750,
    "Category" : "Babysitter & Daycare",
    "Month" : 9,
    "Year" : 2018
  },
  "Birthday%20Parties102017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 10,
    "Year" : 2017
  },
  "Birthday%20Parties102018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 10,
    "Year" : 2018
  },
  "Birthday%20Parties112017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 11,
    "Year" : 2017
  },
  "Birthday%20Parties112018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 11,
    "Year" : 2018
  },
  "Birthday%20Parties12017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 1,
    "Year" : 2017
  },
  "Birthday%20Parties12018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 1,
    "Year" : 2018
  },
  "Birthday%20Parties122017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 12,
    "Year" : 2017
  },
  "Birthday%20Parties122018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 12,
    "Year" : 2018
  },
  "Birthday%20Parties22017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 2,
    "Year" : 2017
  },
  "Birthday%20Parties22018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 2,
    "Year" : 2018
  },
  "Birthday%20Parties32017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 3,
    "Year" : 2017
  },
  "Birthday%20Parties32018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 3,
    "Year" : 2018
  },
  "Birthday%20Parties42017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 4,
    "Year" : 2017
  },
  "Birthday%20Parties42018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 4,
    "Year" : 2018
  },
  "Birthday%20Parties52017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 5,
    "Year" : 2017
  },
  "Birthday%20Parties52018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 5,
    "Year" : 2018
  },
  "Birthday%20Parties62017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 6,
    "Year" : 2017
  },
  "Birthday%20Parties62018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 6,
    "Year" : 2018
  },
  "Birthday%20Parties72017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 7,
    "Year" : 2017
  },
  "Birthday%20Parties72018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 7,
    "Year" : 2018
  },
  "Birthday%20Parties82017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 8,
    "Year" : 2017
  },
  "Birthday%20Parties82018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 8,
    "Year" : 2018
  },
  "Birthday%20Parties92017" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 9,
    "Year" : 2017
  },
  "Birthday%20Parties92018" : {
    "Amount" : 83,
    "Category" : "Birthday Parties",
    "Month" : 9,
    "Year" : 2018
  },
  "Cash%20%26%20ATM102017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 10,
    "Year" : 2017
  },
  "Cash%20%26%20ATM102018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 10,
    "Year" : 2018
  },
  "Cash%20%26%20ATM112017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 11,
    "Year" : 2017
  },
  "Cash%20%26%20ATM112018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 11,
    "Year" : 2018
  },
  "Cash%20%26%20ATM12017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 1,
    "Year" : 2017
  },
  "Cash%20%26%20ATM12018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 1,
    "Year" : 2018
  },
  "Cash%20%26%20ATM122017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 12,
    "Year" : 2017
  },
  "Cash%20%26%20ATM122018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 12,
    "Year" : 2018
  },
  "Cash%20%26%20ATM22017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 2,
    "Year" : 2017
  },
  "Cash%20%26%20ATM22018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 2,
    "Year" : 2018
  },
  "Cash%20%26%20ATM32017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 3,
    "Year" : 2017
  },
  "Cash%20%26%20ATM32018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 3,
    "Year" : 2018
  },
  "Cash%20%26%20ATM42017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 4,
    "Year" : 2017
  },
  "Cash%20%26%20ATM42018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 4,
    "Year" : 2018
  },
  "Cash%20%26%20ATM52017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 5,
    "Year" : 2017
  },
  "Cash%20%26%20ATM52018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 5,
    "Year" : 2018
  },
  "Cash%20%26%20ATM62017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 6,
    "Year" : 2017
  },
  "Cash%20%26%20ATM62018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 6,
    "Year" : 2018
  },
  "Cash%20%26%20ATM72017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 7,
    "Year" : 2017
  },
  "Cash%20%26%20ATM72018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 7,
    "Year" : 2018
  },
  "Cash%20%26%20ATM82017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 8,
    "Year" : 2017
  },
  "Cash%20%26%20ATM82018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 8,
    "Year" : 2018
  },
  "Cash%20%26%20ATM92017" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 9,
    "Year" : 2017
  },
  "Cash%20%26%20ATM92018" : {
    "Amount" : 200,
    "Category" : "Cash & ATM",
    "Month" : 9,
    "Year" : 2018
  },
  "Charity102017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 10,
    "Year" : 2017
  },
  "Charity102018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 10,
    "Year" : 2018
  },
  "Charity112017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 11,
    "Year" : 2017
  },
  "Charity112018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 11,
    "Year" : 2018
  },
  "Charity12017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 1,
    "Year" : 2017
  },
  "Charity12018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 1,
    "Year" : 2018
  },
  "Charity122017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 12,
    "Year" : 2017
  },
  "Charity122018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 12,
    "Year" : 2018
  },
  "Charity22017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 2,
    "Year" : 2017
  },
  "Charity22018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 2,
    "Year" : 2018
  },
  "Charity32017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 3,
    "Year" : 2017
  },
  "Charity32018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 3,
    "Year" : 2018
  },
  "Charity42017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 4,
    "Year" : 2017
  },
  "Charity42018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 4,
    "Year" : 2018
  },
  "Charity52017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 5,
    "Year" : 2017
  },
  "Charity52018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 5,
    "Year" : 2018
  },
  "Charity62017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 6,
    "Year" : 2017
  },
  "Charity62018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 6,
    "Year" : 2018
  },
  "Charity72017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 7,
    "Year" : 2017
  },
  "Charity72018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 7,
    "Year" : 2018
  },
  "Charity82017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 8,
    "Year" : 2017
  },
  "Charity82018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 8,
    "Year" : 2018
  },
  "Charity92017" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 9,
    "Year" : 2017
  },
  "Charity92018" : {
    "Amount" : 200,
    "Category" : "Charity",
    "Month" : 9,
    "Year" : 2018
  },
  "Christmas%20Gifts102017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 10,
    "Year" : 2017
  },
  "Christmas%20Gifts102018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 10,
    "Year" : 2018
  },
  "Christmas%20Gifts112017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 11,
    "Year" : 2017
  },
  "Christmas%20Gifts112018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 11,
    "Year" : 2018
  },
  "Christmas%20Gifts12017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 1,
    "Year" : 2017
  },
  "Christmas%20Gifts12018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 1,
    "Year" : 2018
  },
  "Christmas%20Gifts122017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 12,
    "Year" : 2017
  },
  "Christmas%20Gifts122018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 12,
    "Year" : 2018
  },
  "Christmas%20Gifts22017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 2,
    "Year" : 2017
  },
  "Christmas%20Gifts22018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 2,
    "Year" : 2018
  },
  "Christmas%20Gifts32017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 3,
    "Year" : 2017
  },
  "Christmas%20Gifts32018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 3,
    "Year" : 2018
  },
  "Christmas%20Gifts42017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 4,
    "Year" : 2017
  },
  "Christmas%20Gifts42018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 4,
    "Year" : 2018
  },
  "Christmas%20Gifts52017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 5,
    "Year" : 2017
  },
  "Christmas%20Gifts52018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 5,
    "Year" : 2018
  },
  "Christmas%20Gifts62017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 6,
    "Year" : 2017
  },
  "Christmas%20Gifts62018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 6,
    "Year" : 2018
  },
  "Christmas%20Gifts72017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 7,
    "Year" : 2017
  },
  "Christmas%20Gifts72018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 7,
    "Year" : 2018
  },
  "Christmas%20Gifts82017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 8,
    "Year" : 2017
  },
  "Christmas%20Gifts82018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 8,
    "Year" : 2018
  },
  "Christmas%20Gifts92017" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 9,
    "Year" : 2017
  },
  "Christmas%20Gifts92018" : {
    "Amount" : 58,
    "Category" : "Christmas Gifts",
    "Month" : 9,
    "Year" : 2018
  },
  "Computer102017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 10,
    "Year" : 2017
  },
  "Computer102018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 10,
    "Year" : 2018
  },
  "Computer112017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 11,
    "Year" : 2017
  },
  "Computer112018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 11,
    "Year" : 2018
  },
  "Computer12017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 1,
    "Year" : 2017
  },
  "Computer12018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 1,
    "Year" : 2018
  },
  "Computer122017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 12,
    "Year" : 2017
  },
  "Computer122018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 12,
    "Year" : 2018
  },
  "Computer22017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 2,
    "Year" : 2017
  },
  "Computer22018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 2,
    "Year" : 2018
  },
  "Computer32017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 3,
    "Year" : 2017
  },
  "Computer32018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 3,
    "Year" : 2018
  },
  "Computer42017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 4,
    "Year" : 2017
  },
  "Computer42018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 4,
    "Year" : 2018
  },
  "Computer52017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 5,
    "Year" : 2017
  },
  "Computer52018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 5,
    "Year" : 2018
  },
  "Computer62017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 6,
    "Year" : 2017
  },
  "Computer62018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 6,
    "Year" : 2018
  },
  "Computer72017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 7,
    "Year" : 2017
  },
  "Computer72018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 7,
    "Year" : 2018
  },
  "Computer82017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 8,
    "Year" : 2017
  },
  "Computer82018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 8,
    "Year" : 2018
  },
  "Computer92017" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 9,
    "Year" : 2017
  },
  "Computer92018" : {
    "Amount" : 50,
    "Category" : "Computer",
    "Month" : 9,
    "Year" : 2018
  },
  "Creative%20Cloud102017" : {
    "Amount" : 55,
    "Category" : "Creative Cloud",
    "Month" : 10,
    "Year" : 2017
  },
  "Creative%20Cloud102018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 10,
    "Year" : 2018
  },
  "Creative%20Cloud112017" : {
    "Amount" : 55,
    "Category" : "Creative Cloud",
    "Month" : 11,
    "Year" : 2017
  },
  "Creative%20Cloud112018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 11,
    "Year" : 2018
  },
  "Creative%20Cloud12017" : {
    "Amount" : 80,
    "Category" : "Creative Cloud",
    "Month" : 1,
    "Year" : 2017
  },
  "Creative%20Cloud12018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 1,
    "Year" : 2018
  },
  "Creative%20Cloud122017" : {
    "Amount" : 55,
    "Category" : "Creative Cloud",
    "Month" : 12,
    "Year" : 2017
  },
  "Creative%20Cloud122018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 12,
    "Year" : 2018
  },
  "Creative%20Cloud22017" : {
    "Amount" : 80,
    "Category" : "Creative Cloud",
    "Month" : 2,
    "Year" : 2017
  },
  "Creative%20Cloud22018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 2,
    "Year" : 2018
  },
  "Creative%20Cloud32017" : {
    "Amount" : 80,
    "Category" : "Creative Cloud",
    "Month" : 3,
    "Year" : 2017
  },
  "Creative%20Cloud32018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 3,
    "Year" : 2018
  },
  "Creative%20Cloud42017" : {
    "Amount" : 80,
    "Category" : "Creative Cloud",
    "Month" : 4,
    "Year" : 2017
  },
  "Creative%20Cloud42018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 4,
    "Year" : 2018
  },
  "Creative%20Cloud52017" : {
    "Amount" : 80,
    "Category" : "Creative Cloud",
    "Month" : 5,
    "Year" : 2017
  },
  "Creative%20Cloud52018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 5,
    "Year" : 2018
  },
  "Creative%20Cloud62017" : {
    "Amount" : 55,
    "Category" : "Creative Cloud",
    "Month" : 6,
    "Year" : 2017
  },
  "Creative%20Cloud62018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 6,
    "Year" : 2018
  },
  "Creative%20Cloud72017" : {
    "Amount" : 55,
    "Category" : "Creative Cloud",
    "Month" : 7,
    "Year" : 2017
  },
  "Creative%20Cloud72018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 7,
    "Year" : 2018
  },
  "Creative%20Cloud82017" : {
    "Amount" : 55,
    "Category" : "Creative Cloud",
    "Month" : 8,
    "Year" : 2017
  },
  "Creative%20Cloud82018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 8,
    "Year" : 2018
  },
  "Creative%20Cloud92017" : {
    "Amount" : 55,
    "Category" : "Creative Cloud",
    "Month" : 9,
    "Year" : 2017
  },
  "Creative%20Cloud92018" : {
    "Amount" : 53.11,
    "Category" : "Creative Cloud",
    "Month" : 9,
    "Year" : 2018
  },
  "Doctor102017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 10,
    "Year" : 2017
  },
  "Doctor102018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 10,
    "Year" : 2018
  },
  "Doctor112017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 11,
    "Year" : 2017
  },
  "Doctor112018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 11,
    "Year" : 2018
  },
  "Doctor12017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 1,
    "Year" : 2017
  },
  "Doctor12018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 1,
    "Year" : 2018
  },
  "Doctor122017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 12,
    "Year" : 2017
  },
  "Doctor122018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 12,
    "Year" : 2018
  },
  "Doctor22017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 2,
    "Year" : 2017
  },
  "Doctor22018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 2,
    "Year" : 2018
  },
  "Doctor32017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 3,
    "Year" : 2017
  },
  "Doctor32018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 3,
    "Year" : 2018
  },
  "Doctor42017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 4,
    "Year" : 2017
  },
  "Doctor42018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 4,
    "Year" : 2018
  },
  "Doctor52017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 5,
    "Year" : 2017
  },
  "Doctor52018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 5,
    "Year" : 2018
  },
  "Doctor62017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 6,
    "Year" : 2017
  },
  "Doctor62018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 6,
    "Year" : 2018
  },
  "Doctor72017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 7,
    "Year" : 2017
  },
  "Doctor72018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 7,
    "Year" : 2018
  },
  "Doctor82017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 8,
    "Year" : 2017
  },
  "Doctor82018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 8,
    "Year" : 2018
  },
  "Doctor92017" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 9,
    "Year" : 2017
  },
  "Doctor92018" : {
    "Amount" : 0,
    "Category" : "Doctor",
    "Month" : 9,
    "Year" : 2018
  },
  "Emergency%20Expenses102017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 10,
    "Year" : 2017
  },
  "Emergency%20Expenses102018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 10,
    "Year" : 2018
  },
  "Emergency%20Expenses112017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 11,
    "Year" : 2017
  },
  "Emergency%20Expenses112018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 11,
    "Year" : 2018
  },
  "Emergency%20Expenses12017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 1,
    "Year" : 2017
  },
  "Emergency%20Expenses12018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 1,
    "Year" : 2018
  },
  "Emergency%20Expenses122017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 12,
    "Year" : 2017
  },
  "Emergency%20Expenses122018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 12,
    "Year" : 2018
  },
  "Emergency%20Expenses22017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 2,
    "Year" : 2017
  },
  "Emergency%20Expenses22018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 2,
    "Year" : 2018
  },
  "Emergency%20Expenses32017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 3,
    "Year" : 2017
  },
  "Emergency%20Expenses32018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 3,
    "Year" : 2018
  },
  "Emergency%20Expenses42017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 4,
    "Year" : 2017
  },
  "Emergency%20Expenses42018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 4,
    "Year" : 2018
  },
  "Emergency%20Expenses52017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 5,
    "Year" : 2017
  },
  "Emergency%20Expenses52018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 5,
    "Year" : 2018
  },
  "Emergency%20Expenses62017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 6,
    "Year" : 2017
  },
  "Emergency%20Expenses62018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 6,
    "Year" : 2018
  },
  "Emergency%20Expenses72017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 7,
    "Year" : 2017
  },
  "Emergency%20Expenses72018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 7,
    "Year" : 2018
  },
  "Emergency%20Expenses82017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 8,
    "Year" : 2017
  },
  "Emergency%20Expenses82018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 8,
    "Year" : 2018
  },
  "Emergency%20Expenses92017" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 9,
    "Year" : 2017
  },
  "Emergency%20Expenses92018" : {
    "Amount" : 200,
    "Category" : "Emergency Expenses",
    "Month" : 9,
    "Year" : 2018
  },
  "Entertainment102017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 10,
    "Year" : 2017
  },
  "Entertainment102018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 10,
    "Year" : 2018
  },
  "Entertainment112017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 11,
    "Year" : 2017
  },
  "Entertainment112018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 11,
    "Year" : 2018
  },
  "Entertainment12017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 1,
    "Year" : 2017
  },
  "Entertainment12018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 1,
    "Year" : 2018
  },
  "Entertainment122017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 12,
    "Year" : 2017
  },
  "Entertainment122018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 12,
    "Year" : 2018
  },
  "Entertainment22017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 2,
    "Year" : 2017
  },
  "Entertainment22018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 2,
    "Year" : 2018
  },
  "Entertainment32017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 3,
    "Year" : 2017
  },
  "Entertainment32018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 3,
    "Year" : 2018
  },
  "Entertainment42017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 4,
    "Year" : 2017
  },
  "Entertainment42018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 4,
    "Year" : 2018
  },
  "Entertainment52017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 5,
    "Year" : 2017
  },
  "Entertainment52018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 5,
    "Year" : 2018
  },
  "Entertainment62017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 6,
    "Year" : 2017
  },
  "Entertainment62018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 6,
    "Year" : 2018
  },
  "Entertainment72017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 7,
    "Year" : 2017
  },
  "Entertainment72018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 7,
    "Year" : 2018
  },
  "Entertainment82017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 8,
    "Year" : 2017
  },
  "Entertainment82018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 8,
    "Year" : 2018
  },
  "Entertainment92017" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 9,
    "Year" : 2017
  },
  "Entertainment92018" : {
    "Amount" : 250,
    "Category" : "Entertainment",
    "Month" : 9,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel102017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 10,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel102018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 10,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel112017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 11,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel112018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 11,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel12017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 1,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel12018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 1,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel122017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 12,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel122018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 12,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel22017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 2,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel22018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 2,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel32017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 3,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel32018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 3,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel42017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 4,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel42018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 4,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel52017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 5,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel52018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 5,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel62017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 6,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel62018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 6,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel72017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 7,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel72018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 7,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel82017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 8,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel82018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 8,
    "Year" : 2018
  },
  "Gas%20%26%20Fuel92017" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 9,
    "Year" : 2017
  },
  "Gas%20%26%20Fuel92018" : {
    "Amount" : 70,
    "Category" : "Gas & Fuel",
    "Month" : 9,
    "Year" : 2018
  },
  "Gift102017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 10,
    "Year" : 2017
  },
  "Gift102018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 10,
    "Year" : 2018
  },
  "Gift112017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 11,
    "Year" : 2017
  },
  "Gift112018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 11,
    "Year" : 2018
  },
  "Gift12017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 1,
    "Year" : 2017
  },
  "Gift12018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 1,
    "Year" : 2018
  },
  "Gift122017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 12,
    "Year" : 2017
  },
  "Gift122018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 12,
    "Year" : 2018
  },
  "Gift22017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 2,
    "Year" : 2017
  },
  "Gift22018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 2,
    "Year" : 2018
  },
  "Gift32017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 3,
    "Year" : 2017
  },
  "Gift32018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 3,
    "Year" : 2018
  },
  "Gift42017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 4,
    "Year" : 2017
  },
  "Gift42018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 4,
    "Year" : 2018
  },
  "Gift52017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 5,
    "Year" : 2017
  },
  "Gift52018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 5,
    "Year" : 2018
  },
  "Gift62017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 6,
    "Year" : 2017
  },
  "Gift62018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 6,
    "Year" : 2018
  },
  "Gift72017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 7,
    "Year" : 2017
  },
  "Gift72018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 7,
    "Year" : 2018
  },
  "Gift82017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 8,
    "Year" : 2017
  },
  "Gift82018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 8,
    "Year" : 2018
  },
  "Gift92017" : {
    "Amount" : 50,
    "Category" : "Gift",
    "Month" : 9,
    "Year" : 2017
  },
  "Gift92018" : {
    "Amount" : 75,
    "Category" : "Gift",
    "Month" : 9,
    "Year" : 2018
  },
  "Groceries102017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 10,
    "Year" : 2017
  },
  "Groceries102018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 10,
    "Year" : 2018
  },
  "Groceries112017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 11,
    "Year" : 2017
  },
  "Groceries112018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 11,
    "Year" : 2018
  },
  "Groceries12017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 1,
    "Year" : 2017
  },
  "Groceries12018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 1,
    "Year" : 2018
  },
  "Groceries122017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 12,
    "Year" : 2017
  },
  "Groceries122018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 12,
    "Year" : 2018
  },
  "Groceries22017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 2,
    "Year" : 2017
  },
  "Groceries22018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 2,
    "Year" : 2018
  },
  "Groceries32017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 3,
    "Year" : 2017
  },
  "Groceries32018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 3,
    "Year" : 2018
  },
  "Groceries42017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 4,
    "Year" : 2017
  },
  "Groceries42018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 4,
    "Year" : 2018
  },
  "Groceries52017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 5,
    "Year" : 2017
  },
  "Groceries52018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 5,
    "Year" : 2018
  },
  "Groceries62017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 6,
    "Year" : 2017
  },
  "Groceries62018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 6,
    "Year" : 2018
  },
  "Groceries72017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 7,
    "Year" : 2017
  },
  "Groceries72018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 7,
    "Year" : 2018
  },
  "Groceries82017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 8,
    "Year" : 2017
  },
  "Groceries82018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 8,
    "Year" : 2018
  },
  "Groceries92017" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 9,
    "Year" : 2017
  },
  "Groceries92018" : {
    "Amount" : 800,
    "Category" : "Groceries",
    "Month" : 9,
    "Year" : 2018
  },
  "Home%20Improvement102017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 10,
    "Year" : 2017
  },
  "Home%20Improvement102018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 10,
    "Year" : 2018
  },
  "Home%20Improvement112017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 11,
    "Year" : 2017
  },
  "Home%20Improvement112018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 11,
    "Year" : 2018
  },
  "Home%20Improvement12017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 1,
    "Year" : 2017
  },
  "Home%20Improvement12018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 1,
    "Year" : 2018
  },
  "Home%20Improvement122017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 12,
    "Year" : 2017
  },
  "Home%20Improvement122018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 12,
    "Year" : 2018
  },
  "Home%20Improvement22017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 2,
    "Year" : 2017
  },
  "Home%20Improvement22018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 2,
    "Year" : 2018
  },
  "Home%20Improvement32017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 3,
    "Year" : 2017
  },
  "Home%20Improvement32018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 3,
    "Year" : 2018
  },
  "Home%20Improvement42017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 4,
    "Year" : 2017
  },
  "Home%20Improvement42018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 4,
    "Year" : 2018
  },
  "Home%20Improvement52017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 5,
    "Year" : 2017
  },
  "Home%20Improvement52018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 5,
    "Year" : 2018
  },
  "Home%20Improvement62017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 6,
    "Year" : 2017
  },
  "Home%20Improvement62018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 6,
    "Year" : 2018
  },
  "Home%20Improvement72017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 7,
    "Year" : 2017
  },
  "Home%20Improvement72018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 7,
    "Year" : 2018
  },
  "Home%20Improvement82017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 8,
    "Year" : 2017
  },
  "Home%20Improvement82018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 8,
    "Year" : 2018
  },
  "Home%20Improvement92017" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 9,
    "Year" : 2017
  },
  "Home%20Improvement92018" : {
    "Amount" : 200,
    "Category" : "Home Improvement",
    "Month" : 9,
    "Year" : 2018
  },
  "Home%20Supplies102017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 10,
    "Year" : 2017
  },
  "Home%20Supplies102018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 10,
    "Year" : 2018
  },
  "Home%20Supplies112017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 11,
    "Year" : 2017
  },
  "Home%20Supplies112018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 11,
    "Year" : 2018
  },
  "Home%20Supplies12017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 1,
    "Year" : 2017
  },
  "Home%20Supplies12018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 1,
    "Year" : 2018
  },
  "Home%20Supplies122017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 12,
    "Year" : 2017
  },
  "Home%20Supplies122018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 12,
    "Year" : 2018
  },
  "Home%20Supplies22017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 2,
    "Year" : 2017
  },
  "Home%20Supplies22018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 2,
    "Year" : 2018
  },
  "Home%20Supplies32017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 3,
    "Year" : 2017
  },
  "Home%20Supplies32018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 3,
    "Year" : 2018
  },
  "Home%20Supplies42017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 4,
    "Year" : 2017
  },
  "Home%20Supplies42018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 4,
    "Year" : 2018
  },
  "Home%20Supplies52017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 5,
    "Year" : 2017
  },
  "Home%20Supplies52018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 5,
    "Year" : 2018
  },
  "Home%20Supplies62017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 6,
    "Year" : 2017
  },
  "Home%20Supplies62018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 6,
    "Year" : 2018
  },
  "Home%20Supplies72017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 7,
    "Year" : 2017
  },
  "Home%20Supplies72018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 7,
    "Year" : 2018
  },
  "Home%20Supplies82017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 8,
    "Year" : 2017
  },
  "Home%20Supplies82018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 8,
    "Year" : 2018
  },
  "Home%20Supplies92017" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 9,
    "Year" : 2017
  },
  "Home%20Supplies92018" : {
    "Amount" : 200,
    "Category" : "Home Supplies",
    "Month" : 9,
    "Year" : 2018
  },
  "IRA%20Contribution102017" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 10,
    "Year" : 2017
  },
  "IRA%20Contribution102018" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 10,
    "Year" : 2018
  },
  "IRA%20Contribution112017" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 11,
    "Year" : 2017
  },
  "IRA%20Contribution112018" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 11,
    "Year" : 2018
  },
  "IRA%20Contribution12017" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 1,
    "Year" : 2017
  },
  "IRA%20Contribution12018" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 1,
    "Year" : 2018
  },
  "IRA%20Contribution122017" : {
    "Amount" : 5500,
    "Category" : "IRA Contribution",
    "Month" : 12,
    "Year" : 2017
  },
  "IRA%20Contribution122018" : {
    "Amount" : 5500,
    "Category" : "IRA Contribution",
    "Month" : 12,
    "Year" : 2018
  },
  "IRA%20Contribution22017" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 2,
    "Year" : 2017
  },
  "IRA%20Contribution22018" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 2,
    "Year" : 2018
  },
  "IRA%20Contribution32017" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 3,
    "Year" : 2017
  },
  "IRA%20Contribution32018" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 3,
    "Year" : 2018
  },
  "IRA%20Contribution42017" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 4,
    "Year" : 2017
  },
  "IRA%20Contribution42018" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 4,
    "Year" : 2018
  },
  "IRA%20Contribution52017" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 5,
    "Year" : 2017
  },
  "IRA%20Contribution52018" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 5,
    "Year" : 2018
  },
  "IRA%20Contribution62017" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 6,
    "Year" : 2017
  },
  "IRA%20Contribution62018" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 6,
    "Year" : 2018
  },
  "IRA%20Contribution72017" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 7,
    "Year" : 2017
  },
  "IRA%20Contribution72018" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 7,
    "Year" : 2018
  },
  "IRA%20Contribution82017" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 8,
    "Year" : 2017
  },
  "IRA%20Contribution82018" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 8,
    "Year" : 2018
  },
  "IRA%20Contribution92017" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 9,
    "Year" : 2017
  },
  "IRA%20Contribution92018" : {
    "Amount" : 0,
    "Category" : "IRA Contribution",
    "Month" : 9,
    "Year" : 2018
  },
  "Internet102017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 10,
    "Year" : 2017
  },
  "Internet102018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 10,
    "Year" : 2018
  },
  "Internet112017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 11,
    "Year" : 2017
  },
  "Internet112018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 11,
    "Year" : 2018
  },
  "Internet12017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 1,
    "Year" : 2017
  },
  "Internet12018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 1,
    "Year" : 2018
  },
  "Internet122017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 12,
    "Year" : 2017
  },
  "Internet122018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 12,
    "Year" : 2018
  },
  "Internet22017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 2,
    "Year" : 2017
  },
  "Internet22018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 2,
    "Year" : 2018
  },
  "Internet32017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 3,
    "Year" : 2017
  },
  "Internet32018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 3,
    "Year" : 2018
  },
  "Internet42017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 4,
    "Year" : 2017
  },
  "Internet42018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 4,
    "Year" : 2018
  },
  "Internet52017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 5,
    "Year" : 2017
  },
  "Internet52018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 5,
    "Year" : 2018
  },
  "Internet62017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 6,
    "Year" : 2017
  },
  "Internet62018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 6,
    "Year" : 2018
  },
  "Internet72017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 7,
    "Year" : 2017
  },
  "Internet72018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 7,
    "Year" : 2018
  },
  "Internet82017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 8,
    "Year" : 2017
  },
  "Internet82018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 8,
    "Year" : 2018
  },
  "Internet92017" : {
    "Amount" : 50,
    "Category" : "Internet",
    "Month" : 9,
    "Year" : 2017
  },
  "Internet92018" : {
    "Amount" : 65,
    "Category" : "Internet",
    "Month" : 9,
    "Year" : 2018
  },
  "Life%20Insurance102017" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 10,
    "Year" : 2017
  },
  "Life%20Insurance102018" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 10,
    "Year" : 2018
  },
  "Life%20Insurance112017" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 11,
    "Year" : 2017
  },
  "Life%20Insurance112018" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 11,
    "Year" : 2018
  },
  "Life%20Insurance12017" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 1,
    "Year" : 2017
  },
  "Life%20Insurance12018" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 1,
    "Year" : 2018
  },
  "Life%20Insurance122017" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 12,
    "Year" : 2017
  },
  "Life%20Insurance122018" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 12,
    "Year" : 2018
  },
  "Life%20Insurance22017" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 2,
    "Year" : 2017
  },
  "Life%20Insurance22018" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 2,
    "Year" : 2018
  },
  "Life%20Insurance32017" : {
    "Amount" : 325,
    "Category" : "Life Insurance",
    "Month" : 3,
    "Year" : 2017
  },
  "Life%20Insurance32018" : {
    "Amount" : 325,
    "Category" : "Life Insurance",
    "Month" : 3,
    "Year" : 2018
  },
  "Life%20Insurance42017" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 4,
    "Year" : 2017
  },
  "Life%20Insurance42018" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 4,
    "Year" : 2018
  },
  "Life%20Insurance52017" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 5,
    "Year" : 2017
  },
  "Life%20Insurance52018" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 5,
    "Year" : 2018
  },
  "Life%20Insurance62017" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 6,
    "Year" : 2017
  },
  "Life%20Insurance62018" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 6,
    "Year" : 2018
  },
  "Life%20Insurance72017" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 7,
    "Year" : 2017
  },
  "Life%20Insurance72018" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 7,
    "Year" : 2018
  },
  "Life%20Insurance82017" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 8,
    "Year" : 2017
  },
  "Life%20Insurance82018" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 8,
    "Year" : 2018
  },
  "Life%20Insurance92017" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 9,
    "Year" : 2017
  },
  "Life%20Insurance92018" : {
    "Amount" : 0,
    "Category" : "Life Insurance",
    "Month" : 9,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade102017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 10,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade102018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 10,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade112017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 11,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade112018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 11,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade12017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 1,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade12018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 1,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade122017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 12,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade122018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 12,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade22017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 2,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade22018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 2,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade32017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 3,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade32018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 3,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade42017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 4,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade42018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 4,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade52017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 5,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade52018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 5,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade62017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 6,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade62018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 6,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade72017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 7,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade72018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 7,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade82017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 8,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade82018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 8,
    "Year" : 2018
  },
  "Major%20Repair%2FUpgrade92017" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 9,
    "Year" : 2017
  },
  "Major%20Repair%2FUpgrade92018" : {
    "Amount" : 500,
    "Category" : "Major Repair/Upgrade",
    "Month" : 9,
    "Year" : 2018
  },
  "Misc%20Expenses102017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 10,
    "Year" : 2017
  },
  "Misc%20Expenses102018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 10,
    "Year" : 2018
  },
  "Misc%20Expenses112017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 11,
    "Year" : 2017
  },
  "Misc%20Expenses112018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 11,
    "Year" : 2018
  },
  "Misc%20Expenses12017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 1,
    "Year" : 2017
  },
  "Misc%20Expenses12018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 1,
    "Year" : 2018
  },
  "Misc%20Expenses122017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 12,
    "Year" : 2017
  },
  "Misc%20Expenses122018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 12,
    "Year" : 2018
  },
  "Misc%20Expenses22017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 2,
    "Year" : 2017
  },
  "Misc%20Expenses22018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 2,
    "Year" : 2018
  },
  "Misc%20Expenses32017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 3,
    "Year" : 2017
  },
  "Misc%20Expenses32018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 3,
    "Year" : 2018
  },
  "Misc%20Expenses42017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 4,
    "Year" : 2017
  },
  "Misc%20Expenses42018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 4,
    "Year" : 2018
  },
  "Misc%20Expenses52017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 5,
    "Year" : 2017
  },
  "Misc%20Expenses52018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 5,
    "Year" : 2018
  },
  "Misc%20Expenses62017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 6,
    "Year" : 2017
  },
  "Misc%20Expenses62018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 6,
    "Year" : 2018
  },
  "Misc%20Expenses72017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 7,
    "Year" : 2017
  },
  "Misc%20Expenses72018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 7,
    "Year" : 2018
  },
  "Misc%20Expenses82017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 8,
    "Year" : 2017
  },
  "Misc%20Expenses82018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 8,
    "Year" : 2018
  },
  "Misc%20Expenses92017" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 9,
    "Year" : 2017
  },
  "Misc%20Expenses92018" : {
    "Amount" : 150,
    "Category" : "Misc Expenses",
    "Month" : 9,
    "Year" : 2018
  },
  "Mobile%20Phone102017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 10,
    "Year" : 2017
  },
  "Mobile%20Phone102018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 10,
    "Year" : 2018
  },
  "Mobile%20Phone112017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 11,
    "Year" : 2017
  },
  "Mobile%20Phone112018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 11,
    "Year" : 2018
  },
  "Mobile%20Phone12017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 1,
    "Year" : 2017
  },
  "Mobile%20Phone12018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 1,
    "Year" : 2018
  },
  "Mobile%20Phone122017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 12,
    "Year" : 2017
  },
  "Mobile%20Phone122018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 12,
    "Year" : 2018
  },
  "Mobile%20Phone22017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 2,
    "Year" : 2017
  },
  "Mobile%20Phone22018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 2,
    "Year" : 2018
  },
  "Mobile%20Phone32017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 3,
    "Year" : 2017
  },
  "Mobile%20Phone32018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 3,
    "Year" : 2018
  },
  "Mobile%20Phone42017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 4,
    "Year" : 2017
  },
  "Mobile%20Phone42018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 4,
    "Year" : 2018
  },
  "Mobile%20Phone52017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 5,
    "Year" : 2017
  },
  "Mobile%20Phone52018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 5,
    "Year" : 2018
  },
  "Mobile%20Phone62017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 6,
    "Year" : 2017
  },
  "Mobile%20Phone62018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 6,
    "Year" : 2018
  },
  "Mobile%20Phone72017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 7,
    "Year" : 2017
  },
  "Mobile%20Phone72018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 7,
    "Year" : 2018
  },
  "Mobile%20Phone82017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 8,
    "Year" : 2017
  },
  "Mobile%20Phone82018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 8,
    "Year" : 2018
  },
  "Mobile%20Phone92017" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 9,
    "Year" : 2017
  },
  "Mobile%20Phone92018" : {
    "Amount" : 102,
    "Category" : "Mobile Phone",
    "Month" : 9,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent102017" : {
    "Amount" : 4000,
    "Category" : "Mortgage & Rent",
    "Month" : 10,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent102018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 10,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent112017" : {
    "Amount" : 2161.55,
    "Category" : "Mortgage & Rent",
    "Month" : 11,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent112018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 11,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent12017" : {
    "Amount" : 2161.55,
    "Category" : "Mortgage & Rent",
    "Month" : 1,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent12018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 1,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent122017" : {
    "Amount" : 2161.55,
    "Category" : "Mortgage & Rent",
    "Month" : 12,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent122018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 12,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent22017" : {
    "Amount" : 2161.55,
    "Category" : "Mortgage & Rent",
    "Month" : 2,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent22018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 2,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent32017" : {
    "Amount" : 2161.55,
    "Category" : "Mortgage & Rent",
    "Month" : 3,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent32018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 3,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent42017" : {
    "Amount" : 2161.55,
    "Category" : "Mortgage & Rent",
    "Month" : 4,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent42018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 4,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent52017" : {
    "Amount" : 2161.55,
    "Category" : "Mortgage & Rent",
    "Month" : 5,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent52018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 5,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent62017" : {
    "Amount" : 2161.55,
    "Category" : "Mortgage & Rent",
    "Month" : 6,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent62018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 6,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent72017" : {
    "Amount" : 2161.55,
    "Category" : "Mortgage & Rent",
    "Month" : 7,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent72018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 7,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent82017" : {
    "Amount" : 2161.55,
    "Category" : "Mortgage & Rent",
    "Month" : 8,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent82018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 8,
    "Year" : 2018
  },
  "Mortgage%20%26%20Rent92017" : {
    "Amount" : 2161.55,
    "Category" : "Mortgage & Rent",
    "Month" : 9,
    "Year" : 2017
  },
  "Mortgage%20%26%20Rent92018" : {
    "Amount" : 2193.36,
    "Category" : "Mortgage & Rent",
    "Month" : 9,
    "Year" : 2018
  },
  "Paycheck102017" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 10,
    "Year" : 2017
  },
  "Paycheck102018" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 10,
    "Year" : 2018
  },
  "Paycheck112017" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 11,
    "Year" : 2017
  },
  "Paycheck112018" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 11,
    "Year" : 2018
  },
  "Paycheck12017" : {
    "Amount" : 7958.8,
    "Category" : "Paycheck",
    "Month" : 1,
    "Year" : 2017
  },
  "Paycheck12018" : {
    "Amount" : 7958.8,
    "Category" : "Paycheck",
    "Month" : 1,
    "Year" : 2018
  },
  "Paycheck122017" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 12,
    "Year" : 2017
  },
  "Paycheck122018" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 12,
    "Year" : 2018
  },
  "Paycheck22017" : {
    "Amount" : 7958.8,
    "Category" : "Paycheck",
    "Month" : 2,
    "Year" : 2017
  },
  "Paycheck22018" : {
    "Amount" : 7958.8,
    "Category" : "Paycheck",
    "Month" : 2,
    "Year" : 2018
  },
  "Paycheck32017" : {
    "Amount" : 7958.8,
    "Category" : "Paycheck",
    "Month" : 3,
    "Year" : 2017
  },
  "Paycheck32018" : {
    "Amount" : 7958.8,
    "Category" : "Paycheck",
    "Month" : 3,
    "Year" : 2018
  },
  "Paycheck42017" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 4,
    "Year" : 2017
  },
  "Paycheck42018" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 4,
    "Year" : 2018
  },
  "Paycheck52017" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 5,
    "Year" : 2017
  },
  "Paycheck52018" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 5,
    "Year" : 2018
  },
  "Paycheck62017" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 6,
    "Year" : 2017
  },
  "Paycheck62018" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 6,
    "Year" : 2018
  },
  "Paycheck72017" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 7,
    "Year" : 2017
  },
  "Paycheck72018" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 7,
    "Year" : 2018
  },
  "Paycheck82017" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 8,
    "Year" : 2017
  },
  "Paycheck82018" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 8,
    "Year" : 2018
  },
  "Paycheck92017" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 9,
    "Year" : 2017
  },
  "Paycheck92018" : {
    "Amount" : 8231.64,
    "Category" : "Paycheck",
    "Month" : 9,
    "Year" : 2018
  },
  "Pharmacy102017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 10,
    "Year" : 2017
  },
  "Pharmacy102018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 10,
    "Year" : 2018
  },
  "Pharmacy112017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 11,
    "Year" : 2017
  },
  "Pharmacy112018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 11,
    "Year" : 2018
  },
  "Pharmacy12017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 1,
    "Year" : 2017
  },
  "Pharmacy12018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 1,
    "Year" : 2018
  },
  "Pharmacy122017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 12,
    "Year" : 2017
  },
  "Pharmacy122018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 12,
    "Year" : 2018
  },
  "Pharmacy22017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 2,
    "Year" : 2017
  },
  "Pharmacy22018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 2,
    "Year" : 2018
  },
  "Pharmacy32017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 3,
    "Year" : 2017
  },
  "Pharmacy32018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 3,
    "Year" : 2018
  },
  "Pharmacy42017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 4,
    "Year" : 2017
  },
  "Pharmacy42018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 4,
    "Year" : 2018
  },
  "Pharmacy52017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 5,
    "Year" : 2017
  },
  "Pharmacy52018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 5,
    "Year" : 2018
  },
  "Pharmacy62017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 6,
    "Year" : 2017
  },
  "Pharmacy62018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 6,
    "Year" : 2018
  },
  "Pharmacy72017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 7,
    "Year" : 2017
  },
  "Pharmacy72018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 7,
    "Year" : 2018
  },
  "Pharmacy82017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 8,
    "Year" : 2017
  },
  "Pharmacy82018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 8,
    "Year" : 2018
  },
  "Pharmacy92017" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 9,
    "Year" : 2017
  },
  "Pharmacy92018" : {
    "Amount" : 40,
    "Category" : "Pharmacy",
    "Month" : 9,
    "Year" : 2018
  },
  "Restaurants102017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 10,
    "Year" : 2017
  },
  "Restaurants102018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 10,
    "Year" : 2018
  },
  "Restaurants112017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 11,
    "Year" : 2017
  },
  "Restaurants112018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 11,
    "Year" : 2018
  },
  "Restaurants12017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 1,
    "Year" : 2017
  },
  "Restaurants12018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 1,
    "Year" : 2018
  },
  "Restaurants122017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 12,
    "Year" : 2017
  },
  "Restaurants122018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 12,
    "Year" : 2018
  },
  "Restaurants22017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 2,
    "Year" : 2017
  },
  "Restaurants22018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 2,
    "Year" : 2018
  },
  "Restaurants32017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 3,
    "Year" : 2017
  },
  "Restaurants32018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 3,
    "Year" : 2018
  },
  "Restaurants42017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 4,
    "Year" : 2017
  },
  "Restaurants42018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 4,
    "Year" : 2018
  },
  "Restaurants52017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 5,
    "Year" : 2017
  },
  "Restaurants52018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 5,
    "Year" : 2018
  },
  "Restaurants62017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 6,
    "Year" : 2017
  },
  "Restaurants62018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 6,
    "Year" : 2018
  },
  "Restaurants72017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 7,
    "Year" : 2017
  },
  "Restaurants72018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 7,
    "Year" : 2018
  },
  "Restaurants82017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 8,
    "Year" : 2017
  },
  "Restaurants82018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 8,
    "Year" : 2018
  },
  "Restaurants92017" : {
    "Amount" : 200,
    "Category" : "Restaurants",
    "Month" : 9,
    "Year" : 2017
  },
  "Restaurants92018" : {
    "Amount" : 250,
    "Category" : "Restaurants",
    "Month" : 9,
    "Year" : 2018
  },
  "Service%20%26%20Parts102017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 10,
    "Year" : 2017
  },
  "Service%20%26%20Parts102018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 10,
    "Year" : 2018
  },
  "Service%20%26%20Parts112017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 11,
    "Year" : 2017
  },
  "Service%20%26%20Parts112018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 11,
    "Year" : 2018
  },
  "Service%20%26%20Parts12017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 1,
    "Year" : 2017
  },
  "Service%20%26%20Parts12018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 1,
    "Year" : 2018
  },
  "Service%20%26%20Parts122017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 12,
    "Year" : 2017
  },
  "Service%20%26%20Parts122018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 12,
    "Year" : 2018
  },
  "Service%20%26%20Parts22017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 2,
    "Year" : 2017
  },
  "Service%20%26%20Parts22018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 2,
    "Year" : 2018
  },
  "Service%20%26%20Parts32017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 3,
    "Year" : 2017
  },
  "Service%20%26%20Parts32018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 3,
    "Year" : 2018
  },
  "Service%20%26%20Parts42017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 4,
    "Year" : 2017
  },
  "Service%20%26%20Parts42018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 4,
    "Year" : 2018
  },
  "Service%20%26%20Parts52017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 5,
    "Year" : 2017
  },
  "Service%20%26%20Parts52018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 5,
    "Year" : 2018
  },
  "Service%20%26%20Parts62017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 6,
    "Year" : 2017
  },
  "Service%20%26%20Parts62018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 6,
    "Year" : 2018
  },
  "Service%20%26%20Parts72017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 7,
    "Year" : 2017
  },
  "Service%20%26%20Parts72018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 7,
    "Year" : 2018
  },
  "Service%20%26%20Parts82017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 8,
    "Year" : 2017
  },
  "Service%20%26%20Parts82018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 8,
    "Year" : 2018
  },
  "Service%20%26%20Parts92017" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 9,
    "Year" : 2017
  },
  "Service%20%26%20Parts92018" : {
    "Amount" : 50,
    "Category" : "Service & Parts",
    "Month" : 9,
    "Year" : 2018
  },
  "Shopping102017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 10,
    "Year" : 2017
  },
  "Shopping102018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 10,
    "Year" : 2018
  },
  "Shopping112017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 11,
    "Year" : 2017
  },
  "Shopping112018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 11,
    "Year" : 2018
  },
  "Shopping12017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 1,
    "Year" : 2017
  },
  "Shopping12018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 1,
    "Year" : 2018
  },
  "Shopping122017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 12,
    "Year" : 2017
  },
  "Shopping122018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 12,
    "Year" : 2018
  },
  "Shopping22017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 2,
    "Year" : 2017
  },
  "Shopping22018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 2,
    "Year" : 2018
  },
  "Shopping32017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 3,
    "Year" : 2017
  },
  "Shopping32018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 3,
    "Year" : 2018
  },
  "Shopping42017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 4,
    "Year" : 2017
  },
  "Shopping42018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 4,
    "Year" : 2018
  },
  "Shopping52017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 5,
    "Year" : 2017
  },
  "Shopping52018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 5,
    "Year" : 2018
  },
  "Shopping62017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 6,
    "Year" : 2017
  },
  "Shopping62018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 6,
    "Year" : 2018
  },
  "Shopping72017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 7,
    "Year" : 2017
  },
  "Shopping72018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 7,
    "Year" : 2018
  },
  "Shopping82017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 8,
    "Year" : 2017
  },
  "Shopping82018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 8,
    "Year" : 2018
  },
  "Shopping92017" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 9,
    "Year" : 2017
  },
  "Shopping92018" : {
    "Amount" : 200,
    "Category" : "Shopping",
    "Month" : 9,
    "Year" : 2018
  },
  "Summer%20Camp102017" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 10,
    "Year" : 2017
  },
  "Summer%20Camp102018" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 10,
    "Year" : 2018
  },
  "Summer%20Camp112017" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 11,
    "Year" : 2017
  },
  "Summer%20Camp112018" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 11,
    "Year" : 2018
  },
  "Summer%20Camp12017" : {
    "Amount" : 938,
    "Category" : "Summer Camp",
    "Month" : 1,
    "Year" : 2017
  },
  "Summer%20Camp12018" : {
    "Amount" : 938,
    "Category" : "Summer Camp",
    "Month" : 1,
    "Year" : 2018
  },
  "Summer%20Camp122017" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 12,
    "Year" : 2017
  },
  "Summer%20Camp122018" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 12,
    "Year" : 2018
  },
  "Summer%20Camp22017" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 2,
    "Year" : 2017
  },
  "Summer%20Camp22018" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 2,
    "Year" : 2018
  },
  "Summer%20Camp32017" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 3,
    "Year" : 2017
  },
  "Summer%20Camp32018" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 3,
    "Year" : 2018
  },
  "Summer%20Camp42017" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 4,
    "Year" : 2017
  },
  "Summer%20Camp42018" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 4,
    "Year" : 2018
  },
  "Summer%20Camp52017" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 5,
    "Year" : 2017
  },
  "Summer%20Camp52018" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 5,
    "Year" : 2018
  },
  "Summer%20Camp62017" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 6,
    "Year" : 2017
  },
  "Summer%20Camp62018" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 6,
    "Year" : 2018
  },
  "Summer%20Camp72017" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 7,
    "Year" : 2017
  },
  "Summer%20Camp72018" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 7,
    "Year" : 2018
  },
  "Summer%20Camp82017" : {
    "Amount" : 1005,
    "Category" : "Summer Camp",
    "Month" : 8,
    "Year" : 2017
  },
  "Summer%20Camp82018" : {
    "Amount" : 1005,
    "Category" : "Summer Camp",
    "Month" : 8,
    "Year" : 2018
  },
  "Summer%20Camp92017" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 9,
    "Year" : 2017
  },
  "Summer%20Camp92018" : {
    "Amount" : 0,
    "Category" : "Summer Camp",
    "Month" : 9,
    "Year" : 2018
  },
  "Utilities102017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 10,
    "Year" : 2017
  },
  "Utilities102018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 10,
    "Year" : 2018
  },
  "Utilities112017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 11,
    "Year" : 2017
  },
  "Utilities112018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 11,
    "Year" : 2018
  },
  "Utilities12017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 1,
    "Year" : 2017
  },
  "Utilities12018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 1,
    "Year" : 2018
  },
  "Utilities122017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 12,
    "Year" : 2017
  },
  "Utilities122018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 12,
    "Year" : 2018
  },
  "Utilities22017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 2,
    "Year" : 2017
  },
  "Utilities22018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 2,
    "Year" : 2018
  },
  "Utilities32017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 3,
    "Year" : 2017
  },
  "Utilities32018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 3,
    "Year" : 2018
  },
  "Utilities42017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 4,
    "Year" : 2017
  },
  "Utilities42018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 4,
    "Year" : 2018
  },
  "Utilities52017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 5,
    "Year" : 2017
  },
  "Utilities52018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 5,
    "Year" : 2018
  },
  "Utilities62017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 6,
    "Year" : 2017
  },
  "Utilities62018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 6,
    "Year" : 2018
  },
  "Utilities72017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 7,
    "Year" : 2017
  },
  "Utilities72018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 7,
    "Year" : 2018
  },
  "Utilities82017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 8,
    "Year" : 2017
  },
  "Utilities82018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 8,
    "Year" : 2018
  },
  "Utilities92017" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 9,
    "Year" : 2017
  },
  "Utilities92018" : {
    "Amount" : 200,
    "Category" : "Utilities",
    "Month" : 9,
    "Year" : 2018
  },
  "Vacation102017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 10,
    "Year" : 2017
  },
  "Vacation102018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 10,
    "Year" : 2018
  },
  "Vacation112017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 11,
    "Year" : 2017
  },
  "Vacation112018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 11,
    "Year" : 2018
  },
  "Vacation12017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 1,
    "Year" : 2017
  },
  "Vacation12018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 1,
    "Year" : 2018
  },
  "Vacation122017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 12,
    "Year" : 2017
  },
  "Vacation122018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 12,
    "Year" : 2018
  },
  "Vacation22017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 2,
    "Year" : 2017
  },
  "Vacation22018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 2,
    "Year" : 2018
  },
  "Vacation32017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 3,
    "Year" : 2017
  },
  "Vacation32018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 3,
    "Year" : 2018
  },
  "Vacation42017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 4,
    "Year" : 2017
  },
  "Vacation42018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 4,
    "Year" : 2018
  },
  "Vacation52017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 5,
    "Year" : 2017
  },
  "Vacation52018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 5,
    "Year" : 2018
  },
  "Vacation62017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 6,
    "Year" : 2017
  },
  "Vacation62018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 6,
    "Year" : 2018
  },
  "Vacation72017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 7,
    "Year" : 2017
  },
  "Vacation72018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 7,
    "Year" : 2018
  },
  "Vacation82017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 8,
    "Year" : 2017
  },
  "Vacation82018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 8,
    "Year" : 2018
  },
  "Vacation92017" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 9,
    "Year" : 2017
  },
  "Vacation92018" : {
    "Amount" : 400,
    "Category" : "Vacation",
    "Month" : 9,
    "Year" : 2018
  },
  "Water%20Bill102017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 10,
    "Year" : 2017
  },
  "Water%20Bill102018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 10,
    "Year" : 2018
  },
  "Water%20Bill112017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 11,
    "Year" : 2017
  },
  "Water%20Bill112018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 11,
    "Year" : 2018
  },
  "Water%20Bill12017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 1,
    "Year" : 2017
  },
  "Water%20Bill12018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 1,
    "Year" : 2018
  },
  "Water%20Bill122017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 12,
    "Year" : 2017
  },
  "Water%20Bill122018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 12,
    "Year" : 2018
  },
  "Water%20Bill22017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 2,
    "Year" : 2017
  },
  "Water%20Bill22018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 2,
    "Year" : 2018
  },
  "Water%20Bill32017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 3,
    "Year" : 2017
  },
  "Water%20Bill32018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 3,
    "Year" : 2018
  },
  "Water%20Bill42017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 4,
    "Year" : 2017
  },
  "Water%20Bill42018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 4,
    "Year" : 2018
  },
  "Water%20Bill52017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 5,
    "Year" : 2017
  },
  "Water%20Bill52018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 5,
    "Year" : 2018
  },
  "Water%20Bill62017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 6,
    "Year" : 2017
  },
  "Water%20Bill62018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 6,
    "Year" : 2018
  },
  "Water%20Bill72017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 7,
    "Year" : 2017
  },
  "Water%20Bill72018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 7,
    "Year" : 2018
  },
  "Water%20Bill82017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 8,
    "Year" : 2017
  },
  "Water%20Bill82018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 8,
    "Year" : 2018
  },
  "Water%20Bill92017" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 9,
    "Year" : 2017
  },
  "Water%20Bill92018" : {
    "Amount" : 30,
    "Category" : "Water Bill",
    "Month" : 9,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains102017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 10,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains102018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 10,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains112017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 11,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains112018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 11,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains12017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 1,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains12018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 1,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains122017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 12,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains122018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 12,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains22017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 2,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains22018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 2,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains32017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 3,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains32018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 3,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains42017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 4,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains42018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 4,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains52017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 5,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains52018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 5,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains62017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 6,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains62018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 6,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains72017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 7,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains72018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 7,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains82017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 8,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains82018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 8,
    "Year" : 2018
  },
  "Web%20Hosting%2FDomains92017" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 9,
    "Year" : 2017
  },
  "Web%20Hosting%2FDomains92018" : {
    "Amount" : 12,
    "Category" : "Web Hosting/Domains",
    "Month" : 9,
    "Year" : 2018
  },
  "Weekend%20Activities102017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 10,
    "Year" : 2017
  },
  "Weekend%20Activities102018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 10,
    "Year" : 2018
  },
  "Weekend%20Activities112017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 11,
    "Year" : 2017
  },
  "Weekend%20Activities112018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 11,
    "Year" : 2018
  },
  "Weekend%20Activities12017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 1,
    "Year" : 2017
  },
  "Weekend%20Activities12018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 1,
    "Year" : 2018
  },
  "Weekend%20Activities122017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 12,
    "Year" : 2017
  },
  "Weekend%20Activities122018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 12,
    "Year" : 2018
  },
  "Weekend%20Activities22017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 2,
    "Year" : 2017
  },
  "Weekend%20Activities22018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 2,
    "Year" : 2018
  },
  "Weekend%20Activities32017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 3,
    "Year" : 2017
  },
  "Weekend%20Activities32018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 3,
    "Year" : 2018
  },
  "Weekend%20Activities42017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 4,
    "Year" : 2017
  },
  "Weekend%20Activities42018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 4,
    "Year" : 2018
  },
  "Weekend%20Activities52017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 5,
    "Year" : 2017
  },
  "Weekend%20Activities52018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 5,
    "Year" : 2018
  },
  "Weekend%20Activities62017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 6,
    "Year" : 2017
  },
  "Weekend%20Activities62018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 6,
    "Year" : 2018
  },
  "Weekend%20Activities72017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 7,
    "Year" : 2017
  },
  "Weekend%20Activities72018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 7,
    "Year" : 2018
  },
  "Weekend%20Activities82017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 8,
    "Year" : 2017
  },
  "Weekend%20Activities82018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 8,
    "Year" : 2018
  },
  "Weekend%20Activities92017" : {
    "Amount" : 125,
    "Category" : "Weekend Activities",
    "Month" : 9,
    "Year" : 2017
  },
  "Weekend%20Activities92018" : {
    "Amount" : 150,
    "Category" : "Weekend Activities",
    "Month" : 9,
    "Year" : 2018
  }
};

export default BudgetTable;