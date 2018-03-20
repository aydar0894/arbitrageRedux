import React from 'react';
import BellCurve from './BellCurve';
import DestributionGraph from './DestributionGraph';
const Highcharts = require('highcharts');
import configsFunc from '../data/distributionConfigs';
var math = require('mathjs');

class GraphicalData extends React.Component{
  render() {
    var configs = configsFunc(this.props.statistics.currentSpreadPoints);
    return(
      <div>
        <BellCurve config={configs.bell_curve_config}/>
        <DestributionGraph config={configs.destribution_graph_config}/>
      </div>
    )

  }
};

export default GraphicalData;
