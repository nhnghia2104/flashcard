/**
 * @flow
 */

"use strict";

import { exp } from "react-native/Libraries/Animated/src/Easing";
import GameService from "../services/Game";
const service = new GameService();

export function getLearningTest() {
  var result = service.generateUniqueNumberArray(5, 0, 10);
  return {
    type: "GAME_GET_LAEARNINGTEST",
    data: result,
  };
}
