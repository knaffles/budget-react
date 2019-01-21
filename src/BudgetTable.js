import React from 'react';
import BudgetRow from './BudgetRow';

class BudgetTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      amounts: [], // TODO Replace with call to firebase to load data. See componentDidMounts
      year: this.props.year,
    }

    this.state.amounts = sampleAmounts;
    this.categoryArray = [];
  }

  componentWillMount() {
    // Loop through all entries and construct an array of unique budget
    // categories.
    // categoryArray = getUniqueCategories(this.state.amounts);
    this.categoryArray = [
      'Category One',
      'Category Two',
      'Category Three',
    ];
  }

  componentDidMount() {
    // TODO this is where fetch the amounts from firebase.
    // See docs where it says data should be loaded in componentDidMount:
    // https://reactjs.org/docs/react-component.html#componentdidmount
  }

  // Given a category, get all the amounts for that category.
  getAmountsByCategory(category) {
    // TODO Replace with code.
    const amountsByCategory = [
      {
        "Category": "Auto Insurance",
        "Month": "1",
        "Amount": "80.00",
        "Year": "2017"
      },
      {
        "Category": "Auto Insurance",
        "Month": "2",
        "Amount": "90.00",
        "Year": "2017"
      },
      {
        "Category": "Auto Insurance",
        "Month": "3",
        "Amount": "60.00",
        "Year": "2017"
      },
    ];

    return amountsByCategory;
  }

  render() {
    const monthArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const monthTotals = [];
    let grandTotal = 0;

    for (var month = 1; month <= 12; month++) {
      const total = this.state.amounts.reduce(function(acc, currValue) {
        if (parseInt(currValue.Month) === month) {
          return parseInt(currValue.Amount) + acc;
        }
        else {
          return acc;
        }
      }, 0);

      monthTotals.push({ month: month, amount: total});

      grandTotal += total;
    }

    const getMonthTotals = month => {
      const result = monthTotals.filter(item => {
        return (parseInt(item.month) === parseInt(month));
      })

      if (result.length > 0) {
        var thisAmount = parseInt(result[0].amount);
        return result[0].amount;
      } else {
        return 0;
      }
    }


    return (
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
            <BudgetRow
              category={ key }
              amounts={ this.getAmountsByCategory(key) }
              key={ key }/>
          )}
          <tr>
            <td>Totals:</td>
            { monthArray.map(key => 
              <td key={ key }>{ getMonthTotals(key) }</td>
            )}
            <td>{ grandTotal }</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const sampleAmounts = [
  {
    "Category": "Auto Insurance",
    "Month": "1",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "1",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "1",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "1",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "1",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "1",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "1",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "1",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "1",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "1",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "1",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "1",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "1",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "1",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "1",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "1",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "1",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "1",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "1",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "1",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "1",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "1",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "1",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "1",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "1",
    "Amount": "984.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "1",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "1",
    "Amount": "938.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "1",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "1",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "1",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "1",
    "Amount": "950.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "1",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "1",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Auto Insurance",
    "Month": "2",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "2",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "2",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "2",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "2",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "2",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "2",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "2",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "2",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "2",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "2",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "2",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "2",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "2",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "2",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "2",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "2",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "2",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "2",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "2",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "2",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "2",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "2",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "2",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "2",
    "Amount": "984.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "2",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "2",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "2",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "2",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "2",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "2",
    "Amount": "350.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "2",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "2",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Auto Insurance",
    "Month": "3",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "3",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "3",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "3",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "3",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "3",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "3",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "3",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "3",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "3",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "3",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "3",
    "Amount": "325.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "3",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "3",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "3",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "3",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "3",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "3",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "3",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "3",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "3",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "3",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "3",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "3",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "3",
    "Amount": "984.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "3",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "3",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "3",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "3",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "3",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "3",
    "Amount": "350.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "3",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "3",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Auto Insurance",
    "Month": "4",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "4",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "4",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "4",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "4",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "4",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "4",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "4",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "4",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "4",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "4",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "4",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "4",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "4",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "4",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "4",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "4",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "4",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "4",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "4",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "4",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "4",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "4",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "4",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "4",
    "Amount": "984.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "4",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "4",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "4",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "4",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "4",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "4",
    "Amount": "350.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "4",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "4",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Auto Insurance",
    "Month": "5",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "5",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "5",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "5",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "5",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "5",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "5",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "5",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "5",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "5",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "5",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "5",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "5",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "5",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "5",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "5",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "5",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "5",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "5",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "5",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "5",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "5",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "5",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "5",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "5",
    "Amount": "984.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "5",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "5",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "5",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "5",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "5",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "5",
    "Amount": "350.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "5",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "5",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Auto Insurance",
    "Month": "6",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "6",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "6",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "6",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "6",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "6",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "6",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "6",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "6",
    "Amount": "55.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "6",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "6",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "6",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "6",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "6",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "6",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "6",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "6",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "6",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "6",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "6",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "6",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "6",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "6",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "6",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "6",
    "Amount": "984.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "6",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "6",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "6",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "6",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "6",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "6",
    "Amount": "350.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "6",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "6",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Auto Insurance",
    "Month": "7",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "7",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "7",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "7",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "7",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "7",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "7",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "7",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "7",
    "Amount": "55.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "7",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "7",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "7",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "7",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "7",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "7",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "7",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "7",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "7",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "7",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "7",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "7",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "7",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "7",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "7",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "7",
    "Amount": "984.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "7",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "7",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "7",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "7",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "7",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "7",
    "Amount": "350.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "7",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "7",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Auto Insurance",
    "Month": "8",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "8",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "8",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "8",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "8",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "8",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "8",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "8",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "8",
    "Amount": "55.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "8",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "8",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "8",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "8",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "8",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "8",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "8",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "8",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "8",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "8",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "8",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "8",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "8",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "8",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "8",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "8",
    "Amount": "984.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "8",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "8",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "8",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "8",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "8",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "8",
    "Amount": "1050.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "8",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "8",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Auto Insurance",
    "Month": "9",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "9",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "9",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "9",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "9",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "9",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "9",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "9",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "9",
    "Amount": "55.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "9",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "9",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "9",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "9",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "9",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "9",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "9",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "9",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "9",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "9",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "9",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "9",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "9",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "9",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "9",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "9",
    "Amount": "984.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "9",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "9",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "9",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "9",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "9",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "9",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "9",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "9",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Auto Insurance",
    "Month": "10",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "10",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "10",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "10",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "10",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "10",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "10",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "10",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "10",
    "Amount": "55.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "10",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "10",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "10",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "10",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "10",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "10",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "10",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "10",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "10",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "10",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "10",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "10",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "10",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "10",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "10",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "10",
    "Amount": "984.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "10",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "10",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "10",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "10",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "10",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "10",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "10",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "10",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Auto Insurance",
    "Month": "11",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "11",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "11",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "11",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "11",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "11",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "11",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "11",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "11",
    "Amount": "55.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "11",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "11",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "11",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "11",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "11",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "11",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "11",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "11",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "11",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "11",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "11",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "11",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "11",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "11",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "11",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "11",
    "Amount": "984.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "11",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "11",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "11",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "11",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "11",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "11",
    "Amount": "700.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "11",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "11",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Auto Insurance",
    "Month": "12",
    "Amount": "80.00",
    "Year": "2017"
  },
  {
    "Category": "Gas & Fuel",
    "Month": "12",
    "Amount": "70.00",
    "Year": "2017"
  },
  {
    "Category": "Service & Parts",
    "Month": "12",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Internet",
    "Month": "12",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Mobile Phone",
    "Month": "12",
    "Amount": "102.00",
    "Year": "2017"
  },
  {
    "Category": "Utilities",
    "Month": "12",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Water Bill",
    "Month": "12",
    "Amount": "30.00",
    "Year": "2017"
  },
  {
    "Category": "Web Hosting/Domains",
    "Month": "12",
    "Amount": "12.00",
    "Year": "2017"
  },
  {
    "Category": "Creative Cloud",
    "Month": "12",
    "Amount": "55.00",
    "Year": "2017"
  },
  {
    "Category": "Emergency",
    "Month": "12",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Entertainment",
    "Month": "12",
    "Amount": "250.00",
    "Year": "2017"
  },
  {
    "Category": "Life Insurance",
    "Month": "12",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Groceries",
    "Month": "12",
    "Amount": "800.00",
    "Year": "2017"
  },
  {
    "Category": "Restaurants",
    "Month": "12",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Charity",
    "Month": "12",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Christmas Gifts",
    "Month": "12",
    "Amount": "58.00",
    "Year": "2017"
  },
  {
    "Category": "Gift",
    "Month": "12",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Doctor",
    "Month": "12",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Pharmacy",
    "Month": "12",
    "Amount": "40.00",
    "Year": "2017"
  },
  {
    "Category": "Home Improvement",
    "Month": "12",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Home Supplies",
    "Month": "12",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Major Repair/Upgrade",
    "Month": "12",
    "Amount": "500.00",
    "Year": "2017"
  },
  {
    "Category": "Mortgage & Rent",
    "Month": "12",
    "Amount": "2161.55",
    "Year": "2017"
  },
  {
    "Category": "Computer",
    "Month": "12",
    "Amount": "50.00",
    "Year": "2017"
  },
  {
    "Category": "Babysitter & Daycare",
    "Month": "12",
    "Amount": "-4,016.00",
    "Year": "2017"
  },
  {
    "Category": "Birthday Parties",
    "Month": "12",
    "Amount": "83.00",
    "Year": "2017"
  },
  {
    "Category": "Summer Camp",
    "Month": "12",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Weekend Activities",
    "Month": "12",
    "Amount": "100.00",
    "Year": "2017"
  },
  {
    "Category": "Misc Expenses",
    "Month": "12",
    "Amount": "150.00",
    "Year": "2017"
  },
  {
    "Category": "Shopping",
    "Month": "12",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "Vacation",
    "Month": "12",
    "Amount": "0.00",
    "Year": "2017"
  },
  {
    "Category": "Cash & ATM",
    "Month": "12",
    "Amount": "200.00",
    "Year": "2017"
  },
  {
    "Category": "IRA Contribution",
    "Month": "12",
    "Amount": "5,500.00",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "1",
    "Amount": "7958.80",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "2",
    "Amount": "7958.80",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "3",
    "Amount": "7958.80",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "4",
    "Amount": "8231.64",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "5",
    "Amount": "8231.64",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "6",
    "Amount": "8231.64",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "7",
    "Amount": "8231.64",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "8",
    "Amount": "8231.64",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "9",
    "Amount": "8231.64",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "10",
    "Amount": "8231.64",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "11",
    "Amount": "8231.64",
    "Year": "2017"
  },
  {
    "Category": "Paycheck",
    "Month": "12",
    "Amount": "8231.64",
    "Year": "2017"
  }
];

export default BudgetTable;