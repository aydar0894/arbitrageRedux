var configsFunc = (props) => {
  var config = {
      title: {
        text: 'Spread graph'
      },
      rangeSelector: {
          selected: 4
      },
      yAxis: {
          labels: {
              formatter: function () {
                  return this.value;
              }
          },
          plotLines: [{
              value: 0,
              width: 2,
              color: 'silver'
          }]
      },

      plotOptions: {
          series: {
              // compare: 'value',
              getExtremesFromAll: true,
              showInNavigator: true
          }
      },
      series:[{
        name: props.current_courses[0].market,
        data: props.points[0],
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            split: true
        }
      },
      {
        name: props.current_courses[1].market,
        data: props.points[1],
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            split: true
        }
      }
      ]
  };
  return config;
}
export default configsFunc;
