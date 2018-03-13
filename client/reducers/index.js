import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import graphPoints from './graphPoints';
import currentCoursesInfo from './currentCoursesInfo';

const rootReducer = combineReducers({graphPoints, currentCoursesInfo, routing: routerReducer});

export default rootReducer;
