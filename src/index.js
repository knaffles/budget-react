import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
// import './index.css';

render(<Router />, document.querySelector('#content'));

// if (module.hot) {
//   module.hot.accept();
// }