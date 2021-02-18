"use strict";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import realm from "../realm";

class GameService {
  generateUniqueNumberArray(aQuantity, aFrom, aTo) {
    var arr = [];
    while (arr.length < aQuantity) {
      var r = Math.floor(Math.random() * aTo) + aFrom;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }
}

module.exports = GameService;
