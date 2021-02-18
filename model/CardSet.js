/**
 * @flow
 */

"use strict";

export type ContentCard = {
  text: String,
  imageURL: String,
};

export type DataCard = {
  front: ContentCard,
  back: ContentCard,
};

export type Card = {
  id: String,
  point: Number,
  got: Boolean,
  data: DataCard,
};

export type CardSet = {
  id: string,
  name: string,
  isStarred: Boolean,
  lastAccess: Number,
  dateCreated: Number,
  lastIndex: Number,
  cards: Array<Card>,
};
