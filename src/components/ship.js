export default class Ship {
  constructor({id, x, y, length, orientation}) {
    this.id = id;
    this.length = length;
    this.damage = 0;
    this.origin = [x, y];
    this.orientation = orientation;
    this.sunk = false;
  }

  hit() {
    this.damage++;
  }

  isSunk() {
    if (this.damage >= this.length) {
      this.sunk = true;

      return true;
    }

    return false;
  }

}