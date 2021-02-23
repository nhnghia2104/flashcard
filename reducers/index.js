import { combineReducers } from "redux";
import logger from "redux-logger";
import cardReducer from "./card";
// export default cardReducer;
export default combineReducers({
  card: cardReducer,
  // game: gameReducer,
});
