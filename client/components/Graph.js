import React from 'react';

import Switcher from './Switcher';


const ReactHighstock = require('react-highcharts/ReactHighstock');

var firebase = require('./firebasecomp.js')();
var markets = firebase.database().ref('markets/pairs/');
import configsFunc from '../data/mainGraphConfig';

class Graph extends React.Component{

  render(){
    var config = configsFunc(this.props);
		return (
			<div>
        <ReactHighstock config={config}/>
      </div>
		)
  }
};

export default Graph;
