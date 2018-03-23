import React from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class ProfitabilityCalculator extends React.Component{

  constructor(props, context) {
    super(props, context);
    this.state = {
      expected_spread_value: 0,
      spread_buy_amount: 0,
      calculated_profit: 0
    };
  }

  componentWillReceiveProps(){
    let cur_spread = this.props.statistics.currentSpread;
    this.setState({calculated_profit: (this.state.spread_buy_amount*(this.state.expected_spread_value/cur_spread) - this.state.spread_buy_amount).toFixed(2)});
  }

  handleExpectedSpreadValueChange(e){
    console.log(this.state.spread_buy_amount);
    this.setState({ expected_spread_value: e.target.value });
    let cur_spread = this.props.statistics.currentSpread;
    this.setState({calculated_profit: (this.state.spread_buy_amount*(e.target.value/cur_spread) - this.state.spread_buy_amount).toFixed(2)});
  }

  handleSpreadBuyAmountChange(e){
    console.log(this.state.expected_spread_value);

    this.setState({ spread_buy_amount: e.target.value });
    let cur_spread = this.props.statistics.currentSpread;
    this.setState({ calculated_profit: (e.target.value*(this.state.expected_spread_value/cur_spread) - e.target.value).toFixed(2)});

  }



  render(){
		return (
			<div>
        <h2>Spread profitability calculator</h2>
        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>New spread value</ControlLabel>
            <FormControl
              type="text"
              value={this.state.expected_spread_value}
              placeholder="Enter expected spread value"
              onChange={this.handleExpectedSpreadValueChange.bind(this)}
            />
            <ControlLabel>Buying amount</ControlLabel>
            <FormControl
              type="text"
              value={this.state.spread_buy_amount}
              placeholder="Enter amount"
              onChange={this.handleSpreadBuyAmountChange.bind(this)}
            />
          </FormGroup>
        </form>
        <div>
          <div>Calculated profit: {this.state.calculated_profit}</div>
        </div>
      </div>
		)
  }
};

export default ProfitabilityCalculator;
