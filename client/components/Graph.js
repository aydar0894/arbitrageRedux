import React from 'react';

import Switcher from './Switcher';


const ReactHighstock = require('react-highcharts/ReactHighstock');

var firebase = require('./firebasecomp.js')();
var markets = firebase.database().ref('markets/pairs/');



// var data = [];



class Graph extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    return true;
  }
  componentDidMount() {
    var dataOne = this.props.current_courses[0];
    var dataTwo = this.props.current_courses[1];
    var t = this;
    markets.off('value');
    markets.child(dataOne.courseType).child(dataOne.market).child('history').on('value', function(snap){
      console.log(snap.val());
      var data = snap.val();
    	var history = [];
      Object.keys(data).forEach(function(key) {
        history.push([data[key].time*1000, data[key].price]);
      });
      t.props.statisticsDataChange(history, 0);
      t.props.rebuildCurrentGraph(history, 0);
  		return
  	});

    markets.child(dataTwo.courseType).child(dataTwo.market).child('history').on('value', function(snap){
      console.log(snap.val());
      var data = snap.val();
      var history = [];
      Object.keys(data).forEach(function(key) {
        history.push([data[key].time*1000, data[key].price]);
      });
      t.props.statisticsDataChange(0, history);
      t.props.rebuildCurrentGraph(0, history);
  		return

  	});
	}
  render(){
    var config = {
        rangeSelector: {
            selected: 4
        },
        yAxis: {
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        plotOptions: {
            series: {
                // compare: 'value',
                getExtremesFromAll: true,
                showInNavigator: true
            }
        },
        series:[{
          name: this.props.current_courses[0].market,
          data: this.props.points[0],
          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
              valueDecimals: 2,
              split: true
          }
        },
        {
          name: this.props.current_courses[1].market,
          data: this.props.points[1],
          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
              valueDecimals: 2,
              split: true
          }
        }
        ]
    };

		return (
			<div>
        <ReactHighstock config={config}/>
      </div>
		)
  }
};

export default Graph;
