import React from 'react';
import {Link} from 'react-router';

import StatisticsData from './StatisticsData';

var firebase = require('./firebasecomp.js')();
var markets = firebase.database().ref('markets/pairs');
var refs = [];
class CoursesBar extends React.Component{

  render(){
    console.log(this.props.current_courses[0]);
    return(
      <div>
        <table className="table" style={{margin: "auto", width: "30%"}}>
          <thead>
            <tr>
              <th scope="col">Market</th>
              <th scope="col">Pair</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.current_courses[0].market}</td>
              <td>{this.props.current_courses[0].courseType}</td>
              <td>{this.props.current_courses[0].course}</td>
            </tr>
            <tr>
              <td>{this.props.current_courses[1].market}</td>
              <td>{this.props.current_courses[1].courseType}</td>
              <td>{this.props.current_courses[1].course}</td>
            </tr>
          </tbody>
        </table>        
        <StatisticsData {...this.props.statistics}/>
      </div>
    )
  }
};

export default CoursesBar;
