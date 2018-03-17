import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

//import root reducer
import rootReducer from './reducers/index';

import current_courses from './data/currentCoursesInfo';
import points from './data/graphPoints';
import statistics from './data/statisticsData';


const defaultState = {
  graphPoints: points,
  currentCoursesInfo: current_courses,
  statisticsData: statistics
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
