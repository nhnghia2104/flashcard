import { Action } from "../actions/type";
import { CardSet } from "../model/CardSet";

export type State = {
  fetched: boolean,
  data: Array<any>,
};
const initial: State = {
  fetched: false,
  data: [],
};
export default function gameReducer(
  state: State = initial,
  action: Action
): State {
  switch (action.type) {
    case "GAME_GET_LAEARNINGTEST": {
      return { ...state, data: action.data };
    }
  }
  return state;
}
