var configsFunc = (spreadPoints) => {
  var pointsInInterval = 5;

  var destribution_graph_config = {
      title: {
      text: 'Spread Destribution Histogram'
    },
    margin: [50, 0, 50, 50],
    chart:{
      events: {
        load: function () {
          var current = this.series[0].baseSeries.yData[this.series[0].baseSeries.yData.length - 1];
          this.series[0].data.map(function(point, index){
            if(point.x <= current && current <= point.x2){
              point.update({color: "red"});
            }
          });
        }
      }
    },

    xAxis: [{
        title: { text: 'Time point' },
        alignTicks: false
    }, {
        title: { text: 'Histogram Spread' },
        alignTicks: false,
        opposite: true
    }],

    yAxis: [{
        title: { text: 'Spread' }
    }, {
        title: { text: 'Probability' },
        opposite: true
    }],


    series: [{
        name: 'Histogram',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        // colorByPoint: true,
        color: "blue",
        baseSeries: '1',
        zIndex: -1
    }, {
        name: 'Points',
        color: 'black',
        type: 'line',
        data: spreadPoints,
        id: 's1',
        marker: {
            radius: 1.5
        }
    }]
  };
  var bell_curve_config = {
    chart:{
        events: {
            load: function () {
                this.series[0].points.map(function(point, i){
                    var labels = ['4σ', '3σ', '2σ', 'σ', 'μ', 'σ', '2σ', '3σ', '4σ'];
                    if (i % pointsInInterval === 0) {
                        point.update({
                            color: 'black',
                            dataLabels: {
                                enabled: true,
                                format: labels[Math.floor(i / 5)],
                                overflow: 'none',
                                crop: false,
                                y: -2,
                                style: {
                                    fontSize: '13px'
                                }
                            }
                        });
                    }
                });
                var current = this.series[0].baseSeries.yData[this.series[0].baseSeries.yData.length - 1];
                var update = false;
                var updated = false;
                var just_updated = false;
                var t = this;
                this.series[0].data.map(function(point, index){
                  if(just_updated === true){
                    point.update({color: "red"});
                    just_updated = false;
                  }
                  if(index < t.series[0].data.length - 1 && point.x <= current && t.series[0].data[index + 1].x >= current && updated === false){
                    update = true;
                  }
                  if(update === true){
                    point.update({color: "red"});
                    updated = true;
                    update = false;
                    just_updated = true;
                  }
                });

                console.log(current);
            }
          }
      },

      title: {
       text: 'Bell curve'
      },

     xAxis: [{
         title: {
             text: 'Time point'
         },
         alignTicks: false
     }, {
         title: {
             text: 'Bell curve Spread'
         },
         alignTicks: false,
         opposite: true
     }],

     yAxis: [{
         title: { text: 'Spread' }
          },
          {
         title: { text: 'Probability' },
         opposite: true
     }],

     series: [{
         name: 'Bell curve',
         type: 'bellcurve',
         intervals: 4,
         pointsInInterval: 5,
         xAxis: 1,
         yAxis: 1,
         baseSeries: 1,
         zIndex: -1,
         marker: {
            enabled: true
        }
     }, {
         name: 'Data',
         type: 'line',
         data: spreadPoints,
         marker: {
             radius: 1.5
         }
     }]
  };
  return {
    bell_curve_config,
    destribution_graph_config
  }
}

export default configsFunc;
