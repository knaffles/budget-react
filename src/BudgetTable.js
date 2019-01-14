import React from 'react';
import BudgetRow from './BudgetRow';

class BudgetTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      year: this.props.year,
    }
  }

  render() {
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
          <BudgetRow category="testCat" />
        </tbody>
      </table>
    );
  }
}

export default BudgetTable;