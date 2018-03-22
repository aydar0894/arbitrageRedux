import React from 'react';
import SpreadTableMarketsSelector from './SpreadTableMarketsSelector';
import Table from './Table';

class SpreadTable extends React.Component{

  render(){
    console.log(this.props.spread_table)
		return (
			<div>
        <SpreadTableMarketsSelector rebuildSpreadTable={this.props.rebuildSpreadTable}/>
        <Table spread_table={this.props.spread_table}/>
      </div>
		)
  }
};

export default SpreadTable;
