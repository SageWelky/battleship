export default class Ship {
  constructor() {
    this.length = 0;
    this.sunk = false;
    this.hit = 0;
    this.coordinates = [];
  }

  hit() {
    this.hit++;
  }

  isSunk() {
    if(this.hit >= this.length) {
      return true;
    }
    return false;
  }

}