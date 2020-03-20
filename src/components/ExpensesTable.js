import React from 'react';
// import BudgetModel from '../lib/BudgetModel';
// import TransactionsModel from '../lib/TransactionsModel';
// import CategoryLookup from '../lib/Categories';
import * as Helpers from '../lib/Helpers';
// import base from "../base";

class ExpensesTable extends React.Component {

  constructor(props) {
    super(props);

    this.dataSet  = this.props.data;
    this.month    = this.props.month;
    this.year     = this.props.year;
    this.type     = this.props.type;
    this.rows     = [];
  }

  render() {
    const total = {
      budget:         0,
      actual:         0,
      difference:     0,
      YTD:            0,
      budgetYTD:      0,
      differenceYTD:  0
    };

    for (var i = 0; i < this.dataSet.length; i++) {
      const category      = this.dataSet[i].category,
          fullCategory    = this.dataSet[i].fullCategory,
          budget          = this.dataSet[i].budget,
          actual          = this.dataSet[i].sum,
          difference      = this.dataSet[i].difference,
          YTD             = this.dataSet[i].YTD,
          budgetYTD       = this.dataSet[i].budgetYTD,
          differenceYTD   = this.dataSet[i].differenceYTD;

      const categoryLink = Helpers.buildCategoryLink(category, fullCategory, this.month, this.year);

      total.budget        += budget;
      total.actual        += actual;
      total.difference    += difference;
      total.YTD           += YTD;
      total.budgetYTD     += budgetYTD;
      total.differenceYTD += differenceYTD;

      const row = {};
      row.categoryLink  = categoryLink;
      row.budget        = Helpers.formatData(budget);
      row.actual        = Helpers.formatData(actual);
      row.difference    = Helpers.formatData(difference);
      row.budgetYTD     = Helpers.formatData(budgetYTD);
      row.YTD           = Helpers.formatData(YTD);
      row.differenceYTD = Helpers.formatData(differenceYTD);

      this.rows.push(row);
    }

    // let totals = '<tr class="totals"></tr>';
    // totals += '<td>TOTAL</td>';
    // totals += '<td>' + Helpers.formatData(total.budget)        + '</td>';
    // totals += '<td>' + Helpers.formatData(total.actual)        + '</td>';
    // totals += '<td>' + Helpers.formatData(total.difference)    + '</td>';
    // totals += '<td>' + Helpers.formatData(total.budgetYTD)     + '</td>';
    // totals += '<td>' + Helpers.formatData(total.YTD)           + '</td>';
    // totals += '<td>' + Helpers.formatData(total.differenceYTD) + '</td>';

    // this.rows.push(totals);

    console.log(this.rows);

    return (
      <table id={ this.props.type }>
        <tbody>
          { this.rows.map((item, index) =>
            <tr key={ index }>
              <td dangerouslySetInnerHTML={{ __html: item.categoryLink }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.budget }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.actual }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.difference }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.budgetYTD }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.YTD }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.differenceYTD }}></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default ExpensesTable;
