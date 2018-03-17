import React from 'react';
import {Link} from 'react-router';

import StatisticsData from './StatisticsData';

var firebase = require('./firebasecomp.js')();
var markets = firebase.database().ref('markets/pairs/BTC/USD');

class CoursesBar extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    return true;
  }
  componentDidMount() {
  	var t = this;
  	var hitbtc = markets.child('hitbtc').child('currentPrice');
  	var gdax = markets.child('gdax').child('currentPrice');
    hitbtc.on('value', function(snap){
    	var price = snap.val();
      t.props.currentCourseChange(price, 0);
  		return
  	});
    gdax.on('value', function(snap){
    	var price = snap.val();
      t.props.currentCourseChange(0, price);
  		return
  	});
  }

  render(){
    return(
      <div>
        <table className="table" style={{margin: "auto"},{width:"30%"}}>
          <thead>
            <tr>
              <th scope="col">Market</th>
              <th scope="col">Pair</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HitBTC</td>
              <td>BTC/USD</td>
              <td>{this.props.current_courses[0].course}</td>
            </tr>
            <tr>
              <td>GDAX</td>
              <td>BTC/USD</td>
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
