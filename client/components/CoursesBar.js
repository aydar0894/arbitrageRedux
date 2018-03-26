import React from 'react';
import {Link} from 'react-router';


var firebase = require('./firebasecomp.js')();
var markets = firebase.database().ref('markets/pairs');
var refs = [];
class CoursesBar extends React.Component{

  render(){
    console.log(this.props.current_courses[0]);
    return(
      <div className="row course-bar">
        <div className="col-12 text-center currency-pair-title">{this.props.current_courses[1].courseType}</div>
        <div className="col-6 market-info text-center">
          <h3 className="title">{this.props.current_courses[0].market}</h3>
          <div className="price">{this.props.current_courses[0].course}</div>
        </div>
        <div className="col-6 market-info text-center">
          <h3 className="title">{this.props.current_courses[1].market}</h3>
          <div className="price">{this.props.current_courses[1].course}</div>
        </div>
      </div>
    )
  }
};

export default CoursesBar;
