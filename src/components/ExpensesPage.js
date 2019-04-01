import React from 'react';
import ExpensesTable from './ExpensesTable';
import CategoryLookup from '../lib/Categories';
import '../css/bootstrap/css/bootstrap.css';
import '../css/style.css';

class ExpensesPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const year = '2018';

    return (
      <ExpensesTable year={ year }/>
    )
  }

}

export default ExpensesPage;
