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
    this.changeBudget = this.props.changeBudget;
  }

  handleChange = (event, key) => {
    this.changeBudget(key, event.currentTarget.value);
  };

  render() {
    let rowTotal = 0;

    // Find out if our category has a parent category.
    var catParent = this.categoryLookup.getParent(this.category);
    catParent = (!catParent) ? this.category : catParent;

    const getThisMonth = month => {
      const _this = this;
      const result = this.props.amounts.filter(item => {
        return (parseInt(item.Month) === parseInt(month) &&
                parseInt(item.Year) === parseInt(_this.props.year));
      });

      if (result.length > 0) {        
        var thisAmount = parseFloat(result[0].Amount);
        rowTotal += thisAmount;

        return thisAmount;
      } else {
        return 0;
      }
    }

    const getThisKey = month => {
      const _this = this;
      const result = this.props.amounts.filter(item => {
        return (parseInt(item.Month) === parseInt(month) &&
                parseInt(item.Year) === parseInt(_this.props.year));
      });

      if (result.length > 0) {        
        var thisKey = result[0].nodeId;
        return thisKey;
      } else {
        return null;
      }
    }

    return (
      <tr>
        <td>{ catParent }: { this.props.category }</td>
        {/* TODO -- This is bad because we're calling getThisMonth multiple times. */}
        { monthArray.map(month =>
          <td key={ getThisKey(month) }>
            <input type="text" value={ getThisMonth(month) } onChange={(event) => this.handleChange(event, getThisKey(month)) } />
          </td>
        )}
        <td className="totals">{ rowTotal.toFixed(2) }</td>
      </tr>
    );
  }
}

export default BudgetRow;