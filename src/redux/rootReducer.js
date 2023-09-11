import { combineReducers } from "redux";

import courseReducer from "./pages/course.reducer";
import studentReducer from "./pages/student.reducer";
import teacherReducer from "./pages/teacher.reducer";
import topicsReducer from "./pages/topics.reducer";

const rootReducer = combineReducers({
  course: courseReducer,
  student: studentReducer,
  teacher: teacherReducer,
  topics: topicsReducer
});

export default rootReducer;
