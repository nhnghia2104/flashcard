import realm from "../realm";
import { Card, CardSet, ContentCard, DataCard } from "../model/CardSet";

class CardService {
  async addCard(idCardSet: string, card: any) {
    let context = realm.current();
    try {
      var id = Date.now().toString();
      let setCards = context.objects("CardSet").filtered(`id = "${idCardSet}"`);

      context.write(() => {
        let setCard = setCards[0];
        setCard.cards.push({
          id: idCardSet,
          point: 0,
          data: card.data,
        });
      });
    } finally {
      context.close();
    }
  }
  async deleteCard(setCard: any, card: any) {}
  async updateCard(setCard: any, card: any) {}
}

module.exports = CardService;
