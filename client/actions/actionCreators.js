
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
    marketB
  }
}



export function rebuildCurrentGraph(newHistoryA, newHistoryB){
  return{
    type: "REBUILD_CURRENT_GRAPH",
    newCourseA,
    newCourseB
  }
}

export function newMarketsGraph(newHistoryA, newHistoryB){
  return{
    type: "NEW_MARKETS_GRAPH",
    marketA,
    marketB
  }
}