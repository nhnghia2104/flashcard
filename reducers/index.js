import { combineReducers } from "redux";
import logger from "redux-logger";
import cardReducer from "./card";
import gameReducer from "./game";
// export default cardReducer;
export default combineReducers({
  card: cardReducer,
  game: gameReducer,
});
