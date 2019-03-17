import React from 'react';

const monthArray = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12'
];

class BudgetRow extends React.Component {
  constructor(props) {
    super(props);

    this.categoryLookup = this.props.categoryLookup;
    this.category = this.props.category;
    this.year = this.props.year;
  }

  render() {
    let rowTotal = 0;

    // Find out if our category has a parent category.
    var catParent = this.categoryLookup.getParent(this.category);
    catParent = (!catParent) ? this.category : catParent;

    const getThisMonth = key => {
      const _this = this;
      const result = this.props.amounts.filter(item => {
        return (parseInt(item.Month) === parseInt(key) &&
                parseInt(item.Year) === parseInt(_this.props.year));
      })

      if (result.length > 0) {        
        var thisAmount = parseFloat(result[0].Amount);
        rowTotal += thisAmount;
        return result[0].Amount;
      } else {
        return 0;
      }
    }

    return (
      <tr>
        <td>{ catParent }: { this.props.category }</td>
        { monthArray.map(key =>
          <td key={ key } >{ getThisMonth(key) }</td>
        )}
        <td class="totals">{ rowTotal.toFixed(2) }</td>
      </tr>
    );
  }
}

export default BudgetRow;