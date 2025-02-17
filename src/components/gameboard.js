import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.hashedShipCoords = new Map();
    this.hashedGuesses = new Map();
    this.numShipsSunk = 0;
    this.ships = [];
    this.currentShipID = 1;
  }

  receiveAttack({x: x, y: y}) {
    const key = `${x},${y}`;

    let move = {};
    move.guess = [x, y];
    move.key = key;

    if (this.hashedGuesses.get(key) === undefined) {
      this.hashedGuesses.set(key, 1);

      if (this.hashedShipCoords.get(key) !== undefined) {
        let sunkShip = false;

        sunkShip = this.handleHit(key);

        if (sunkShip[0]) {
          if (this.numShipsSunk > 4) {
            move.result = "All ships sunk!!!";
            move.sunkShipId = sunkShip[1];

            return move;
          }
          move.result = "Ship sunk!!";
          move.sunkShipId = sunkShip[1];
        }

        move.result = "Hit!";
        return move;
      }

      else {
        move.result = "Miss";
        return move;
      }

    } else if (this.hashedGuesses.get(key) === 1) {
      move.result = "Validation Error, already guessed.";
      return move;
    }

    move.result = "Unexpected error processing guess.";
    return move;
  }

  handleHit(key) {
    let id = this.hashedShipCoords.get(key);
    this.ships[id - 1].hit();

    if (this.ships[id - 1].isSunk()) {
      this.numShipsSunk++;

      return [true, id];

    }

    return [false, id];
  }

  //getShipCoordinates should be made a helper.
  placeShip({x: x, y: y, length: length, orientation: orientation}) {
    let id = this.currentShipID;
    let coords = this.getShipCoordinates({x: x, y: y, length: length, orientation: orientation});

    coords.forEach((coord) => {
      let xCoord = coord[0];
      let yCoord = coord[1];
      let key = `${xCoord},${yCoord}`;

      this.hashedShipCoords.set(key, id);
    });

    let newShip = new Ship({id: id, x: x, y: y, length: length, orientation: orientation});
    this.ships.push(newShip);
    this.currentShipID++;

    return id;
  }

  //getShipCoordinates should be made a helper.
  getShipCoordinates({x: x, y: y, length: length, orientation: orientation}) {
    let coordinates = [];

    if (orientation === "horizontal") {
      for (let i = 0; i < length; i++) {
        coordinates.push([x + i, y]);
      }

    } else if (orientation === "vertical") {
      for (let i = 0; i < length; i++) {
        coordinates.push([x, y + i]);
      }
    }

    return coordinates;
  }
}
