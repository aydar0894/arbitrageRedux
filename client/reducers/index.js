import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import graphPoints from './graphPoints';
import currentCoursesInfo from './currentCoursesInfo';
import statisticsData from './statisticsData';
import spreadTable from './SpreadTable';

const rootReducer = combineReducers({spreadTable, statisticsData, graphPoints, currentCoursesInfo, routing: routerReducer});

export default rootReducer;
