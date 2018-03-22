import React from 'react';
import {DropdownButton, MenuItem, Button} from 'react-bootstrap';

var firebase = require('./firebasecomp.js')();
var spread_table = firebase.database().ref('markets/spread_table/');
var refs = [];
class SpreadTableMarketsSelector extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      pairs: ["BTC/USD", "ETH/USD", "ETH/BTC"],
      currentPair: "BTC/USD"
     };
   };

   componentDidMount(){
     var t = this;
     spread_table.child("currencies").once('value', function(snap){
       let pairsObj = snap.val();
       var newPairs = [];
       Object.keys(pairsObj).map((key, index) => {
         newPairs.push(pairsObj[key]);
       });
       t.state.pairs = newPairs;
       console.log(t.state.pairs);
     });

     //this.props.rebuildSpreadTable

     refs.push(spread_table.child(this.state.currentPair));
     spread_table.child(this.state.currentPair).on('value', function(snap){
     	var spreads = snap.val();
      t.props.rebuildSpreadTable(spreads);
   		return
   	 });

   };
   onPairDropdownItemSelected(e){
     console.log('Pair changed', e);
     this.setState({currentPair: this.state.pairs[e]});
   };

   onSelectClick(e){
     var t = this;
     console.log('Selected', e);
     refs.map((ref, index)=>{
       ref.off();
     });
     refs = [];
     refs.push(spread_table.child(this.state.currentPair));
     spread_table.child(this.state.currentPair).on('value', function(snap){
     	var spreads = snap.val();
      t.props.rebuildSpreadTable(spreads);
   		return
   	 });

   };

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
         <Button onClick={this.onSelectClick.bind(this)}>Select</Button>
       </div>
     )

   }
 };


 export default SpreadTableMarketsSelector;
