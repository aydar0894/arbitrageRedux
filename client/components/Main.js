import React from 'react';
import { Route,Link } from 'react-router';

import CoursesBar from './CoursesBar';
import Switcher from './Switcher';
import PrimarySelector from './PrimarySelector';
import StatisticsData from './StatisticsData';
import ProfitabilityCalculator from './ProfitabilityCalculator';
import SpreadTable from './SpreadTable';


class Main extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    return true;
  }
  render(){
    return(
      <div>
        <div id="header">
          <div className="container">
            <h1 className="text-center title">
              <Link to="/">Crypto Arbitrage</Link>
            </h1>
            <CoursesBar current_courses={this.props.current_courses}/>
            <PrimarySelector current_courses={this.props.current_courses}
                             currentCourseChange={this.props.currentCourseChange}
                             statisticsDataChange={this.props.statisticsDataChange}
                             rebuildCurrentGraph={this.props.rebuildCurrentGraph}
                             newPair={this.props.newPair}/>
          </div>
        </div>


        <Switcher/>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
};

export default Main;
