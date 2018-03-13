import React from 'react';
var firebase = require('./firebasecomp.js')();
var markets = firebase.database().ref('markets/pairs/btc-usd');

class CoursesBar extends React.Component{
  componentDidMount() {
  	var t = this;
  	var bitfinex = markets.child('bitfinex').child('currentPrice');
  	var gdax = markets.child('gdax').child('currentPrice');
    bitfinex.on('value', function(snap){
      console.log(snap.val());
    	var price = snap.val();
      console.log(t.props)
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
        <button onClick={this.props.currentCourseChange.bind(null, 333, 333)}>Тест</button>
        <div>
          <span>{this.props.current_courses[0].course}</span>
          <br/>
          <span>{this.props.current_courses[1].course}</span>
        </div>
      </div>
    )
  }
};

export default CoursesBar;
