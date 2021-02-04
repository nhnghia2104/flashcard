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
  | { type: "CARD_PUSH" };
