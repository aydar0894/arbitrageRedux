function spreadTable(state = [], action){
  switch (action.type) {
    case 'REBUILD_SPREAD_TABLE':
      return action.spreads
    default:
      return state;
  }
}

export default spreadTable;
