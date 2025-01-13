export default class Ship {
  constructor(id, length) {
    this.id = id;
    this.length = length;
    this.hit = 0;
    this.coordinates = [];
  }

  isHit() {
    this.hit++;
  }

  isSunk() {
    if(this.hit >= this.length) {
      this.sunk = true;
      return true;
    }
    return false;
  }

}