import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Budget from './Budget';
//import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route exact path="/" component={Login} /> */}
      <Route path="/budget" component={Budget} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;