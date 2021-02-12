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
  data: DataCard,
};

export type LearningTest = {
  id: string,
  idCardSet: string,
  question: string,
  options: Array<string>,
  key: Number,
};
