import React from 'react';
import {DropdownButton, MenuItem, Button} from 'react-bootstrap';

var firebase = require('./firebasecomp.js')();
var BU = firebase.database().ref('markets/pairs/BTC/USD');
var EU = firebase.database().ref('markets/pairs/ETH/USD');
var EB = firebase.database().ref('markets/pairs/ETH/BTC');
var GLOBAL_MARKET = firebase.database().ref('markets/pairs/');






class PrimarySelector extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      marketsFirst: [],
      marketsSecond: [],
      pairs: ["BTC/USD", "ETH/USD", "ETH/BTC"],
      currentMrketOne: "",
      currentMrketTwo: "",
      currentPair: "BTC/USD"
     };
   }

  onFirstMarketDropdownItemSelected(e){
    console.log('First changed', e);
    this.setState({currentMrketOne: this.state.marketsFirst[e]});
  };

  onSecondMarketDropdownItemSelected(e){
    console.log('Second changed', e);
    this.setState({currentMrketTwo: this.state.marketsSecond[e]});
  };

  onPairDropdownItemSelected(e){
    console.log('Pair changed', e);
    this.setState({currentPair: this.state.pairs[e]});
  };

  onSelectClick(e){
    console.log('selected', e);
    var historyA = [];
    var historyB = [];
    var t = this;
    GLOBAL_MARKET.child(this.state.currentPair).child(this.state.currentMrketOne).child('currentPrice').once('value', function(snap){
    	var price = snap.val();
      t.props.currentCourseChange(price, 0);
  		return
  	});
    GLOBAL_MARKET.child(this.state.currentPair).child(t.state.currentMrketTwo).child('currentPrice').once('value', function(snap){
    	var price = snap.val();
      t.props.currentCourseChange(0, price);
  		return
  	});
    GLOBAL_MARKET.child(this.state.currentPair).child(this.state.currentMrketOne).child('history').once('value', function(snap){
      var data = snap.val();
      Object.keys(data).forEach(function(key) {
        historyA.push([data[key].time*1000, data[key].price]);
      });
      if(historyB.length > 0){
        t.props.newPair(t.state.currentMrketOne, t.state.currentMrketTwo, t.state.currentPair);
        t.props.rebuildCurrentGraph(historyA, historyB);
      }
  		return
  	});
    GLOBAL_MARKET.child(this.state.currentPair).child(this.state.currentMrketTwo).child('history').once('value', function(snap){
      var data = snap.val();
      Object.keys(data).forEach(function(key) {
        historyB.push([data[key].time*1000, data[key].price]);
      });
      if(historyA.length > 0){
        t.props.newPair(t.state.currentMrketOne, t.state.currentMrketTwo, t.state.currentPair);
        t.props.rebuildCurrentGraph(historyA, historyB);
      }
  		return
  	});


  };

  componentDidMount(){
    var t = this;
    BU.once('value', function(snap){
      var markets = Object.keys(snap.val());
      t.setState({
              marketsFirst: markets,
              currentMrketOne: markets[0],
              currentMrketTwo: markets[1],
              marketsSecond: markets});
    });
  }

  render(){


    return(
      <div>
        <DropdownButton
          bsStyle={'success'}
          title={this.state.currentPair == undefined ? "Loading...":this.state.currentPair}
          key={1}
          id={`dropdown-basic`}
          onSelect={this.onPairDropdownItemSelected.bind(this)}
        >
          {this.state.pairs.map((value, index) =>
            <MenuItem key={index} eventKey={index}>{value}</MenuItem>
          )}
        </DropdownButton>

        <DropdownButton
          bsStyle={'default'}
          title={this.state.currentMrketOne == undefined ? "Loading...":this.state.currentMrketOne}
          key={2}
          id={`dropdown-basic`}
          onSelect={this.onFirstMarketDropdownItemSelected.bind(this)}
        >
          {this.state.marketsFirst.map((value, index) =>
            <MenuItem key={index} eventKey={index}>{value}</MenuItem>
          )}

        </DropdownButton>

        <DropdownButton
          bsStyle={'default'}
          title={this.state.currentMrketTwo == undefined ? "Loading...":this.state.currentMrketTwo}
          key={3}
          id={`dropdown-basic`}
          onSelect={this.onSecondMarketDropdownItemSelected.bind(this)}
        >

          {this.state.marketsFirst.map((value, index) =>
            <MenuItem key={index} eventKey={index}>{value}</MenuItem>
          )}

        </DropdownButton>
        <Button onClick={this.onSelectClick.bind(this)}>Select</Button>
      </div>
    )

  }


};

export default PrimarySelector;
