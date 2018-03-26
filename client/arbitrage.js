import React from 'react';
import {render} from 'react-dom';

//import react router deps
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

//import components
import App from './components/App';
import Graph from './components/Graph';
import GraphicalData from './components/GraphicalData';
import SpreadTable from './components/SpreadTable';
import StatisticsData from './components/StatisticsData';
import ProfitabilityCalculator from './components/ProfitabilityCalculator';


//other imports
import {Provider} from 'react-redux';
import store from './store';
import {history} from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Graph}></IndexRoute>
        <Route path="/spread_distribution" component={GraphicalData}></Route>
        <Route path="/spread_table" component={SpreadTable}></Route>
        <Route path="/statistics" components={StatisticsData}></Route>
        <Route path="/calculator" components={ProfitabilityCalculator}></Route>
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
