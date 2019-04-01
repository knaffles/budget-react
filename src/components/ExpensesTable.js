import React from 'react';
import BudgetModel from '../lib/BudgetModel';
import TransactionsModel from '../lib/TransactionsModel';
import CategoryLookup from '../lib/Categories';
import * as Helpers from '../lib/Helpers';
// import ExpensesRow from './ExpensesRow';
import base from "../base";

class ExpensesTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataLoaded: false
    }

    this.init = this.init.bind(this);
    this.categoryLookup = new CategoryLookup(this.init);
  }

  init() {
    this.setState({ dataLoaded: true });
  }

  render() {
    if (!this.state.dataLoaded) {
      return null;
    }

    return (
      <h2>Expenses Table</h2>
    );
  }
}

export default ExpensesTable;
