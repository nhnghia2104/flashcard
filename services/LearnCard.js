class LearnCard {
  learnQueue: Array<any>;
  point: Number;
  constructor() {
    this.learnQueue = [];
    this.point = 0;
  }
  increasePoint() {
    this.point += 1;
  }
  addItem(item) {
    this.learnQueue.push(item);
  }
  clearLearnQueue() {
    this.learnQueue = [];
  }
}
