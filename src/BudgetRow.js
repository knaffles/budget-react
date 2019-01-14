import React from 'react';

const monthArray = [
  'month1',
  'month2',
  'month3',
  'month4',
  'month5',
  'month6',
  'month7',
  'month8',
  'month9',
  'month10',
  'month11',
  'month12'
];

class BudgetRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month1: 100,
      month2: 150,
      month3: 100,
      month4: 175,
      month5: 175,
      month6: 175,
      month7: 175,
      month8: 175,
      month9: 175,
      month10: 175,
      month11: 175,
      month12: 175,
    }
  }

  calcRowTotal = () => {
    let total = 0;

    monthArray.map(key => {
      total += this.state[key];  
    });

    return total;
  }

  render() {
    return (
      <tr>
        <td>{ this.props.category }</td>
        { monthArray.map(key =>
          <td key={ key }>{ this.state[key] }</td>
        )}
        <td>{ this.calcRowTotal() }</td>
      </tr>
    );
  }
}

export default BudgetRow;