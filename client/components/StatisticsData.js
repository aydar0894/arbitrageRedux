import React from 'react';


class StatisticsData extends React.Component{

  render(){
    return(
      <div>
        <h1>Statistics data</h1>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Parameter</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Current spread</td>
              <td>{this.props.statistics.currentSpread}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Expected spread</td>
              <td>{this.props.statistics.spreadExpectedValue}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Spread has the Normal Distribution</td>
              <td>{this.props.statistics.spreadFuncHasNormalDistribution.toString()}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Spread Standard Deviation</td>
              <td>{this.props.statistics.spreadStandartDiviation}</td>
            </tr>
          </tbody>
        </table>
      </div>

    )
  }
};

export default StatisticsData;
