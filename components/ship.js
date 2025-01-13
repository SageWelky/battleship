export default class Ship {
  constructor(id, x, y, length, orientation) {
    this.id = id;
    this.length = length;
    this.hit = 0;
    this.coordinates = [x, y];
    this.orientation = orientation;
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