import { Action } from "../actions/type";
import { CardSet } from "../model/CardSet";

export type State = {
  fetched: boolean,
  data: Array<CardSet>,
};
const initial: State = {
  fetched: false,
  data: [],
};
export default function cardReducer(
  state: State = initial,
  action: Action
): State {
  switch (action.type) {
    case "CARDSET_GET_ALL": {
      return { ...state, data: action.data };
    }
    case "CARDSET_CLEAR_ALL": {
      return {
        data: [],
      };
    }
    case "CARDSET_UPDATE_LASTACCESS": {
      return { ...state, data: action.data };
    }
    case "CARDSET_UPDATE_LASTINDEX": {
      return { ...state, data: action.data };
    }
    case "CARD_PUSH": {
      return { ...state, data: action.data };
    }
    case "CARD_UPDATE_IN_CARDSET": {
      return { ...state, data: action.data };
    }
    case "CARD_REMOVE_FROM_CARDSET": {
      return { ...state, data: action.data };
    }
  }
  return state;
}
