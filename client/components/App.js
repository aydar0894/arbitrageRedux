import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React from 'react';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';


function mapStateToProps(state){
  return{
    points: state.graphPoints,
    current_courses: state.currentCoursesInfo
  }
};


function mapDispatchToProps(dispatch){
  console.log(actionCreators);
  return bindActionCreators(actionCreators, dispatch);
};



const App = connect(mapStateToProps, mapDispatchToProps)(Main);


export default App;
