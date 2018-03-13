//A reducer tskes in two things:
//1. the action
//2. copy of current state

function currentCoursesInfo(state = [], action){
  console.log(action);
  switch (action.type) {
    case 'CURRENT_COURSE_CHANGE':

      var courseA = (action.courseA === 0 ? state[0].course : action.courseA);
      var courseB = (action.courseB === 0 ? state[1].course : action.courseB);
      return[
        {...state[0], course: courseA},
        {...state[1], course: courseB}
      ]
    default:
      return state
  }

}

export default currentCoursesInfo;
