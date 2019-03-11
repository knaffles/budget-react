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
  }

  render() {
    let rowTotal = 0;

    // Find out if our category has a parent category.
    var catParent = this.categoryLookup.getParent(this.category);
    catParent = (!catParent) ? this.category : catParent;

    const getThisMonth = key => {
      const result = this.props.amounts.filter(item => {
        return (item.Month === key);
      })

      if (result.length > 0) {        
        var thisAmount = parseInt(result[0].Amount);
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
        <td>{ rowTotal }</td>
      </tr>
    );
  }
}

export default BudgetRow;