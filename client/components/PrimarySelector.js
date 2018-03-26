import React from 'react';
import {DropdownButton, MenuItem, Button} from 'react-bootstrap';

var firebase = require('./firebasecomp.js')();
var markets = firebase.database().ref('markets/pairs');
var spread_table = firebase.database().ref('markets/spread_table/');

var refs = [];




class PrimarySelector extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      marketsFirst: [],
      marketsSecond: [],
      pairs: [],
      currentMrketOne: "",
      currentMrketTwo: "",
      currentPair: "BTC/USD"
     };
   }

   componentDidMount(){
     var t = this;
     spread_table.child("currencies").once('value', function(snap){
       let pairsObj = snap.val();
       var newPairs = [];
       Object.keys(pairsObj).map((key, index) => {
         newPairs.push(pairsObj[key]);
       });
       t.state.pairs = newPairs;
     });
     markets.child("BTC/USD").once('value', function(snap){
       var markets = Object.keys(snap.val());
       t.setState({
               marketsFirst: markets,
               currentMrketOne: markets[0],
               currentMrketTwo: markets[1],
               marketsSecond: markets});
     });
     var dataOne = this.props.current_courses[0];
     var dataTwo = this.props.current_courses[1];


     //Courses Info dispatches

     refs.push(markets.child(dataOne.courseType).child(dataOne.market).child('currentPrice'));
     markets.child(dataOne.courseType).child(dataOne.market).child('currentPrice').on('value', function(snap){
     	var price = snap.val();
       t.props.currentCourseChange(price, 0);
   		return
   	 });
     refs.push(markets.child(dataTwo.courseType).child(dataTwo.market).child('currentPrice'));

     markets.child(dataTwo.courseType).child(dataTwo.market).child('currentPrice').on('value', function(snap){
     	var price = snap.val();
       t.props.currentCourseChange(0, price);
   		return
   	 });

     //Graph dispatches

     refs.push(markets.child(dataOne.courseType).child(dataOne.market).child('history'));
     markets.child(dataOne.courseType).child(dataOne.market).child('history').on('value', function(snap){
       console.log(snap.val());
       var data = snap.val();
     	 var history = [];
       Object.keys(data).forEach(function(key) {
         history.push([data[key].time*1000, data[key].price]);
       });
       t.props.statisticsDataChange(history, 0);
       t.props.rebuildCurrentGraph(history, 0);
 		    return
   	 });
     refs.push(markets.child(dataTwo.courseType).child(dataTwo.market).child('history'));
     markets.child(dataTwo.courseType).child(dataTwo.market).child('history').on('value', function(snap){
       console.log(snap.val());
       var data = snap.val();
       var history = [];
       Object.keys(data).forEach(function(key) {
         history.push([data[key].time*1000, data[key].price]);
       });
       t.props.statisticsDataChange(0, history);
       t.props.rebuildCurrentGraph(0, history);
   		return

   	 });
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
    this.props.newPair(this.state.currentMrketOne, this.state.currentMrketTwo, this.state.currentPair);
    var dataOne = this.props.current_courses[0];
    var dataTwo = this.props.current_courses[1];
    var t = this;
    refs.map((ref, index)=>{
      ref.off();
    });
    refs = [];

    //Courses Info dispatches

    refs.push(markets.child(dataOne.courseType).child(dataOne.market).child('currentPrice'));
    markets.child(dataOne.courseType).child(dataOne.market).child('currentPrice').on('value', function(snap){
     var price = snap.val();
      t.props.currentCourseChange(price, 0);
     return
    });
    refs.push(markets.child(dataTwo.courseType).child(dataTwo.market).child('currentPrice'));

    markets.child(dataTwo.courseType).child(dataTwo.market).child('currentPrice').on('value', function(snap){
     var price = snap.val();
      t.props.currentCourseChange(0, price);
     return
    });

    //Graph dispatches

    refs.push(markets.child(dataOne.courseType).child(dataOne.market).child('history'));
    markets.child(dataOne.courseType).child(dataOne.market).child('history').on('value', function(snap){
      console.log(snap.val());
      var data = snap.val();
      var history = [];
      Object.keys(data).forEach(function(key) {
        history.push([data[key].time*1000, data[key].price]);
      });
      t.props.statisticsDataChange(history, 0);
      t.props.rebuildCurrentGraph(history, 0);
       return
    });
    refs.push(markets.child(dataTwo.courseType).child(dataTwo.market).child('history'));
    markets.child(dataTwo.courseType).child(dataTwo.market).child('history').on('value', function(snap){
      console.log(snap.val());
      var data = snap.val();
      var history = [];
      Object.keys(data).forEach(function(key) {
        history.push([data[key].time*1000, data[key].price]);
      });
      t.props.statisticsDataChange(0, history);
      t.props.rebuildCurrentGraph(0, history);
     return

    });

  };


  render(){


    return(
      <div className="text-center">
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
