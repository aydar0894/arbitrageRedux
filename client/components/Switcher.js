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
        <AppBar>
          <Navigation type='horizontal'>
            <Link className="Button" to={`/spread_distribution`}>
              DistributionGraph
            </Link>
            <Link className="Button" to={`/`}>
              SpreadGraph
            </Link>
          </Navigation>
        </AppBar>

      </div>
    )
  }
};

export default Switcher;
