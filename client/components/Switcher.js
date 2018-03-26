import React from 'react';
import {Link} from 'react-router';
import { AppBar, Navigation } from 'react-toolbox'


class Switcher extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    return false;
  }
  render(){
    return(
      <div>
        <Link className="button" to={`/spread_distribution`}>
          DistributionGraph
        </Link>
        <Link className="button" to={`/spread_table`}>
          SpreadTable
        </Link>
        <Link className="button" to={`/statistics`}>
          Statistics
        </Link>
        <Link className="button" to={`/calculator`}>
          ProfitabilityCalculator
        </Link>
        <Link className="button" to={`/`}>
          SpreadGraph
        </Link>
      </div>
    )
  }
};

export default Switcher;
