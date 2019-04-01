import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BudgetPage from './BudgetPage';
import ExpensesPage from './ExpensesPage';
//import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route exact path="/" component={Login} /> */}
      <Route path="/budget" component={BudgetPage} />
      <Route path="/expenses" component={ExpensesPage} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;