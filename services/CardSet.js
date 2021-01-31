"use strict";
import realm from "../realm";

class CardSetService {
  constructor() {
    let context = realm.current();
    try {
      let setCards = context.objects("CardSet");
      if (setCards.length > 0) {
        return;
      }
      var defaultTestData = require("../testData.json");
      for (var i = 0; i < defaultTestData.length; i++) {
        var setCard = defaultTestData[i];
        context.write(() => {
          context.create("CardSet", {
            id: setCard.id,
            name: setCard.name,
            isStarred: setCard.isStarred,
            lastAccess: setCard.lastAccess,
            dateCreated: setCard.dateCreated,
            lastIndex: setCard.lastIndex,
            cards: setCard.cards,
          });
        });
      }
    } finally {
      context.close();
    }
  }

  getAllCardSet() {
    let context = realm.current();
    var data = [];
    try {
      let setCards = context.objects("CardSet");
      console.log(setCards.length);
      for (var i = 0; i < setCards.length; i++) {
        var setCard = setCards[i];
        var item = {
          id: setCard.id,
          name: setCard.name,
          isStarred: setCard.isStarred,
          lastAccess: setCard.lastAccess,
          dateCreated: setCard.dateCreated,
          lastIndex: setCard.lastIndex,
        };
        if (setCard.cards) {
          var cards = [];
          for (var j = 0; j < setCard.cards.length; j++) {
            var card = setCard.cards[j];
            var itemCard = {
              id: card.id,
              point: card.point,
              data: {
                front: {
                  text: card.data.front.text,
                  imageURL: card.data.front.imageURL,
                },
                back: {
                  text: card.data.back.text,
                  imageURL: card.data.back.imageURL,
                },
              },
            };
            cards.push(itemCard);
          }
          item.cards = cards;
        }
        data.push(item);
      }
    } finally {
      context.close();
    }
    return data;
  }

  async addNewCardSet(name: string) {
    let context = realm.current();
    try {
      var id = Date.now().toString();
      let setCard = context.objects("CardSet").filtered(`id = "${id}"`);
      if (setCard.length > 0) {
        return;
      }

      context.write(() => {
        context.create("CardSet", {
          id: id,
          name: name,
          isStarred: false,
          lastAccess: Date.now(),
          dateCreated: Date.now(),
          cards: [],
        });
      });
    } finally {
      context.close();
    }
  }

  updateCardSetLastAccess(idCardSet: string) {
    let context = realm.current();
    try {
      let setCards = context.objects("CardSet").filtered(`id = "${idCardSet}"`);
      console.log(idCardSet);
      if (setCards.length == 0) {
        return;
      }

      context.write(() => {
        setCards[0].lastAccess = Date.now();
      });
    } finally {
      context.close();
    }
  }

  updateCardSetLastIndex(idCardSet: string, index: Number) {
    let context = realm.current();
    try {
      let setCards = context.objects("CardSet").filtered(`id = "${idCardSet}"`);
      console.log(idCardSet);
      if (setCards.length == 0) {
        return;
      }

      context.write(() => {
        setCards[0].lastIndex = index;
      });
    } finally {
      context.close();
    }
  }

  deleteCardSet(idCardSet: string) {
    let context = realm.current();
    try {
      let cardSet = context.objects("CardSet").filtered(`id = "${idCardSet}"`);
      context.write(() => {
        context.delete(cardSet);
      });
    } finally {
      context.close();
    }
  }
  clearAllCardSetData() {
    let context = realm.current();
    try {
      let setCards = context.objects("CardSet");
      context.write(() => {
        context.delete(setCards);
      });
    } finally {
      context.close();
    }
  }
}

module.exports = CardSetService;
