import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import graphPoints from './graphPoints';
import currentCoursesInfo from './currentCoursesInfo';
import statisticsData from './statisticsData';

const rootReducer = combineReducers({statisticsData, graphPoints, currentCoursesInfo, routing: routerReducer});

export default rootReducer;
