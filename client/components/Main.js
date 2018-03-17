import React from 'react';
import {Link} from 'react-router';

import CoursesBar from './CoursesBar';
import Switcher from './Switcher';

class Main extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    return true;
  }
  render(){
    return(
      <div>
        <h1>
          <Link to="/">Crypto</Link>
        </h1>
        <CoursesBar {...this.props}/>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
};

export default Main;
