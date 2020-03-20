import ExpensesTable from './ExpensesTable';
import React from 'react';
import BudgetModel from '../lib/BudgetModel';
import TransactionsModel from '../lib/TransactionsModel';
import CategoryLookup from '../lib/Categories';
import * as Helpers from '../lib/Helpers';
import base from "../base";
import '../css/bootstrap/css/bootstrap.css';
import '../css/style.css';

class ExpensesPage extends React.Component {

  constructor(props) {
    super(props);

    const year = '2018';

    this.state = {
      budgetLoaded: false,
      categoriesLoaded: false,
      transactionsLoaded: false
    }

    this.budgetReady = this.budgetReady.bind(this);
    this.budgetModel = new BudgetModel(this.budgetReady);

    this.categoriesReady = this.categoriesReady.bind(this);
    this.categoryLookup = new CategoryLookup(this.categoriesReady);

    this.transactionsReady = this.transactionsReady.bind(this);
    this.transactionsModel = new TransactionsModel(this.transactionsReady);
  }

  budgetReady() {
    this.setState({ budgetLoaded: true });
  }

  categoriesReady() {
    this.setState({ categoriesLoaded: true });
  }

  transactionsReady() {
    this.setState({ transactionsLoaded: true });
  }

  render() {
    if (!this.state.categoriesLoaded ||
        !this.state.transactionsLoaded ||
        !this.state.budgetLoaded) {
      return null;
    }

    // TODO
    // for now, hardcode the filters.
    var filters = [
      {
        id: 'budget__month',
        val: 1,
        column: 'Month'
      },
      {
        id: 'budget__year',
        val: 2018,
        column: 'Year'
      },
    ];

    var budgetMonth       = 0,
        budgetYear        = 0,
        finalExpenses     = [],
        finalIncome       = [],
        finalNoBudget = [], // All categories which are not budgeted.
        finalEnvelope = []; // Envelope budgets.

    for (var key in filters) {
      if (filters[key].id == 'budget__month') {
        budgetMonth = parseInt(filters[key].val);
      }
      if (filters[key].id == 'budget__year') {
        budgetYear = parseInt(filters[key].val);
      }
    }

    // Get the list of all categories for this budget year.
    var categories = this.budgetModel.getCategoryList(budgetYear);

    // For each category in the budget:
    for (var i = 0; i < categories.length; i++) {
      var theCategory = categories[i];

      // Get the budget for this month/year
      var catBudget = this.budgetModel.getCategory(theCategory, budgetMonth, budgetYear);

      // Get the sum of all the transactions in this month/year
      var catActual = this.transactionsModel.getTransactionsInMonthYear(theCategory, budgetMonth, budgetYear);
      catActual = this.transactionsModel.getSum(catActual);

      // Get YTD budget up to this month/year
      var catBudgetYTD = this.budgetModel.getCategoryYTD(theCategory, budgetMonth, budgetYear);

      // Get the YTD transactions in this month/year
      var catActualYTD = this.transactionsModel.getTransactionsYTD(theCategory, budgetMonth, budgetYear);
      catActualYTD = this.transactionsModel.getSum(catActualYTD);
      
      // Is this Income or Expense?
      var catType = this.categoryLookup.getType(theCategory);
      
      // Get the parent category.
      var catParent = this.categoryLookup.getParent(theCategory);
      catParent = (!catParent) ? theCategory : catParent;

      var theFullCategory = catParent + ': ' + theCategory;

      // If this is an envelope budget, do some further processing.
      var catEnvelope = this.categoryLookup.isEnvelope(theCategory);
      if (catEnvelope) {
        // Calculate the entire year budget
        var envBudget = this.budgetModel.getCategoryYTD(theCategory, 12, budgetYear);

        // Calculate the amount spend YTD
        var envActualYTD = catActualYTD;

        // Calculat amount of envelope budget remaining.
        var envRemaining = envBudget - envActualYTD;

        // Calculate any overage
        var envOverage = 0;
        if (envActualYTD > envBudget) {
          envOverage = envBudget - envActualYTD;
        }

        // Reset actual and budget amounts for the Expenses table.
        catActual       = catBudget;
        catActualYTD    = catBudgetYTD;
        theFullCategory += ' (E)';

        // Push to the Envelope table.
        finalEnvelope.push({
          fullCategory: theFullCategory,
          category:     theCategory,
          YTD:          envActualYTD,
          budget:       envBudget,
          remaining:    envRemaining,
          overage:      envOverage
        });
      }

      // Calculate differences
      var catDiff = catBudget - catActual;
      var catDiffYTD = catBudgetYTD - catActualYTD;

      if (catType == 'Income') {
        // Add this data to finalIncome
        finalIncome.push({
          fullCategory:   theFullCategory,
          category:       theCategory,
          sum:            catActual,
          budget:         catBudget,
          difference:     -1 * catDiff,
          YTD:            catActualYTD,
          budgetYTD:      catBudgetYTD,
          differenceYTD:  -1 * catDiffYTD
        });
      } else if (catType == 'Expense') {
        // Add this data to finalExpenses
        finalExpenses.push({
          fullCategory:   theFullCategory,
          category:       theCategory,
          sum:            catActual,
          budget:         catBudget,
          difference:     catDiff,
          YTD:            catActualYTD,
          budgetYTD:      catBudgetYTD,
          differenceYTD:  catDiffYTD
        });        
      } else {
        // TODO - the category has no type
      }
    }

    // Get all the categories associated with transactions in this budget year.
    var allCategories = this.transactionsModel.getUniqueCategories(budgetMonth, budgetYear);

    // Loop through all those categories and test to see if they have an entry in finalExpenses.
    for (var i = 0; i < allCategories.length; i++) {
      // Is this an expense or income category.
      var categoryType = this.categoryLookup.getType(allCategories[i]);

      if (categoryType == 'Income') {
        var thisCategory = finalIncome.findIndex(function(element) {
          return element.category === allCategories[i];
        })
      } else {
        var thisCategory = finalExpenses.findIndex(function(element) {
          return element.category === allCategories[i];
        })
      }

      if (thisCategory < 0) {
        // Check to see if each one has a parent category that is in the budget
        // If so, add to the parent category
        // Find the category's parent
        var catParent = this.categoryLookup.getParent(allCategories[i]);
        var catActual = this.transactionsModel.getTransactionsInMonthYear(allCategories[i], budgetMonth, budgetYear);
        catActual = this.transactionsModel.getSum(catActual);

        if (catParent) {
          if (categoryType == 'Income') {
            var parentIndex = finalIncome.findIndex(function(element) {
              return element.category === catParent;
            });
          } else {
            var parentIndex = finalExpenses.findIndex(function(element) {
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
              fullCategory: catParent + ': ' + allCategories[i],
              category:     allCategories[i],
              sum:          catActual
            });
          }          
        } else {
          // This is a category with no parent that is not in the budget.
          // Put it in the "No Budget" table.
          finalNoBudget.push({
            fullCategory: allCategories[i] + ': ' + allCategories[i],
            category:     allCategories[i],
            sum:          catActual
          });
        }
      }
    }

    // Sort and then render.
    finalExpenses = this.transactionsModel.sort(finalExpenses, 'fullCategory');
    finalIncome   = this.transactionsModel.sort(finalIncome, 'fullCategory');
    finalEnvelope = this.transactionsModel.sort(finalEnvelope, 'fullCategory');

    console.log(finalExpenses);

    // this.renderBudgetTable(finalExpenses, budgetMonth, budgetYear, 'expenses');
    // this.renderBudgetTable(finalIncome, budgetMonth, budgetYear, 'income');
    // this.renderEnvelopeTable(finalEnvelope, budgetMonth, budgetYear);
    // this.renderNoBudgetTable(finalNoBudget, budgetMonth, budgetYear);

    // // Calculate income vs expense
    // // TODO come up with a better way to get these values
    // var expensesDiff  = parseFloat($('#expenses .totals td:nth-child(4)').text());
    // var incomeDiff    = parseFloat($('#income .totals td:nth-child(4)').text());
    // var totalDiff     = incomeDiff + expensesDiff;
    
    // var expensesDiffYTD  = parseFloat($('#expenses .totals td:nth-child(7)').text());
    // var incomeDiffYTD    = parseFloat($('#income .totals td:nth-child(7)').text());
    // var totalOverage     = parseFloat($('#envelope .totals td:last-child').text());
    // var totalDiffYTD     = incomeDiffYTD + expensesDiffYTD + totalOverage;

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

    return (
      <div>
        <h2>Expenses Table</h2>
        <ExpensesTable
          data={ finalExpenses }
          month={ budgetMonth }
          year={ budgetYear }
          type='expenses' />
      </div>
    );
  }

}

export default ExpensesPage;
