import React from 'react';
import {render} from 'react-dom';

//import react router deps
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

//import components
import App from './components/App';
import Graph from './components/Graph';
import DistributionGraph from './components/DistributionGraph';
//other imports
import {Provider} from 'react-redux';
import store from './store';
import {history} from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Graph}></IndexRoute>
        <Route path="/spread_distribution" component={DistributionGraph}></Route>
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
