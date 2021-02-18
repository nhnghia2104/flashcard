/**
 * @flow
 */

"use strict";

const ContentCard = {
  name: "ContentCard",
  properties: {
    text: "string",
    imageURL: "string",
  },
};
const DataCard = {
  name: "DataCard",
  properties: {
    front: "ContentCard",
    back: "ContentCard",
  },
};
const Card = {
  name: "Card",
  properties: {
    id: "string",
    point: { type: "int", default: 0 },
    got: { type: "bool", default: false },
    data: "DataCard",
  },
};
const CardSet = {
  name: "CardSet",
  primaryKey: "id",
  properties: {
    id: "string",
    name: "string",
    isStarred: "bool",
    lastAccess: "int",
    dateCreated: "int",
    lastIndex: { type: "int", default: 0 },
    cards: { type: "list", objectType: "Card" },
  },
};

class Schema {
  schema: Array<any>;
  constructor() {
    this.schema = [ContentCard, DataCard, Card, CardSet];
  }
  current() {
    return this.schema;
  }
}
module.exports = Schema;
