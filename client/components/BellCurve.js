import React from 'react';

const ReactHighstock = require('react-highcharts/ReactHighstock');
const ReactHighcharts = require('react-highcharts');
const Highcharts = require('highcharts');
require('highcharts-histogram-bellcurve')(ReactHighcharts.Highcharts)


class BellCurve extends React.Component{

  render(){
    return(
      <div style={{width: "50%", display: "inline-block"}}>
        <ReactHighcharts config={this.props.config}/>
      </div>
    )
  }
};

export default BellCurve;
