
export function currentCourseChange(courseA, courseB){
  return{
    type: "CURRENT_COURSE_CHANGE",
    courseA,
    courseB
  }
}


export function newPair(marketA, marketB, courseType){
  return{
    type: "NEW_PAIR",
    marketA,
    marketB,
    courseType
  }
}

export function statisticsDataChange(pointsA, pointsB){
  return{
    type: "STATISTICS_DATA_CHANGE",
    pointsA,
    pointsB
  }
}




export function rebuildCurrentGraph(newHistoryA, newHistoryB){
  return{
    type: "REBUILD_CURRENT_GRAPH",
    newHistoryA,
    newHistoryB
  }
}

export function newMarketsGraph(newHistoryA, newHistoryB){
  return{
    type: "NEW_MARKETS_GRAPH",
    newHistoryA,
    newHistoryB
  }
}
