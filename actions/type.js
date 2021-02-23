/**
 * @flow
 */

"use strict";

import type { CardSet } from "../model/CardSet";

export type Action =
  | { type: "CARDSET_GET_ALL", data: Array<CardSet> }
  | { type: "CARDSET_CLEAR_ALL" }
  | { type: "CARDSET_ADD" }
  | { type: "CARDSET_UPDATE_LASTACCESS" }
  | { type: "CARDSET_UPDATE_LASTINDEX" }
  | { type: "CARDSET_UPDATE_CARDS" }
  | { type: "CARD_PUSH" }
  | { type: "CARD_UPDATE_IN_CARDSET" }
  | { type: "CARD_REMOVE_FROM_CARDSET" }
  | { type: "CARDSET_UPDATE_NAME" }
  | { type: "CARD_UPDATE_POINT" }
  | { type: "CARD_GOT" }
  | { type: "CARD_UPDATE_POINT_ARRAY_CARD" };
