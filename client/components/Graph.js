import React from 'react';
import { getData } from "../data/utils"
const ReactHighstock = require('react-highcharts/ReactHighstock');
var firebase = require('./firebasecomp.js')();
var graphData = firebase.database().ref('markets/pairs/btc-usd');


// var data = [];



class Graph extends React.Component{

  componentDidMount() {
    var gdax = graphData.child('gdax/history');
    var hitbtc = graphData.child('hitbtc/history');
    var t = this;
    gdax.on('value', function(snap){
      console.log(snap.val());
      var data = snap.val();
    	var history = [];
      Object.keys(data).forEach(function(key) {
        history.push([data[key].time*1000, data[key].price]);
      });
      t.props.rebuildCurrentGraph(history, 0);
  		return
  	});

    hitbtc.on('value', function(snap){
      console.log(snap.val());
      var data = snap.val();
      var history = [];
      Object.keys(data).forEach(function(key) {
        history.push([data[key].time*1000, data[key].price]);
      });
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
                    return this.value + 'USD/BTC';
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
          name: 'GDAX',
          data: this.props.points[0],
          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
              valueDecimals: 2,
              split: true
          }
        },
        {
          name: 'HitBTC',
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
