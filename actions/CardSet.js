/**
 * @flow
 */

"use strict";

import { exp } from "react-native/Libraries/Animated/src/Easing";
import CardSetService from "../services/CardSet";
const service = new CardSetService();

export function getAllCardSet() {
  var result = service.getAllCardSet();
  return {
    type: "CARDSET_GET_ALL",
    data: result,
  };
}

export function addNewCardSet(name: string) {
  return (dispatch: any) => {
    service.addNewCardSet(name).then((result) => {
      dispatch({
        type: "CARDSET_ADD",
      });
      dispatch(getAllCardSet());
    });
  };
}

export function deleteCardSet(idCardSet: string) {
  return (dispatch: any) => {
    service.deleteCardSet(idCardSet);
    dispatch({
      type: "CARDSET_ADD",
    });
    dispatch(getAllCardSet());
  };
}

export function updateCardSetLastAccess(idCardSet: string) {
  return (dispatch: any) => {
    service.updateCardSetLastAccess(idCardSet);
    dispatch({
      type: "CARDSET_UPDATE_LASTACCESS",
    });
    dispatch(getAllCardSet());
  };
}

export function updateCardSetLastIndex(idCardSet, index) {
  return (dispatch: any) => {
    service.updateCardSetLastIndex(idCardSet, index);
    dispatch({
      type: "CARDSET_UPDATE_LASTINDEX",
    });
    dispatch(getAllCardSet());
  };
}

export function updateCardSetInfo(idCardSet, cards, title) {
  return (dispatch: any) => {
    service.updateCardSetInfo(idCardSet, cards, title);
    dispatch({
      type: "CARDSET_UPDATE_CARDS",
    });
    dispatch(getAllCardSet());
  };
}

export function clearAllCardSet() {
  service.clearAllCardSetData();
  return {
    type: "CARDSET_CLEAR_ALL",
  };
}

// ACTION FOR CARDs

export function pushNewCard(idCardSet, card) {
  return (dispatch: any) => {
    service.pushNewCard(idCardSet, card);
    dispatch({
      type: "CARD_PUSH",
    });
    dispatch(getAllCardSet());
  };
}
