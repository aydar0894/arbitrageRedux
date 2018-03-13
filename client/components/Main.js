import React from 'react';
import {Link} from 'react-router';

import CoursesBar from './CoursesBar';

class Main extends React.Component{  

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
