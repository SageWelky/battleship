export default class Ship {
  constructor({id, x, y, length, orientation}) {
    this.id = id;
    this.length = length;
    this.damage = 0;
    this.coordinates = [x, y];
    this.orientation = orientation;
  }

  hit() {
    this.damage++;
  }

  isSunk() {
    if(this.damage >= this.length) {
      this.sunk = true;
      return true;
    }
    return false;
  }

}