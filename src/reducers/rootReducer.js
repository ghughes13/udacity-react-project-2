import setLoggedIn from "./setLoggedIn";
import setUsername from "./setUsername";
import setUsersData from "./setUsersData";
import setQuestions from "./setQuestions";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  loggedIn: setLoggedIn,
  username: setUsername,
  usersData: setUsersData,
  questions: setQuestions,
});

export default rootReducer;
