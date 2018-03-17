import React from 'react';
import Switcher from './Switcher';
const ReactHighstock = require('react-highcharts/ReactHighstock');
const ReactHighcharts = require('react-highcharts');
const Highcharts = require('highcharts');
require('highcharts-histogram-bellcurve')(ReactHighcharts.Highcharts)


class DistributionGraph extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    return true;
  }


  render(){
    var config = {
          events: {
              load: function () {
                  Highcharts.each(this.series[1], function (point, i) {
                      var labels = ['4σ', '3σ', '2σ', 'σ', 'μ', 'σ', '2σ', '3σ', '4σ'];
                      if (i % pointsInInterval === 0) {
                          point.update({
                              color: 'black',
                              dataLabels: {
                                  enabled: true,
                                  format: labels[Math.floor(i / 5)],
                                  overflow: 'none',
                                  crop: false,
                                  y: -2,
                                  style: {
                                      fontSize: '13px'
                                  }
                              }
                          });
                      }
                  });
              }
        },

        title: {
         text: 'Bell curve'
        },

       xAxis: [{
           title: {
               text: 'Data'
           },
           alignTicks: false
       }, {
           title: {
               text: 'Bell curve'
           },
           alignTicks: false,
           opposite: true
       }],

       yAxis: [{
           title: { text: 'Data' }
            },
            {
           title: { text: 'Bell curve' },
           opposite: true
       }],

       series: [{
           name: 'Bell curve',
           type: 'bellcurve',
           intervals: 4,
           pointsInInterval: 5,
           xAxis: 1,
           yAxis: 1,
           baseSeries: 1,
           zIndex: -1
       }, {
           name: 'Data',
           type: 'scatter',
           data: this.props.statistics.currentSpreadPoints,
           marker: {
               radius: 1.5
           }
       }]
    };
    return(
      <div>        
        <ReactHighcharts config={config}/>
      </div>
    )
  }
};

export default DistributionGraph;
