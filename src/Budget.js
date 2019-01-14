import React from 'react';
import BudgetTable from './BudgetTable';

class Budget extends React.Component {

  render() {
    const year = '2018';

    return (
      <BudgetTable year={ year } />
    );
  }

}

export default Budget;