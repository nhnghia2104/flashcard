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

export function updateCardSetName(idCardSet, name) {
  return (dispatch: any) => {
    service.updateCardSetName(idCardSet, name);
    dispatch({
      type: "CARDSET_UPDATE_NAME",
    });
    dispatch(getAllCardSet());
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

export function updateCardInCardSet(idCardSet, card, index) {
  return (dispatch: any) => {
    service.updateCardInCardSet(idCardSet, card, index);
    dispatch({
      type: "CARD_UPDATE_IN_CARDSET",
    });
    dispatch(getAllCardSet());
  };
}

export function increaseCardPointInCardSet(idCardSet, idCard) {
  return (dispatch: any) => {
    service.increaseCardPointInCardSet(idCardSet, idCard);
    dispatch({
      type: "CARD_UPDATE_POINT",
    });
    dispatch(getAllCardSet());
  };
}

export function gotCard(idCardSet, idCard) {
  return (dispatch: any) => {
    service.gotCard(idCardSet, idCard);
    dispatch({
      type: "CARD_GOT",
    });
    dispatch(getAllCardSet());
  };
}

export function removeCardInCardSet(idCardSet, index) {
  return (dispatch: any) => {
    service.removeCardInCardSet(idCardSet, index);
    dispatch({
      type: "CARD_REMOVE_FROM_CARDSET",
    });
    dispatch(getAllCardSet());
  };
}
