import React from 'react';
class Table extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      markets: [],
      values: []
     };
   };



  componentWillReceiveProps(){
    var spread_table = this.props.spread_table;
    var markets = [];
    var marketPrices = [];
    var spreadVector = [];
    var values = [];
    Object.keys(spread_table).map((key, index) => {
      markets.push(key);
      marketPrices.push(spread_table[key]);
    });
    for (var i = 0; i < marketPrices.length; i++) {
      spreadVector = [];
      for (var j = 0; j < marketPrices.length; j++) {
        spreadVector.push((marketPrices[i] - marketPrices[j]).toFixed(7));
      }
      values.push(spreadVector);
    };

    this.setState({
      markets: markets,
      values: values
    });
  };

  render(){
    console.log(this.state);
    return(
      <div>
        <h1>Spread Table</h1>
        <table className="table" style={{width: "30%"}}>
          <thead>
            <tr>
              <th scope="col"> </th>
              {this.state.markets.map((value, index) =>{
                return(<th key={index} scope="col">{value}</th>);
                })
              }
            </tr>
          </thead>
          <tbody>
            {this.state.markets.map((value, index) =>{
              return(
              <tr>
                <td key={index}>{value}</td>
                {this.state.values[index].map((value, i) =>{
                  return(<td key={index + '-' + i}>{value}</td>)
                  })
                }
              </tr>
              )
              })
            }
          </tbody>
        </table>
      </div>
    )
  };

};

export default Table;
