import jerzy from 'jerzy';
import * as ss from 'simple-statistics';
function statisticsData(state = [], action){
  switch (action.type) {
    case 'STATISTICS_DATA_CHANGE':
      var pointsA = (action.pointsA === 0 ? state.pointsA : action.pointsA);
      var pointsB = (action.pointsB === 0 ? state.pointsB : action.pointsB);
      var spreads = [];
      if(pointsA.length > 1 && pointsB.length > 1)
      {
        pointsA.forEach(function(point, i){
          if( pointsB[i]!= undefined){
            spreads.push(pointsA[i][1] > pointsB[i][1] ? (pointsA[i][1] - pointsB[i][1]) : (pointsB[i][1] - pointsA[i][1]));
          }
        });
      }

      if(spreads.length > 1){
        var v = new jerzy.Vector(spreads);
        var ND = jerzy.Normality.shapiroWilk(v).p;
        var variance = ss.sampleVariance(spreads).toFixed(2);
        var spreadStandartDiviation = ss.sampleStandardDeviation(spreads).toFixed(2);
        var mean = ss.mean(spreads);
      }
      else{
        var ND = 0;
        var variance = 0;
        var spreadStandartDiviation = 0;
        var mean = 0;
      }

      return {
        currentSpread: spreads[spreads.length - 1],
        spreadStandartDiviation: spreadStandartDiviation,
        spreadExpectedValue: mean,
        spreadFuncHasNormalDistribution: ND > 0.05,
        currentSpreadPoints: spreads,
        pointsA,
        pointsB
      };
    default:
      return state;
  }
};

export default statisticsData;
