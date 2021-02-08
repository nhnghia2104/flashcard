"use strict";
import realm from "../realm";

class GameService {
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
}

module.exports = GameService;
