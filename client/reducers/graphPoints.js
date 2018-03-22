function graphPoints(state = [], action){
  switch (action.type) {
    case 'REBUILD_CURRENT_GRAPH':
      var historyA = (action.newHistoryA === 0 ? state[0] : action.newHistoryA);
      var historyB = (action.newHistoryB === 0 ? state[1] : action.newHistoryB);
      return[
        historyA,
        historyB
      ]
    default:
      return state;
  }
}

export default graphPoints;
