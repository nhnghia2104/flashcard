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
  generateLearningTest(idCardSet) {
    let context = realm.current();
    var game = [];
    try {
      var setCards = context.object("CardSet").filtered(`id = "${idCardSet}"`);
      if (!setCards.length) return;
      var targetSetCard = setCards[0];
    } finally {
      context.close();
    }
    return game;
  }
}

module.exports = GameService;
